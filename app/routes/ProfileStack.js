import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import ProfileCamera from "../screens/ProfileCamera";
import ProfileSave from "../screens/ProfileSave";

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ProfileCamera" component={ProfileCamera} />
      <Stack.Screen name="ProfileSave" component={ProfileSave} />
    </Stack.Navigator>
  );
}
