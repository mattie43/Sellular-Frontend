import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllSellingScreen from "../screens/AllSellingScreen";
import SingleSellingScreen from "../screens/SingleSellingScreen";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="AllSellingScreen" component={AllSellingScreen} />
      <Stack.Screen
        name="SingleSellingScreen"
        component={SingleSellingScreen}
      />
    </Stack.Navigator>
  );
}
