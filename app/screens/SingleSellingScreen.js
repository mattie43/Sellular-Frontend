import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import { showCategory } from "../config/categories";
import URL from "../config/globalURL";

function SellingStack({ navigation, route }) {
  const currentUser = useSelector((state) => state.user);
  const [item, setItem] = useState(route.params);
  // const item = route.params;
  const dispatch = useDispatch();

  function renderCategories() {
    return item.categories.map((item, i) => (
      <View key={i} style={{ marginHorizontal: 6, alignItems: "center" }}>
        <Icon name={showCategory[item]} size={30} color={Colors.ghostWhite} />
        <Text style={{ color: Colors.ghostWhite }}>{item}</Text>
      </View>
    ));
  }

  function sold() {
    Alert.alert("", "Are you sure you want to mark it as sold?", [
      {
        text: "Yes",
        onPress: updateBackend,
        style: "default",
      },
      {
        text: "No",
        style: "default",
      },
    ]);
  }

  function updateBackend() {
    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ sold: true }),
    };
    fetch(`${URL}/products/${item.id}`, options)
      .then((resp) => resp.json())
      .then(() => {
        setItem({ ...item, sold: true });
        fetch(`${URL}/users/${currentUser.id}/products`)
          .then((resp) => resp.json())
          .then((data) => dispatch({ type: "GET_PRODUCTS", payload: data }));
        fetch(`${URL}/users/${currentUser.id}/convos`)
          .then((resp) => resp.json())
          .then((data) =>
            dispatch({ type: "GET_CONVERSATIONS", payload: data })
          );
      });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      <Image
        source={{ uri: item.img_url }}
        style={{
          opacity: 0.9,
          width: "100%",
          height: 400,
        }}
      />
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Text style={styles.infoText}>{item.name}</Text>
          <Text style={styles.infoText}>${item.price}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
            alignSelf: "center",
          }}
        />
        <Text
          style={[
            styles.infoText,
            { fontWeight: "normal", alignSelf: "center", textAlign: "center" },
          ]}
        >
          {item.description}
        </Text>
        <View style={styles.categoryContainer}>{renderCategories()}</View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.soldBtn,
          { opacity: pressed || item.sold ? 0.6 : 1 },
        ]}
        onPress={item.sold ? null : sold}
      >
        <Text style={[styles.infoText, { alignSelf: "center" }]}>
          {item.sold ? "Item Sold!" : "Mark As Sold"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

export default SellingStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
  },
  infoContainer: {
    borderRadius: 10,
    backgroundColor: Colors.cardBG,
    margin: 15,
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
  infoText: {
    fontSize: 22,
    margin: 10,
    color: Colors.ghostWhite,
    fontWeight: "bold",
  },
  categoryContainer: {
    margin: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  catText: {
    fontSize: 18,
    color: Colors.ghostWhite,
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
  soldBtn: {
    backgroundColor: Colors.purpleHighlight,
    width: "75%",
    padding: 1,
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 15,
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
});
