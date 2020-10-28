import React from "react";
import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";

import Colors from "../config/colors";

function UploadImage({ navigation, route }) {
  const imgUri = route.params.uri;

  return (
    <ImageBackground source={{ uri: imgUri }} style={styles.background}>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.buttonText}>Retry?</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
        onPress={() => navigation.push("UploadSubmit", imgUri)}
      >
        <Text style={styles.buttonText}>Looks Good!</Text>
      </Pressable>
    </ImageBackground>
  );
}

export default UploadImage;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    alignSelf: "flex-end",
    backgroundColor: Colors.cardBG,
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.ghostWhite,
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
