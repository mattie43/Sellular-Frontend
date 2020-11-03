import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

export default function SingleMessageScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const seller = route.params.seller || route.params.product.user;
  const product = route.params.product;
  const conversation = route.params.conversation;
  const [messageList, setMessageList] = useState([]);
  const [chatMsg, setChatMsg] = useState("");

  useEffect(() => {
    fetch(`${URL}/conversations/${conversation.id}`)
      .then((resp) => resp.json())
      .then((data) => setMessageList(data));
  }, []);

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
        <Icon
          name="arrow-left"
          size={30}
          color={Colors.darkBG}
          style={styles.backIcon}
        />
      </Pressable>
      <View style={styles.messageInfo}>
        <View>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() => console.log("seller pressed")}
          >
            <Image
              source={{
                uri: "https://www.w3schools.com/howto/img_avatar2.png",
              }}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.infoText}>{seller.email}</Text>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() => console.log("product pressed")}
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
      <View style={styles.inputContainer}>
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
      </View>
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
    position: "absolute",
    bottom: 0,
    backgroundColor: Colors.cardBG,
    padding: 4,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flex: 1,
    margin: 5,
    bottom: 0,
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
  backIcon: {
    // box shadow
    shadowColor: Colors.ghostWhite,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    // box shadow end
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
});
