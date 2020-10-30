import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome5";

import Colors from "../config/colors";

export default function UploadCamera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
              {
                position: "absolute",
                bottom: 0,
                left: 0,
                margin: 10,
              },
            ]}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Icon name="sync-alt" size={30} color={Colors.ghostWhite} />
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.6 : 1,
              },
              {
                alignSelf: "flex-end",
                margin: 10,
              },
            ]}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({ base64: true });
                navigation.push("UploadImage", photo);
              }
            }}
          >
            <View
              style={{
                borderWidth: 2,
                borderRadius: 50,
                borderColor: Colors.ghostWhite,
                height: 50,
                width: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: Colors.ghostWhite,
                  height: 40,
                  width: 40,
                  backgroundColor: Colors.ghostWhite,
                }}
              ></View>
            </View>
          </Pressable>
        </View>
      </Camera>
    </View>
  );
}
