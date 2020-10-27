import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}
