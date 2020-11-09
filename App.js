import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { Provider } from "react-redux";

import { store } from "./app/store/store";
import HomeTabs from "./app/routes/HomeTabs";
import SingleMessage from "./app/screens/SingleMessageScreen";
import ProfileScreen from "./app/screens/ProfileScreen";
import ProductScreen from "./app/screens/ProductScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ flex: 1, paddingTop: 20 }}>
        <NavigationContainer>
          <Stack.Navigator headerMode={"none"}>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen
              name="SingleMessageScreen"
              component={SingleMessage}
            />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
