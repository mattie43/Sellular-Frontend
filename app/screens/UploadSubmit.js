import React from "react";
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

import Colors from "../config/colors";

function UploadSubmit({ navigation, route }) {
  const imgUri = route.params;
  const dimensions = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: imgUri }}
        style={{ height: dimensions, width: dimensions, resizeMode: "cover" }}
      />
      <View style={styles.infoContainer}>
        <View style={styles.card}>
          <Text style={styles.infoText}>Give this item a name</Text>
          <TextInput style={styles.input} placeholder="Product name.." />
          <Text style={styles.infoText}>Give this item a price</Text>
          <TextInput style={styles.input} placeholder="Product price.." />
          <Text style={styles.infoText}>Give this item a description</Text>
          <TextInput style={styles.input} placeholder="Product description.." />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Pressable
              style={({ pressed }) => [
                styles.cancelBtn,
                { opacity: pressed ? 0.6 : 1 },
              ]}
              onPress={() => navigation.popToTop()}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.cancelBtn,
                { opacity: pressed ? 0.6 : 1, backgroundColor: "green" },
              ]}
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
  },
  infoText: {
    fontSize: 20,
    color: Colors.ghostWhite,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    padding: 12,
    color: Colors.darkBG,
    backgroundColor: Colors.ghostWhite,
  },
  cancelBtn: {
    padding: 10,
    margin: 2,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 10,
  },
  cancelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.ghostWhite,
  },
});
