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
    return [1, 2, 3, 4, 5].map((message, i) => (
      <Pressable
        key={i}
        onPress={() => navigation.push("SingleMessageScreen")}
        style={({ pressed }) => [
          styles.singleMessagePressable,
          {
            borderColor:
              i % 2 === 0 ? Colors.purpleHighlight : Colors.blueHighlight,
          },
          {
            backgroundColor: pressed
              ? i % 2 === 0
                ? Colors.purpleHighlight
                : Colors.blueHighlight
              : "transparent",
          },
        ]}
      >
        <View style={styles.singleMessageContainer}>
          <Text style={styles.singleMessage}>Seller Name</Text>
          <Text style={styles.singleMessage}>Product Name</Text>
          <Pressable
            style={{ display: showDelete ? "flex" : "none" }}
            onPress={() => deleteMessage(i)}
          >
            <Icon name={"times"} size={20} color="red" />
          </Pressable>
        </View>
      </Pressable>
    ));
  }

  function deleteMessage(i) {
    console.log(i);
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

  function addDelete() {
    setShowDelete(!showDelete);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.messageBar}>
        <Text style={styles.title}>Messages</Text>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.6 : 1 },
            { right: 14 },
          ]}
          onPress={addDelete}
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
      <View style={styles.messages}>{renderMessages()}</View>
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
  messages: {
    paddingTop: 8,
  },
  singleMessagePressable: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 10,
    marginTop: 4,
  },
  singleMessageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  singleMessage: {
    fontSize: 20,
    color: Colors.ghostWhite,
  },
});
