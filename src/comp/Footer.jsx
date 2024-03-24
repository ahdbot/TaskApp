import React from "react";
import "./Footer.css";

import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  if (i18n.language === "ar") {
    return (
      <div className="myfooter">
        <footer dir="rtl" className="ali   ">
          {/*        */}
          تم التصميم والبرمجة بواسطة أحمد باجابر
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "en") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          Designed and developed by Ahmad Bajaber
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "fr") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          Conçu et développé par Ahmad Bajaber
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }
  if (i18n.language === "turk") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          Ahmad Bajaber tarafından tasarlandı ve geliştirildi
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }

  if (i18n.language === "jp") {
    return (
      <div className="myfooter">
        <footer className="ali   ">
          アフマド・バジャバーによって設計および開発されました
          <span>
            {" "}
            <i className="fa-solid fa-heart"></i>{" "}
          </span>
        </footer>
      </div>
    );
  }
};

export default Footer;
