import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "/src/fireBaseConfig"; // Adjust the import path if necessary
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import styles from "/src/css/bg.module.css";
import { themeData } from "../theme";

export function Background() {
  const [cards, setCards] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [user, setUser] = useState(null);
  const ref = useRef(null);
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserCards(currentUser.uid);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  const fetchUserCards = async (uid) => {
    const userDocRef = doc(database, "users", uid);
    const userSnap = await getDoc(userDocRef);
    if (userSnap.exists()) {
      setCards(userSnap.data().cards || []);
    } else {
      console.error("No such document!");
    }
  };

  const addCard = async () => {
    if (inputValue.trim() !== "") {
      const newCard = { id: Date.now(), content: inputValue };
      const updatedCards = [...cards, newCard];
      setCards(updatedCards);
      setInputValue("");

      if (user) {
        try {
          const userDocRef = doc(database, "users", user.uid);
          console.log("Updating Firestore with cards: ", updatedCards);
          await updateDoc(userDocRef, { cards: updatedCards });
          console.log("Firestore update successful");
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
    }
  };

  const deleteNote = async (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);

    if (user) {
      try {
        const userDocRef = doc(database, "users", user.uid);
        console.log("Updating Firestore with cards: ", updatedCards);
        await updateDoc(userDocRef, { cards: updatedCards });
        console.log("Firestore update successful");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  };

  return (
    <div ref={ref} className={styles.maincontainerlast}>
      <div className={styles.inputcon}>
        <input
          type="text"
          className="sm:p-2 absolute left-1/2 -translate-x-[75%] z-[99]  pl-6 -translate-y-[-4%] w-48 rounded-l-full bg-slate-200 text-[22px]  "
          placeholder="enter notes"
          id="value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`${styles.tempbg} ${styles.button}`}
          onClick={addCard}
        >
          Add Note
        </button>
      </div>
      <h1 className={styles.todo}>ToDo-List</h1>
      <div className="absolute top-0 left-0 w-full h-full flex flex-wrap z-[20] p-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            reference={ref}
            content={card.content}
            deleteNote={deleteNote}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ id, content, reference, deleteNote }) {
  return (
    <motion.div drag dragConstraints={reference} className={styles.card}>
      <div className={styles.tools}>
        <div className={styles.circle}>
          <span
            className={`${styles.redd} ${styles.box}`}
            onClick={() => deleteNote(id)}
          ></span>
        </div>
        <div className={styles.circle}>
          <span className={`${styles.yelloww} ${styles.box}`}></span>
        </div>
        <div className={styles.circle}>
          <span className={`${styles.greenn} ${styles.box}`}></span>
        </div>
      </div>
      <div className={styles.card__content}>{content}</div>
    </motion.div>
  );
}

export function Setting({ displaymenu }) {
  return (
    <button className={styles.setting} onClick={displaymenu}>
      <img
        src="https://img.icons8.com/fluency/48/settings.png"
        alt="settings"
      />
    </button>
  );
}

export function SettingMenu({ display, changeTheme }) {
  if (display) {
    return (
      <div className={styles.settingcon}>
        <section className={styles.theme}>
          <h2 className="font-extralight">themes</h2>
          <div className={styles.themes}>
            {themeData.map((theme) => (
              <Colorpallet
                name={theme.themeName}
                pc={theme.primaryColor}
                sc={theme.secondaryColor}
                tc={theme.tertiryColor}
                key={theme.name}
                changeTheme={changeTheme}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export function Colorpallet({ pc, sc, tc, name, changeTheme }) {
  return (
    <div className={styles.color} onClick={() => changeTheme(pc, sc, tc)}>
      <p className="font-sans">{name}</p>
      <div className={styles.show}>
        <div
          className={styles.primaryColor}
          style={{ backgroundColor: pc }}
        ></div>
        <div
          className={styles.secondryColor}
          style={{ backgroundColor: sc }}
        ></div>
        <div
          className={styles.terteryColor}
          style={{ backgroundColor: tc }}
        ></div>
      </div>
    </div>
  );
}
