import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Modal,
} from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector } from "react-redux";
import Svg, { Path } from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";

import Colors from "../config/colors";
import URL from "../config/globalURL";

export default function SingleMessageScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const seller = route.params.seller;
  const buyer = route.params.buyer;
  const product = route.params.product;
  const conversation = route.params.conversation;
  const [messageList, setMessageList] = useState([]);
  const [starCount, setStarCount] = useState(0);
  const [productRated, setProductRated] = useState(product.rated);
  const [chatMsg, setChatMsg] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      fetchMessages();
      if (!product.sold) {
        let getMsg = setInterval(fetchMessages, 2000);
        return () => clearInterval(getMsg);
      }
    }, [])
  );

  function fetchMessages() {
    fetch(`${URL}/conversations/${conversation.id}`)
      .then((resp) => resp.json())
      .then((data) => setMessageList(data));
  }

  function sendMsg() {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        message: {
          message: chatMsg,
          user_id: currentUser.id,
          conversation_id: conversation.id,
        },
      }),
    };
    fetch(`${URL}/messages`, options)
      .then((resp) => resp.json())
      .then((data) => setMessageList(messageList.concat(data)));
    setChatMsg("");
  }

  function renderMessages() {
    return messageList.map((message, i) => (
      <View
        style={
          message.user_id === currentUser.id
            ? styles.currentUserContainer
            : styles.secondUserContainer
        }
        key={i}
      >
        <Text style={styles.messageText}>{message.message}</Text>
      </View>
    ));
  }

  function renderStar() {
    const returnStars = [];
    let goldCount = 0;
    for (let i = 1; i < 6; i++) {
      returnStars.push(
        <Pressable key={i} onPress={() => setStarCount(i)}>
          <Svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">
            <Path
              fill={goldCount < starCount ? "#F8D64E" : Colors.selectionBG}
              d="m48,234 73-226 73,226-192-140h238z"
              scale=".2"
            />
          </Svg>
        </Pressable>
      );
      goldCount++;
    }
    return returnStars;
  }

  function submitRatingAlert() {
    Alert.alert(
      "",
      `Are you sure you want to give a ${starCount} star rating?`,
      [
        {
          text: "Yes",
          onPress: ratingSet,
          style: "default",
        },
        {
          text: "No",
          style: "default",
        },
      ]
    );
  }

  function ratingSet() {
    setProductRated(true);
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ rating: starCount, seller: seller.id }),
    };
    fetch(`${URL}/products/${product.id}/rating`, options);
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.pop()}
        style={({ pressed }) => [
          {
            height: 35,
            width: 35,
            margin: 6,
            position: "absolute",
            zIndex: 1,
          },
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Icon name="arrow-left" size={30} color={Colors.ghostWhite} />
      </Pressable>
      <View style={styles.messageInfo}>
        <View>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() =>
              navigation.push(
                "ProfileScreen",
                currentUser.id === seller.id ? buyer : seller
              )
            }
          >
            <Image
              source={{
                uri:
                  currentUser.id === seller.id ? buyer.img_url : seller.img_url,
              }}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.infoText}>
            {currentUser.id === seller.id ? buyer.username : seller.username}
          </Text>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() =>
              navigation.push("ProductScreen", { product, seller })
            }
          >
            <Image
              source={{
                uri: product.img_url,
              }}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.infoText}>{product.name}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: Colors.blueHighlight,
          width: "85%",
          paddingTop: 5,
          alignSelf: "center",
        }}
      />
      <ScrollView>{renderMessages()}</ScrollView>
      {product.sold ? (
        <View>
          <Text
            style={[
              styles.messageText,
              { color: Colors.ghostWhite, textAlign: "center" },
            ]}
          >
            {seller.id === currentUser.id
              ? "You have marked this product as sold."
              : productRated
              ? "This product has been sold & you already gave this seller a rating."
              : "This product has been sold. Give this seller a rating!"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              margin: 10,
            }}
          >
            {seller.id === currentUser.id || productRated ? null : renderStar()}
          </View>
          {seller.id === currentUser.id || productRated ? null : (
            <Pressable
              style={({ pressed }) => [
                styles.submitBtn,
                { opacity: pressed || productRated ? 0.6 : 1 },
              ]}
              onPress={productRated ? null : submitRatingAlert}
            >
              <Text style={styles.submitText}>Submit</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Chat here.."
            value={chatMsg}
            onChangeText={(value) => setChatMsg(value)}
          />
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={sendMsg}
          >
            <Icon name="paper-plane" size={32} color={Colors.blueHighlight} />
          </Pressable>
        </KeyboardAvoidingView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  messageInfo: {
    height: "30%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  infoText: {
    color: Colors.ghostWhite,
    fontSize: 18,
    alignSelf: "center",
  },
  inputContainer: {
    backgroundColor: Colors.cardBG,
    paddingHorizontal: 6,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    margin: 5,
    padding: 12,
    color: Colors.darkBG,
    backgroundColor: Colors.ghostWhite,
  },
  image: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: Colors.purpleHighlight,
    borderWidth: 4,
    margin: 10,
  },
  currentUserContainer: {
    backgroundColor: Colors.blueHighlight,
    padding: 10,
    flexDirection: "row",
    width: "60%",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    marginTop: 7,
    marginRight: 4,
    borderRadius: 10,
  },
  secondUserContainer: {
    backgroundColor: Colors.purpleHighlight,
    padding: 10,
    flexDirection: "row",
    width: "60%",
    marginTop: 7,
    marginLeft: 4,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 24,
    color: Colors.mainBG,
  },
  submitText: {
    color: Colors.ghostWhite,
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
  submitBtn: {
    backgroundColor: Colors.blueHighlight,
    width: "50%",
    alignSelf: "center",
    padding: 6,
    borderRadius: 10,
    marginBottom: 8,
    // box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // box shadow end
  },
  modal: {
    backgroundColor: Colors.cardBG,
    height: "80%",
    width: "90%",
    alignSelf: "center",
    opacity: 0.98,
    top: 60,
    borderRadius: 10,
  },
});
