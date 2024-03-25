import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [user] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali ">
        <h1>
          <Link to="/">
          <i style={{marginRight:"10px"}} class="fa-solid fa-list-check"></i>
            {i18n.language === "fr" && "Application de tâches"}
            {i18n.language === "en" && "Task APP"}
            {i18n.language === "ar" && " تطبيق المهام"}
            {i18n.language === "turk" && "Görev uygulaması"}
            {i18n.language === "jp" && "ِタスクアプリ"}
          </Link>
        </h1>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          <li className="main-list lang">
            <p> {t("lang")}</p>
            <ul className="lang-box">
              <li
                onClick={() => {
                  i18n.changeLanguage("ar");
                }}
                style={{ justifyContent: "space-between" }}
                className="flex"
                dir="rtl"
              >
                <p> العربية</p>
                {i18n.language === "ar" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("en");
                }}
              >
                <p> English</p>{" "}
                {i18n.language === "en" && (
                  <i className="fa-solid fa-check"></i>
                )}{" "}
              </li>
              <li>
                <p
                  onClick={() => {
                    i18n.changeLanguage("fr");
                  }}
                >
                  {" "}
                  French
                </p>
                {i18n.language === "fr" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li>
                <p
                  onClick={() => {
                    i18n.changeLanguage("turk");
                  }}
                >
                  {" "}
                  Turkey
                </p>
                {i18n.language === "turk" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
              <li>
                <p
                  onClick={() => {
                    i18n.changeLanguage("jp");
                  }}
                >
                  {" "}
                  Japanese
                </p>
                {i18n.language === "jp" && (
                  <i className="fa-solid fa-check"></i>
                )}
              </li>
            </ul>
          </li>
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("signout")}
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <button className="main-link signout">{t("signout")}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                {t("support")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("account")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
