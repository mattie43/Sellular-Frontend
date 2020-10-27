import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/colors";

export default function ProductScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <View style={styles.messageInfo}>
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
      </View>
      <Text>test</Text>
      <TextInput style={styles.input} placeholder="Chat here.." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  messageInfo: {
    borderColor: "red",
    borderWidth: 2,

    height: "30%",
  },
  input: {
    padding: 10,
    borderWidth: 10,
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderColor: Colors.cardBG,
    color: "black",
    backgroundColor: Colors.ghostWhite,
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
