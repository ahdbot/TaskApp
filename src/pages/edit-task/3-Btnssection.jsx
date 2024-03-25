import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useTranslation } from "react-i18next";
const Btnssection = ({ user, stringId, deleteBTN }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));
  const { t, i18n } = useTranslation();
  if (value) {
    return (
      <section className="center mt">
        <div>
          <button
            onClick={() => {
              deleteBTN();
            }}
            className="delete"
          >
            {i18n.language === "ar" && " حذف "}
            {i18n.language === "en" && "Delete "}
            {i18n.language === "fr" && "Supprimer "}
            {i18n.language === "turk" && "Silmek"}
            {i18n.language === "jp" && "消去"}
            <i
              style={{ marginLeft: "5px" }}
              className="fa-solid fa-trash"
            ></i>{" "}
          </button>
        </div>
      </section>
    );
  }
};

export default Btnssection;
