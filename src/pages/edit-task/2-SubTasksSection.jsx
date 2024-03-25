import { React, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
import { useTranslation } from "react-i18next";
const SubTasksSection = ({ user, stringId, completedCheckbox, trashIcon }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const { t, i18n } = useTranslation();
  const [subTitle, setsubTitle] = useState("");

  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            <Moment fromNow date={value.data().id} />
          </p>
          <div>
            <input
              onChange={(eo) => {
                completedCheckbox(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox" className="congrats">
              {i18n.language === "ar" && "مكتمل  "}
              {i18n.language === "en" && "completed  "}
              {i18n.language === "fr" && "complète  "}
              {i18n.language === "turk" && "tamamlanmış  "}
              {i18n.language === "jp" && "完成した  "}
            </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={() => {
                    trashIcon(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form style={{ flexDirection: "row" }} className="add-new-task flex">
            <input
              value={subTitle}
              onChange={(eo) => {
                setsubTitle(eo.target.value);
              }}
              className="add-task"
              type="text"
              required
            />
            <button
              onClick={async (eo) => {
                eo.preventDefault();
                setsubTitle("");
                await updateDoc(doc(db, user.uid, stringId), {
                  details: arrayUnion(subTitle),
                });
                eo.preventDefault();
              }}
              className="add"
            >
              {i18n.language === "ar" && "اضافة  "}
              {i18n.language === "en" && "add  "}
              {i18n.language === "fr" && "ajouter  "}
              {i18n.language === "turk" && "eklemek "}
              {i18n.language === "jp" && "追加  "}
            </button>

            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              {i18n.language === "ar" && "الغاء  "}
              {i18n.language === "en" && "cancel  "}
              {i18n.language === "fr" && "Annuler  "}
              {i18n.language === "turk" && "iptal etmek  "}
              {i18n.language === "jp" && "完成した  "}
            </button>
          </form>
        )}

        <div className="center mtt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            {i18n.language === "ar" && "اضافة المزيد  "}
            {i18n.language === "en" && "add More  "}
            {i18n.language === "fr" && "Annuler  "}
            {i18n.language === "turk" && "ajouter plus"}
            {i18n.language === "jp" && "さらに追加  "}{" "}
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTasksSection;
