import React, { useState } from "react";
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

import Colors from "../config/colors";

function SellingStack({ navigation }) {
  const [showDelete, setShowDelete] = useState(false);

  function deleteMessage(i) {
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
    return [1, 2, 3].map((item, i) => (
      <Pressable
        key={i}
        style={({ pressed }) => [
          styles.singleMessagePressable,
          {
            opacity: pressed ? 0.6 : 1,
          },
        ]}
        onPress={() =>
          navigation.push("SingleSellingScreen", {
            img:
              "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1571331044-bst-toys-fisher-price-phone-1571330613.jpg?crop=1xw:1xh;center,top&resize=480:*",
          })
        }
      >
        <View style={styles.itemContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.deleteBtn,
              { display: showDelete ? "flex" : "none" },
              { opacity: pressed ? 0.6 : 1 },
            ]}
            onPress={() => deleteMessage(i)}
          >
            <Icon name={"times"} size={20} color="red" />
          </Pressable>
          <Image
            source={{
              uri:
                "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1571331044-bst-toys-fisher-price-phone-1571330613.jpg?crop=1xw:1xh;center,top&resize=480:*",
            }}
            style={styles.image}
          />
          <View style={styles.itemTextContainer}>
            <Text style={styles.itemText}>Product Name</Text>
            <Text style={styles.itemText}>$10.99</Text>
          </View>
        </View>
      </Pressable>
    ));
  }

  return (
    <ScrollView style={styles.container}>
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
      {renderProducts()}
    </ScrollView>
  );
}

export default SellingStack;

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