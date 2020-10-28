import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { useSelector } from "react-redux";

// local
import HomeStack from "./HomeStack";
import SellingStack from "./SellingStack";
import UploadStack from "./UploadStack";

import ProfileScreen from "../screens/ProfileScreen";
import Colors from "../config/colors";
import AllMessagesScreen from "../screens/AllMessagesScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
  const currentUser = useSelector((state) => state.user);

  return (
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
        component={currentUser ? AllMessagesScreen : LoginScreen}
        options={{
          tabBarColor: Colors.cardBG,
          tabBarLabel: "Messages",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={currentUser ? UploadStack : LoginScreen}
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
        component={currentUser ? SellingStack : LoginScreen}
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
        component={currentUser ? ProfileScreen : LoginScreen}
        options={{
          tabBarColor: Colors.cardBG,
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
