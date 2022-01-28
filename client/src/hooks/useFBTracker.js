// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";

export default function useFBTracker() {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: "paletto-app.firebaseapp.com",
    databaseURL:
      "https://paletto-app-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "paletto-app",
    storageBucket: "paletto-app.appspot.com",
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
    measurementId: `${process.env.REACT_APP_FIREBASE_MEASURMENT_ID}`,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get a reference to the database service
  const database = getDatabase();

  // Function for tracking users' behaviours
  const addEventToTracker = (category, action, specification) => {
    console.log("tracker event:", category, ":", action);
    if (!window.location.href.includes("localhost")) {
      const eventListRef = ref(database, "EVENTS");
      const newEventRef = push(eventListRef);
      set(newEventRef, {
        category: category,
        action: action,
        specification: specification,
        timeStamp: new Date().toLocaleString("sv-SE"),
        pageview: window.location.pathname + window.location.search,
      });
    } else return;
  };
  return {
    addEventToTracker,
  };
}
