import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";

import HomeStack from "./app/routes/HomeStack";
import MessageStack from "./app/routes/MessageStack";
import ProfileScreen from "./app/screens/ProfileScreen";
import Colors from "./app/config/colors";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          // shifting={true}
          keyboardHidesNavigationBar={true}
          initialRouteName="Home"
          activeColor={Colors.purpleHighlight}
          inactiveColor={Colors.ghostWhite}
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarColor: Colors.cardBG,
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Messages"
            component={MessageStack}
            options={{
              tabBarColor: Colors.cardBG,
              tabBarLabel: "Messages",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="message"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Upload"
            component={ProfileScreen}
            options={{
              tabBarColor: Colors.cardBG,
              tabBarLabel: "Upload",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="camera" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Selling"
            component={ProfileScreen}
            options={{
              tabBarColor: Colors.cardBG,
              tabBarLabel: "Selling",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="tag" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarColor: Colors.cardBG,
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});
