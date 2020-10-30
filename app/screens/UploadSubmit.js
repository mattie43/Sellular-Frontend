import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  ScrollView,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";

function UploadSubmit({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const photo = route.params;
  const dimensions = Dimensions.get("window").width;
  const [itemName, setItemName] = useState("");
  const [itemDollar, setItemDollar] = useState("");
  const [itemCent, setItemCent] = useState("00");
  const [itemDesc, setItemDesc] = useState("");
  const dispatch = useDispatch();

  function sendToBackend() {
    const price =
      itemDollar.replace(/\D/g, "") +
      "." +
      itemCent.replace(/\D/g, "").slice(0, 2);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        name: itemName,
        price,
        description: itemDesc,
        user_id: currentUser.id,
        image_64: photo.base64,
      }),
    };

    fetch("http://localhost:3000/products", options)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "ADD_PRODUCT", payload: data });
        navigation.popToTop();
        navigation.navigate("AllSellingScreen");
      });
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: photo.uri }}
        style={{ height: dimensions, width: dimensions, resizeMode: "cover" }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.card}>
          <Text style={styles.infoText}>Give this item a name</Text>
          <TextInput
            style={styles.input}
            placeholder="Product name.."
            onChangeText={(value) => setItemName(value)}
            value={itemName}
          />
          <Text style={styles.infoText}>Give this item a price</Text>
          <View style={{ flexDirection: "row" }}>
            <Icon
              name="dollar-sign"
              size={30}
              color={Colors.ghostWhite}
              style={{ alignSelf: "center", marginRight: 8 }}
            />
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Dollars.."
              onChangeText={(value) => setItemDollar(value)}
              value={itemDollar}
              keyboardType="numeric"
            />
            <Text
              style={[
                styles.infoText,
                {
                  fontSize: 35,
                  alignSelf: "center",
                  fontWeight: "bold",
                  margin: 7,
                },
              ]}
            >
              ₵
            </Text>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Cents.."
              onChangeText={(value) => setItemCent(value)}
              value={itemCent}
              keyboardType="numeric"
            />
          </View>
          <Text style={styles.infoText}>Give this item a description</Text>
          <TextInput
            style={styles.input}
            placeholder="Product description.."
            onChangeText={(value) => setItemDesc(value)}
            value={itemDesc}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.buttons,
                { opacity: pressed ? 0.6 : 1 },
              ]}
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.buttons,
                { opacity: pressed ? 0.6 : 1, backgroundColor: "green" },
              ]}
              onPress={sendToBackend}
            >
              <Text style={styles.cancelText}>Upload</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export default UploadSubmit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  card: {
    backgroundColor: Colors.cardBG,
    borderRadius: 10,
    margin: 10,
    padding: 10,
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
  infoText: {
    fontSize: 24,
    color: Colors.ghostWhite,
  },
  input: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 8,
    color: Colors.darkBG,
    backgroundColor: Colors.ghostWhite,
  },
  buttons: {
    padding: 10,
    margin: 2,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 10,
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
  cancelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.ghostWhite,
  },
});
