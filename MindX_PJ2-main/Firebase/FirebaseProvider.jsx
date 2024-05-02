import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import { GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCCsDQ9hDzbLM3ybp0ZJA8Weyn3aaM-maU",
  authDomain: "fir-d62e7.firebaseapp.com",
  projectId: "fir-d62e7",
  storageBucket: "fir-d62e7.appspot.com",
  messagingSenderId: "909442341972",
  appId: "1:909442341972:web:9384e85dfa4d48ccb961c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const FirebaseContext = createContext();

const Googleprovider = new GoogleAuthProvider();



const FirebaseProvider = ({ children }) => {
  const db = getFirestore(app);
  const messCollect = collection(db, "product"); // Specify the collection path here
  const eventCollection = collection(db, "events");
  const blogCollection = collection(db, "Blogs");
  const faqCollection = collection(db, "faq");
  const chairCollection = collection(db, "dataChair")
  const bookingCollection = collection(db, "bookingFilm")
  return (
    <FirebaseContext.Provider value={{ app, messCollect, eventCollection, blogCollection, faqCollection, chairCollection, bookingCollection, Googleprovider }}>
      {children}
    </FirebaseContext.Provider>
  );
};




export default FirebaseProvider;
