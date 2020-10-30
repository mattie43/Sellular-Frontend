import React from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebaseConfig from "../firebase/firebase";

import Colors from "../config/colors";

export default function SingleMessageScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const seller = route.params.user;
  const product = route.params;

  async function fbtemp() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    const firestore = firebase.firestore();
    let conversationID = "";
    if (currentUser.id < seller.id) {
      conversationID =
        currentUser.id.toString() +
        seller.id.toString() +
        product.id.toString();
    } else {
      conversationID =
        seller.id.toString() +
        currentUser.id.toString() +
        product.id.toString();
    }
    const conversation = firestore.collection("conversations");
    conversation.exists ? console.log("no collection") : console.log("found");
    const doc = await conversation.doc(conversationID).get();
    if (!doc.exists) {
      firestore.add("test");
    } else {
    }
    // console.log("Document data:", doc.data());
    // console.log(new Date());
  }

  // function chatRoom() {
  //   const query = messagesRef.orderBy("createdAt").limit(25);
  //   const [messages] = useCollectionData(query, { idField: "id" });

  //   console.log(messages);
  //   setTimeout(() => console.log("uid", newUser), 2000);
  // }

  // function sendMsg() {
  //   messagesRef.add({
  //     text: "test2",
  //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  //     id: "lIiDPJUWlfoMQC3gKque",
  //   });
  // }

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
      <Pressable onPress={fbtemp}>
        <Text>CLICK</Text>
      </Pressable>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Chat here.." />
        <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
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
});
