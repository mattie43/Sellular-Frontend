import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

function AllMessagesScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const [showDelete, setShowDelete] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${URL}/users/${currentUser.id}`)
      .then((resp) => resp.json())
      .then((data) => setMessageList(data));
  }, []);

  function renderMessages() {
    return messageList.map((message, i) => (
      <View key={i}>
        <Pressable
          onPress={() => navigation.push("SingleMessageScreen", message)}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <View style={styles.singleMessageContainer}>
            <Text style={styles.singleMessageText}>{message.seller.email}</Text>
            <Text style={styles.singleMessageText}>{message.product.name}</Text>
            <Pressable
              style={({ pressed }) => [
                { display: showDelete ? "flex" : "none" },
                { opacity: pressed ? 0.6 : 1 },
              ]}
              onPress={() => deleteMessage(i)}
            >
              <Icon name={"times"} size={20} color="red" />
            </Pressable>
          </View>
        </Pressable>
        {messageList.length === i + 1 ? null : (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.purpleHighlight,
              width: "85%",
              alignSelf: "center",
            }}
          />
        )}
      </View>
    ));
  }

  function deleteMessage(i) {
    Alert.alert("", "Are you sure you want to delete this conversation?", [
      {
        text: "Yes",
        onPress: () => console.log("yes"),
        style: "default",
      },
      {
        text: "No",
        onPress: () => console.log("no"),
        style: "default",
      },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.mainBG }}>
      <View style={styles.messageBar}>
        <Text style={styles.title}>Messages</Text>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
          onPress={() => setShowDelete(!showDelete)}
        >
          <Icon name={"edit"} size={24} color={Colors.ghostWhite} />
        </Pressable>
      </View>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: Colors.blueHighlight,
          width: "85%",
          alignSelf: "center",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.messagesContainer}>
          {messageList.map && renderMessages()}
        </View>
      </ScrollView>
    </View>
  );
}

export default AllMessagesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBG,
  },
  messageBar: {
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.ghostWhite,
  },
  messagesContainer: {
    marginTop: 14,
    borderRadius: 15,
    backgroundColor: Colors.cardBG,
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
  singleMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  singleMessageText: {
    fontSize: 22,
    color: Colors.ghostWhite,
  },
});
