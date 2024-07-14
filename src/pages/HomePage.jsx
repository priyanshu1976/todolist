import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "/src/fireBaseConfig"; // Adjust the import path if necessary
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  Background,
  Setting,
  SettingMenu,
  Colorpallet,
} from "../components/Background";

function HomePage() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [display, changeDisplay] = useState(false);
  const auth = getAuth();
  function displaymenu() {
    changeDisplay((display) => !display);
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getName(currentUser.uid);
      } else {
        setUser(null);
        setUserName("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  async function getName(uid) {
    try {
      const userDocRef = doc(database, "users", uid);
      const userSnap = await getDoc(userDocRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserName(userData.Name);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting document:", error);
    }
  }
  function changeTheme(primaryColor, secondaryColor, tertiaryColor) {
    document.documentElement.style.setProperty("--primary-color", primaryColor);
    document.documentElement.style.setProperty(
      "--secondary-color",
      secondaryColor
    );
    document.documentElement.style.setProperty(
      "--tertiary-color",
      tertiaryColor
    );
    console.log(
      "Theme changed to:",
      primaryColor,
      secondaryColor,
      tertiaryColor
    );
  }

  return (
    <>
      <Setting displaymenu={displaymenu} />
      <Background />
      <SettingMenu display={display} changeTheme={changeTheme} />
    </>
  );
}

export default HomePage;
