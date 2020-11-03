import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import Colors from "../config/colors";
import Logo from "../../assets/logo.png";
import URL from "../config/globalURL";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const dispatch = useDispatch();

  function login() {
    setLoggingIn(true);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    fetch(`${URL}/users`, options)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({ type: "LOG_IN", payload: data });
        setLoggingIn(false);
      });
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
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
          disabled={loggingIn}
          style={({ pressed }) => [
            { opacity: loggingIn || pressed ? 0.6 : 1 },
            styles.button,
          ]}
          onPress={login}
        >
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            {loggingIn ? "Logging in.." : "Log In"}
          </Text>
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
  logo: {
    width: 400,
    margin: -40,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
