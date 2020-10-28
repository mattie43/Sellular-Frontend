import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/colors";

function AllMessagesScreen({ navigation, route }) {
  const [showDelete, setShowDelete] = useState(false);

  function renderMessages() {
    // get messages from DB and render them
    const arr = [1, 2, 3, 4, 5];
    return arr.map((message, i) => (
      <>
        <Pressable
          key={i}
          onPress={() => navigation.push("SingleMessageScreen")}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <View style={styles.singleMessageContainer}>
            <Text style={styles.singleMessageText}>Seller Name</Text>
            <Text style={styles.singleMessageText}>Product Name</Text>
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
        {arr.length === i + 1 ? null : (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors.purpleHighlight,
              width: "85%",
              alignSelf: "center",
            }}
          />
        )}
      </>
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
    <ScrollView style={styles.container}>
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
      <View style={styles.messagesContainer}>{renderMessages()}</View>
    </ScrollView>
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
