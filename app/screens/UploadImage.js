import React from "react";
import { ImageBackground, Pressable, Text, StyleSheet } from "react-native";

import Colors from "../config/colors";

function UploadImage({ navigation, route }) {
  const photo = route.params;

  return (
    <ImageBackground source={{ uri: photo.uri }} style={styles.background}>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.buttonText}>Retry?</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.button, { opacity: pressed ? 0.6 : 1 }]}
        onPress={() => navigation.push("UploadSubmit", photo)}
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
