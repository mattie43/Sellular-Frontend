import React, { useState } from "react";
import { ImageBackground, Pressable, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

function UploadImage({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const [updating, setUpdating] = useState(false);
  const dispatch = useDispatch();
  const photo = route.params;

  function saveImage() {
    setUpdating(true);
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        image_64: photo.base64,
      }),
    };
    fetch(`${URL}/users/${currentUser.id}`, options)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "LOG_IN", payload: data });
        setUpdating(false);
        navigation.popToTop();
      });
  }

  return (
    <ImageBackground source={{ uri: photo.uri }} style={styles.background}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed || updating ? 0.6 : 1 },
        ]}
        onPress={() => (updating ? null : navigation.pop())}
      >
        <Text style={styles.buttonText}>Retry?</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed || updating ? 0.6 : 1 },
        ]}
        onPress={updating ? null : saveImage}
      >
        <Text style={styles.buttonText}>
          {updating ? "Uploading.." : "Looks Good!"}
        </Text>
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
