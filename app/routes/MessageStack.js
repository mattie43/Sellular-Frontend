import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllMessagesScreen from "../screens/AllMessagesScreen";
import SingleMessageScreen from "../screens/SingleMessageScreen";

const Stack = createStackNavigator();

export default function MessageStack({ navigation, route }) {
  return (
    <Stack.Navigator headerMode={"none"} initialRouteName="AllMessagesScreen">
      <Stack.Screen name="AllMessagesScreen" component={AllMessagesScreen} />
      <Stack.Screen
        name="SingleMessageScreen"
        component={SingleMessageScreen}
      />
    </Stack.Navigator>
  );
}
