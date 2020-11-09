import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

function ProductScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const product = route.params.product || route.params;
  const productUser = route.params.user || route.params.seller;
  const dimensions = Dimensions.get("window").width;
  const dispatch = useDispatch();

  function getConversation() {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        seller: product.user.id,
        buyer: currentUser.id,
        product: product.id,
      }),
    };
    fetch(`${URL}/conversations`, options)
      .then((resp) => resp.json())
      .then((conversation) => {
        dispatch({ type: "ADD_CONVERSATION", payload: conversation });
        navigation.navigate("SingleMessageScreen", conversation);
      });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: product.img_url }}
        style={{
          opacity: 0.9,
          width: dimensions,
          height: 400,
          resizeMode: "contain",
        }}
      >
        <Pressable
          onPress={() => navigation.pop()}
          style={({ pressed }) => [
            { height: 35, width: 35 },
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
      </ImageBackground>
      <Text style={styles.postDate}>
        Posted{" "}
        {product.post_date < 1 ? "Today" : product.post_date + " days ago"}
      </Text>
      {route.params.seller ? null : (
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={() => navigation.push("ProfileScreen", product.user)}
        >
          <View
            style={[
              styles.card,
              {
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: 5,
              },
            ]}
          >
            <Image
              style={{ height: 100, width: 100, borderRadius: 100 }}
              source={{ uri: productUser.img_url }}
            />
            <Text style={[styles.name, { alignSelf: "auto" }]}>
              {productUser.username}
            </Text>
          </View>
        </Pressable>
      )}
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "75%",
            marginBottom: 15,
          }}
        >
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.name}>${product.price}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
          }}
        />
        <Text style={styles.desc}>{product.description}</Text>
      </View>
      {route.params.seller ? null : (
        <Pressable
          style={({ pressed }) => [
            styles.messageBtn,
            { opacity: pressed ? 0.6 : 1 },
            { opacity: currentUser === null ? 0.6 : 1 },
          ]}
          onPress={currentUser === null ? null : getConversation}
        >
          <Text style={styles.messageText}>Message the seller</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBG,
  },
  card: {
    alignItems: "center",
    backgroundColor: Colors.cardBG,
    margin: 15,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // box shadow end
  },
  name: {
    fontSize: 22,
    color: Colors.ghostWhite,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  desc: {
    fontSize: 18,
    color: Colors.ghostWhite,
    paddingTop: 15,
    width: "75%",
    textAlign: "center",
  },
  messageBtn: {
    backgroundColor: Colors.purpleHighlight,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
    alignItems: "center",
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
  messageText: {
    color: Colors.ghostWhite,
    fontWeight: "bold",
    fontSize: 25,
    margin: 10,
  },
  postDate: {
    fontSize: 16,
    color: Colors.ghostWhite,
    opacity: 0.6,
    paddingTop: 10,
    alignSelf: "center",
  },
  backIcon: {
    margin: 4,
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
});
