import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

import Colors from "../config/colors";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebaseConfig from "../firebase/firebase";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function login(uid) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        uid,
      }),
    };

    fetch("http://localhost:3000/users", options)
      .then((resp) => resp.json())
      .then((data) => dispatch({ type: "LOG_IN", payload: data }));
  }

  async function getUser() {
    setLoggingIn(true);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    let signInError = "";
    let createUserError = "";

    let user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => (signInError = JSON.parse(JSON.stringify(error))));

    if (signInError.code) {
      if (signInError.code === "auth/user-not-found") {
        user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(
            (error) => (createUserError = JSON.parse(JSON.stringify(error)))
          );
        if (createUserError.code) {
          setError("Weak Password (Must be at least 6 characters)");
          setLoggingIn(false);
        }
      } else {
        setError("Invalid E-mail or Password");
        setLoggingIn(false);
      }
    }

    if (user.user) {
      setLoggingIn(false);
      setError("");
      login(user.user.uid);
    }
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
        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: 24,
              fontWeight: "bold",
              alignSelf: "center",
              marginTop: 12,
              textAlign: "center",
            }}
          >
            {error}
          </Text>
        ) : null}
        <Pressable
          disabled={loggingIn}
          style={({ pressed }) => [
            { opacity: loggingIn || pressed ? 0.6 : 1 },
            styles.button,
          ]}
          onPress={getUser}
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
});