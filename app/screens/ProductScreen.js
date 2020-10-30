import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/colors";

function ProductScreen({ navigation, route }) {
  const Product = route.params;
  const dimensions = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: Product.img_url }}
        style={{
          opacity: 0.9,
          width: dimensions,
          height: 400,
          resizeMode: "contain",
        }}
      >
        <Pressable
          onPress={() => navigation.pop()}
          style={({ pressed }) => [
            { height: 35, width: 35 },
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
      </ImageBackground>
      <Text style={styles.postDate}>
        Posted{" "}
        {Product.post_date < 1 ? "Today" : Product.post_date + " days ago"}
      </Text>
      <Pressable style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
        <View
          style={[
            styles.card,
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 5,
            },
          ]}
        >
          <Image
            style={{ height: 100, width: 100, borderRadius: 100 }}
            source={{ uri: "https://www.w3schools.com/howto/img_avatar2.png" }}
          />
          <Text style={[styles.name, { alignSelf: "auto" }]}>
            {Product.user.email}
          </Text>
        </View>
      </Pressable>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "75%",
            marginBottom: 15,
          }}
        >
          <Text style={styles.name}>{Product.name}</Text>
          <Text style={styles.name}>${Product.price}</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.blueHighlight,
            width: "85%",
          }}
        />
        <Text style={styles.desc}>{Product.description}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.messageBtn,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Text style={styles.messageText}>Message the seller</Text>
      </Pressable>
    </ScrollView>
  );
}

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBG,
  },
  card: {
    alignItems: "center",
    backgroundColor: Colors.cardBG,
    margin: 15,
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // box shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // box shadow end
  },
  name: {
    fontSize: 22,
    color: Colors.ghostWhite,
    fontWeight: "bold",
    alignSelf: "flex-end",
  },
  desc: {
    fontSize: 18,
    color: Colors.ghostWhite,
    paddingTop: 15,
    width: "75%",
    textAlign: "center",
  },
  messageBtn: {
    backgroundColor: Colors.purpleHighlight,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 10,
    alignItems: "center",
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
  messageText: {
    color: Colors.ghostWhite,
    fontWeight: "bold",
    fontSize: 25,
    margin: 10,
  },
  postDate: {
    fontSize: 16,
    color: Colors.ghostWhite,
    opacity: 0.6,
    paddingTop: 10,
    alignSelf: "center",
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
});
