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
import { useSelector, useDispatch } from "react-redux";

import Colors from "../config/colors";
import { categoriesList } from "../config/categories";
import URL from "../config/globalURL";

export default function HomeScreen({ navigation }) {
  const currentUser = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    fetch(`${URL}/products`)
      .then((resp) => resp.json())
      .then((data) => {
        setProductList(
          data.map((item) =>
            Object.assign(item, {
              height: Math.floor(Math.random() * (230 - 200 + 1)) + 200,
            })
          )
        );
        setIsFetching(false);
      });
  }, [isFetching]);

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
    let items = categoryCheck().filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (currentUser) {
      return items.filter((product) => product.user.id !== currentUser.id);
    } else {
      return items;
    }
  }

  function renderProducts(item) {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            height: item.height,
            width: "100%",
            padding: 1,
          },
          { opacity: pressed ? 0.6 : 1 },
        ]}
        onPress={() => navigation.push("ProductScreen", item)}
      >
        <Image
          source={{ uri: item.img_url }}
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
        onChangeText={(text) => setSearch(text)}
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
        onRefresh={() => setIsFetching(true)}
        refreshing={isFetching}
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
