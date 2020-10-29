import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebaseConfig from "../../firebase/firebase";

export async function getUser() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  let success = "";
  let newUser = "";

  await firebase
    .auth()
    .signInWithEmailAndPassword("tes14@example.com", "password")
    .catch((error) => (success = JSON.parse(JSON.stringify(error))));

  if (success.code) {
    if (success.code === "auth/wrong-password") {
      // set state to display wrong password
      return "wrong-password";
    } else if (success.code === "auth/invalid-email") {
      return "invalid-email";
    } else {
      newUser = await firebase
        .auth()
        .createUserWithEmailAndPassword("tes14@example.com", "password");
    }
  }
}

// const firestore = firebase.firestore();
// const messagesRef = firestore.collection("messages");

// function chatRoom() {
//   const query = messagesRef.orderBy("createdAt").limit(25);
//   const [messages] = useCollectionData(query, { idField: "id" });

//   console.log(messages);
//   setTimeout(() => console.log("uid", newUser), 2000);
// }

// function sendMsg() {
//   messagesRef.add({
//     text: "test2",
//     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//     id: "lIiDPJUWlfoMQC3gKque",
//   });
// }
