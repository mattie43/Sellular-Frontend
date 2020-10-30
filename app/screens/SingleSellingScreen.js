import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/colors";
import { showCategory } from "../config/categories";

function SellingStack({ navigation, route }) {
  const item = route.params;

  function renderCategories() {
    return ["Electronics", "Babies & Kids", "Games & Toys"].map((item, i) => (
      <View style={{ marginRight: 6, marginLeft: 6, alignItems: "center" }}>
        <Icon name={showCategory[item]} size={30} color={Colors.ghostWhite} />
        <Text style={{ color: Colors.ghostWhite }}>{item}</Text>
      </View>
    ));
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
        source={{ uri: item.image_64 }}
        style={{
          opacity: 0.9,
          width: "100%",
          height: 400,
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{item.name}</Text>
        <Text style={styles.infoText}>${item.price}</Text>
        <Text style={styles.infoText}>{item.description}</Text>
        <View style={styles.categoryContainer}>{renderCategories()}</View>
      </View>
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
    justifyContent: "space-evenly",
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
  infoText: {
    fontSize: 20,
    margin: 10,
    color: Colors.ghostWhite,
  },
  categoryContainer: {
    margin: 10,
    flexDirection: "row",
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
});
