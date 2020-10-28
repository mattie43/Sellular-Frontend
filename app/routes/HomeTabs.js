import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import HomeStack from "./HomeStack";
import SellingStack from "./SellingStack";
import UploadStack from "./UploadStack";

import ProfileScreen from "../screens/ProfileScreen";
import Colors from "../config/colors";
import AllMessages from "../screens/AllMessagesScreen";
import UploadCamera from "../screens/UploadCamera";

const Tab = createMaterialBottomTabNavigator();

export default function HomeTabs() {
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
        component={AllMessages}
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
        component={UploadStack}
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
        component={SellingStack}
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
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
