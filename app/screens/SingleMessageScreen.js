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

export default function SingleMessageScreen({ navigation, route }) {
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
          <Text style={styles.infoText}>Seller Name</Text>
        </View>
        <View>
          <Pressable
            style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
            onPress={() => console.log("product pressed")}
          >
            <Image
              source={{
                uri:
                  "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1571331044-bst-toys-fisher-price-phone-1571330613.jpg?crop=1xw:1xh;center,top&resize=480:*",
              }}
              style={styles.image}
            />
          </Pressable>
          <Text style={styles.infoText}>Product Name</Text>
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
