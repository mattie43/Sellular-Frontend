import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  Switch,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Transition, Transitioning } from "react-native-reanimated";

import Colors from "../config/colors";
import Logo from "../../assets/logo.png";
import URL from "../config/globalURL";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const ref = useRef();
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
        username,
        email,
        password,
      }),
    };

    const url = URL + (signUp ? "/users/signup" : "/users/login");

    fetch(url, options)
      .then((resp) => resp.json())
      .then((data) => {
        setLoggingIn(false);
        validations(data);
      })
      .catch(setLoggingIn(false));
  }

  function validations(data) {
    if (data.id) {
      dispatch({ type: "LOG_IN", payload: data });
    } else {
      Alert.alert(
        "Error:",
        Object.keys(data)[0] + " " + data[Object.keys(data)[0]],
        [
          {
            text: "Ok",
            style: "default",
          },
        ]
      );
    }
  }

  return (
    <Transitioning.View
      transition={transition}
      ref={ref}
      style={styles.container}
    >
      <Image source={Logo} style={styles.logo} />
      <View style={styles.card}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={[
              styles.text,
              {
                color: !signUp ? Colors.blueHighlight : Colors.ghostWhite,
                fontWeight: "bold",
              },
            ]}
          >
            Log In
          </Text>
          <Switch
            trackColor={{ true: Colors.purpleHighlight }}
            value={signUp}
            onValueChange={() => {
              setSignUp(!signUp);
              ref.current.animateNextTransition();
            }}
            style={{ margin: 5 }}
          />
          <Text
            style={[
              styles.text,
              {
                color: signUp ? Colors.blueHighlight : Colors.ghostWhite,
                fontWeight: "bold",
              },
            ]}
          >
            Sign Up
          </Text>
        </View>
        {signUp ? (
          <View>
            <Text style={styles.text}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="me@example.com"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
        ) : null}
        <Text style={styles.text}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(value) => setUsername(value)}
        />
        <Text style={styles.text}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Pressable
          disabled={loggingIn}
          style={({ pressed }) => [
            { opacity: loggingIn || pressed ? 0.6 : 1 },
            styles.button,
          ]}
          onPress={login}
        >
          <Text style={[styles.text, { fontWeight: "bold" }]}>
            {signUp ? "Sign Up" : "Log In"}
          </Text>
        </Pressable>
      </View>
    </Transitioning.View>
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
