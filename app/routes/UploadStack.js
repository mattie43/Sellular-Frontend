import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UploadCamera from "../screens/UploadCamera";
import UploadImage from "../screens/UploadImage";
import UploadSubmit from "../screens/UploadSubmit";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode={"none"}>
      <Stack.Screen name="UploadCamera" component={UploadCamera} />
      <Stack.Screen name="UploadImage" component={UploadImage} />
      <Stack.Screen name="UploadSubmit" component={UploadSubmit} />
    </Stack.Navigator>
  );
}
