import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import Colors from "../config/colors";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function login() {
    dispatch({ type: "LOG_IN", payload: { email, password } });
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="me@example.com"
          value={email}
          onChangeText={(value) => setEmail(value)}
        ></TextInput>
        <Text style={styles.text}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        ></TextInput>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.6 : 1 },
            styles.button,
          ]}
          onPress={login}
        >
          <Text style={[styles.text, { fontWeight: "bold" }]}>Log In</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBG,
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.cardBG,
    borderRadius: 10,
    padding: 10,
    margin: 12,
  },
  text: {
    fontSize: 32,
    color: Colors.ghostWhite,
    padding: 5,
  },
  input: {
    fontSize: 32,
    padding: 2,
    backgroundColor: Colors.ghostWhite,
    color: Colors.darkBG,
  },
  button: {
    backgroundColor: Colors.purpleHighlight,
    padding: 4,
    margin: 15,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 10,
    alignItems: "center",
  },
});
