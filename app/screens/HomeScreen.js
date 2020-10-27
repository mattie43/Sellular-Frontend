import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { SearchBar } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import MasonryList from "@appandflow/masonry-list";

import Colors from "../config/colors";

const categoriesList = [
  ["car-side", "Cars"],
  ["home", "Household"],
  ["laptop", "Electronics"],
  ["baby-carriage", "Babies & Kids"],
  ["tshirt", "Clothing & Shoes"],
  ["couch", "Furniture"],
  ["mobile-alt", "Cell Phones"],
  ["tools", "Tools"],
  ["gamepad", "Games & Toys"],
  ["football-ball", "Sports"],
  ["guitar", "Instruments"],
];

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  function updateSearch(e) {
    setSearch(e);
  }

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((resp) => resp.json())
      .then((data) => setProductList(data));
  }, []);

  function categoryCheck() {
    if (currentCategory === "") {
      return productList;
    } else {
      return productList.filter((product) =>
        product.categories.includes(currentCategory)
      );
    }
  }

  function filteredProducts() {
    return categoryCheck().filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  function renderProducts(item) {
    const generateHeight = Math.floor(Math.random() * (230 - 200 + 1)) + 200;
    return (
      <Pressable
        style={({ pressed }) => [
          {
            height: generateHeight,
            width: "100%",
            padding: 1,
          },
          { opacity: pressed ? 0.6 : 1 },
        ]}
        onPress={() => navigation.push("ProductScreen", item)}
      >
        <Image
          source={{ uri: item.img }}
          style={{ flex: 1 }}
          imageStyle={{ borderRadius: 2 }}
          resizeMode={"cover"}
        />
      </Pressable>
    );
  }

  function renderCategories() {
    return categoriesList.map((iconArr, i) => (
      <View
        key={i}
        style={{
          backgroundColor: Colors.cardBG,
          paddingRight: 10,
          paddingLeft: 10,
          paddingTop: 5,
        }}
      >
        <Pressable
          style={{ alignItems: "center" }}
          onPress={() =>
            currentCategory === iconArr[1]
              ? setCurrentCategory("")
              : setCurrentCategory(iconArr[1])
          }
        >
          <Icon
            name={iconArr[0]}
            size={30}
            color={
              currentCategory === iconArr[1]
                ? Colors.blueHighlight
                : Colors.ghostWhite
            }
          />
          <Text
            style={{
              color:
                currentCategory === iconArr[1]
                  ? Colors.blueHighlight
                  : Colors.ghostWhite,
            }}
          >
            {iconArr[1]}
          </Text>
        </Pressable>
      </View>
    ));
  }

  return (
    <>
      <SearchBar
        placeholder="Search here.."
        onChangeText={updateSearch}
        value={search}
        inputContainerStyle={{ height: "100%", backgroundColor: Colors.cardBG }}
        containerStyle={{
          height: 54,
          backgroundColor: Colors.selectionBG,
          marginBottom: -1,
        }}
      />
      <View style={{ height: 54 }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            backgroundColor: Colors.cardBG,
          }}
        >
          {renderCategories()}
        </ScrollView>
      </View>
      <MasonryList
        style={{ backgroundColor: Colors.mainBG }}
        data={filteredProducts()}
        numColumns={3}
        renderItem={({ item }) => renderProducts(item)}
        showsVerticalScrollIndicator={false}
        getHeightForItem={({ item }) => 1}
      />
    </>
  );
}

const styles = StyleSheet.create({
  outerBox: {
    width: "50%",
    height: 230,
    padding: 5,
  },
});
