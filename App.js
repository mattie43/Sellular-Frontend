import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";

import HomeTabs from "./app/routes/HomeTabs";
import SingleMessage from "./app/screens/SingleMessageScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <NavigationContainer>
        <Stack.Navigator headerMode={"none"}>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="SingleMessageScreen" component={SingleMessage} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
