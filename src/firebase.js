import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyD9U1aHRb8v7oE8OjQYG2StoXIirOCjQIE",
  authDomain: "dev-gapo.firebaseapp.com",
  projectId: "dev-gapo",
  storageBucket: "dev-gapo.appspot.com",
  messagingSenderId: "602565752347",
  appId: "1:602565752347:web:7584c0551835811c032abe",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BFPEcRWByc4r2FNoK1ccTBAVrzQZIwSmqFMxtsDMZ8N6_581cDAaCvfevQFKxRjW0YYBtkVKypXxwie9xbqZQxU",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
