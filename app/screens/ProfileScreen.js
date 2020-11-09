import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Svg, { Path } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

function ProfileScreen({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const [bio, setBio] = useState(currentUser ? currentUser.bio : "");
  const [editable, setEditable] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  function updateProfile() {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ bio }),
    };
    fetch(`${URL}/users/${currentUser.id}`, options)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "LOG_IN", payload: data });
        setShowModal(false);
      });
  }

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

  function editableAlert() {
    if (!editable) {
      Alert.alert("", "Press your picture or bio to change them.", {
        text: "Ok",
        style: "default",
      });
    }
    setEditable(!editable);
  }

  function modalDisplay() {
    return (
      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modal}>
          <TextInput
            multiline={true}
            style={[
              styles.bio,
              {
                backgroundColor: Colors.selectionBG,
                margin: 20,
                padding: 5,
              },
            ]}
            value={bio}
            onChangeText={(value) => setBio(value)}
          />
          <Pressable
            style={{
              position: "absolute",
              left: 15,
              bottom: 15,
              backgroundColor: "red",
              padding: 5,
              borderRadius: 10,
            }}
            onPress={() => {
              setShowModal(false);
              setBio(currentUser.bio);
            }}
          >
            <Text style={styles.name}>Cancel</Text>
          </Pressable>
          <Pressable
            style={{
              position: "absolute",
              right: 15,
              bottom: 15,
              backgroundColor: "green",
              padding: 5,
              borderRadius: 10,
            }}
            onPress={updateProfile}
          >
            <Text style={styles.name}>Save</Text>
          </Pressable>
        </View>
      </Modal>
    );
  }

  return (
    <View style={styles.container}>
      {modalDisplay()}
      <View style={styles.profileTop}>
        {route.params ? (
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 1 },
              { position: "absolute", left: 5, top: 8 },
            ]}
            onPress={() => navigation.pop()}
          >
            <Icon
              name={"arrow-left"}
              size={30}
              color={editable ? Colors.blueHighlight : Colors.ghostWhite}
            />
          </Pressable>
        ) : (
          <>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                { position: "absolute", right: 14 },
              ]}
              onPress={() => dispatch({ type: "LOG_OUT" })}
            >
              <Icon name={"sign-out-alt"} size={24} color={Colors.ghostWhite} />
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                { position: "absolute", left: 14 },
              ]}
              onPress={editableAlert}
            >
              <Icon
                name={"user-edit"}
                size={24}
                color={editable ? Colors.blueHighlight : Colors.ghostWhite}
              />
            </Pressable>
          </>
        )}
        <Pressable
          style={({ pressed }) => [{ opacity: pressed && editable ? 0.6 : 1 }]}
          onPress={() =>
            editable ? navigation.navigate("ProfileCamera") : null
          }
        >
          <Image
            source={{
              uri: route.params ? route.params.img_url : currentUser.img_url,
            }}
            style={styles.image}
          />
        </Pressable>
        <Text style={styles.name}>
          {route.params ? route.params.username : currentUser.username}
        </Text>
        {/* <View style={{ flexDirection: "row" }}>
          <Icon name={"map-marker-alt"} size={24} color={Colors.ghostWhite} />
          <Text style={styles.location}>Location, USA</Text>
        </View> */}
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
            marginBottom: -5,
          }}
        />
      </View>
      <View style={styles.profileMiddle}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.info}>Rating: </Text>
          {renderStar(route.params ? route.params.rating : currentUser.rating)}
          <Text style={[styles.info, { marginLeft: 2 }]}>
            (
            {route.params
              ? route.params.rating_count
              : currentUser.rating_count}{" "}
            reviews)
          </Text>
        </View>
        <Text style={styles.info}>
          Join Date:{" "}
          {route.params ? route.params.join_date : currentUser.join_date}
        </Text>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
            marginTop: 15,
          }}
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            opacity: pressed && editable ? 0.6 : 1,
          },
        ]}
        onPress={() => (editable ? setShowModal(true) : null)}
      >
        <View
          style={[
            styles.profileBottom,
            {
              backgroundColor: editable ? "rgba(86, 214, 250, .3)" : null,
            },
          ]}
        >
          <Text style={styles.bio}>
            {route.params ? route.params.bio : currentUser.bio}
          </Text>
        </View>
      </Pressable>
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
    height: "38%",
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  modal: {
    backgroundColor: Colors.cardBG,
    height: "75%",
    width: "80%",
    alignSelf: "center",
    opacity: 0.95,
    top: 60,
    borderRadius: 10,
  },
});

export default ProfileScreen;
