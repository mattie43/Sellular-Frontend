import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import URL from "../config/globalURL";

function AllSellingScreen({ navigation }) {
  const currentUser = useSelector((state) => state.user);
  const sellingList = useSelector((state) => state.userProductList);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${URL}/users/${currentUser.id}/products`)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "GET_PRODUCTS", payload: data }));
  }, []);

  function deleteMessage(id) {
    Alert.alert("", "Are you sure you want to delete this product?", [
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

  function renderProducts() {
    return sellingList.map((item) => (
      <Pressable
        key={item.id}
        style={({ pressed }) => [
          styles.singleMessagePressable,
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        onPress={() => navigation.push("SingleSellingScreen", item)}
      >
        <View style={styles.itemContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.deleteBtn,
              { display: showDelete ? "flex" : "none" },
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => deleteMessage(item.id)}
          >
            <Icon name={"times"} size={20} color="red" />
          </Pressable>
          <Image source={{ uri: item.img_url }} style={styles.image} />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>${item.price}</Text>
          </View>
        </View>
      </Pressable>
    ));
  }

  return (
    <View style={{ backgroundColor: Colors.mainBG, flex: 1 }}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Your Current Sales</Text>
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
          marginBottom: 8,
          alignSelf: "center",
        }}
      />
      <ScrollView style={styles.container}>
        {sellingList ? renderProducts() : null}
      </ScrollView>
    </View>
  );
}

export default AllSellingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  topBar: {
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
  itemContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    borderRadius: 10,
    margin: 8,
    backgroundColor: Colors.cardBG,
    padding: 8,
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
  image: {
    height: 110,
    width: 110,
    borderRadius: 100,
    borderColor: Colors.purpleHighlight,
    borderWidth: 4,
  },
  itemTextContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemText: {
    fontSize: 20,
    color: Colors.ghostWhite,
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    margin: 10,
    zIndex: 1,
  },
});
