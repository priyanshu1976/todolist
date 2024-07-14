import React, { useState } from "react";
import { Setting } from "./Setting";
import { Background } from "./Background";
import { SettingMenu } from "./SettingMenu";
import styles from "../css/MainBoard.module.css";
export function MainBoard() {
  function changeTheme(primaryColor, secondaryColor, tertiaryColor, Event) {
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

  const [display, changeDisplay] = useState(false);
  function displaymenu() {
    changeDisplay((display) => !display);
  }

  return (
    <div className={styles.mainContainer}>
      <Setting displaymenu={displaymenu} />
      <Background />
      <SettingMenu display={display} changeTheme={changeTheme} />
    </div>
  );
}
