import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import Svg, { Path } from "react-native-svg";

import Colors from "../config/colors";

function ProfileScreen() {
  const dispatch = useDispatch();

  function renderStar(count = 0) {
    const returnStars = [];
    let goldCount = 0;
    for (let i = 0; i < 5; i++) {
      returnStars.push(
        <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" key={i}>
          <Path
            fill={goldCount < count ? "#F8D64E" : Colors.selectionBG}
            d="m48,234 73-226 73,226-192-140h238z"
            scale=".1"
          />
        </Svg>
      );
      goldCount++;
    }
    return returnStars;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileTop}>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.6 : 1 },
            { position: "absolute", right: 14 },
          ]}
          onPress={() => dispatch({ type: "LOG_OUT" })}
        >
          <Icon name={"sign-out-alt"} size={24} color={Colors.ghostWhite} />
        </Pressable>
        <Image
          source={{ uri: "https://www.w3schools.com/howto/img_avatar2.png" }}
          style={styles.image}
        />
        <Text style={styles.name}>Username</Text>
        <View style={{ flexDirection: "row" }}>
          <Icon name={"map-marker-alt"} size={24} color={Colors.ghostWhite} />
          <Text style={styles.location}>Location, USA</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
          }}
        />
      </View>
      <View style={styles.profileMiddle}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>Rating: </Text>
          {renderStar(3)}
        </View>
        <Text style={styles.info}>Join Date: 10-20-20</Text>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
            marginTop: 15,
          }}
        />
      </View>
      <View style={styles.profileBottom}>
        <Text style={styles.bio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor I.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.mainBG,
  },
  name: {
    fontSize: 26,
    color: Colors.ghostWhite,
    fontWeight: "bold",
  },
  location: {
    marginLeft: 10,
    fontSize: 20,
    opacity: 0.8,
    color: Colors.ghostWhite,
    fontWeight: "bold",
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 100,
    borderColor: Colors.purpleHighlight,
    borderWidth: 4,
  },
  profileTop: {
    height: "50%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  profileMiddle: {
    height: "10%",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  info: {
    fontSize: 20,
    color: Colors.ghostWhite,
    textAlign: "center",
  },
  bio: {
    margin: 10,
    fontSize: 20,
    color: Colors.ghostWhite,
    textAlign: "center",
  },
  profileBottom: {
    height: "40%",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
