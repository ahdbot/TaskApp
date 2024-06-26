

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
const AllTasksSection = ({ user }) => {
  const { t, i18n } = useTranslation();
  const allTasks = query(collection(db, user.uid), orderBy("id"));

  const completedTask = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );

  const notCompletedTask = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );
  const [initialData, setinitialData] = useState(allTasks);
  const [value, loading, error] = useCollection(initialData);

  const [isfullOpacity, setisFullOpacity] = useState(false);

  const [selectvalue, setselectvalue] = useState("aaa");

  if (error) {
    return <h1>Erorr : {error.message}</h1>;
  }

  if (loading) {
    return (
      <section className="mttt">
        <ReactLoading type={"spin"} color={"blue"} height={77} width={77} />
      </section>
    );
  }

  if (value) {
    return (
      <div>
        <section
          style={{ justifyContent: "center" }}
          className="parent-of-btns flex mtt "
        >
          {selectvalue === "aaa" && (
            <div>
              <button
                style={{ opacity: isfullOpacity ? "1" : "0.3" }}
                onClick={(params) => {
                  setisFullOpacity(true);
                  setinitialData(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                }}
              >
                {i18n.language === "fr" && "Le plus récent"}
                {i18n.language === "en" && "Newest first"}
                {i18n.language === "ar" && "الأحدث أولاً"}
                {i18n.language === "turk" && "En yeni ilk"}
                {i18n.language === "jp" && "新しい順"}
              </button>
              <button
                style={{ opacity: isfullOpacity ? "0.3" : "1" }}
                onClick={(params) => {
                  setisFullOpacity(false);
                  setinitialData(
                    query(query(collection(db, user.uid), orderBy("id", "asc")))
                  );
                }}
              >
                {i18n.language === "en" && "Oldest first"}
                {i18n.language === "ar" && "الأقدم أولاً"}
                {i18n.language === "fr" && "Le plus ancien"}
                {i18n.language === "turk" && "Önce en eski"}
                {i18n.language === "jp" && "古い順"}
              </button>
            </div>
          )}
          <select
            style={{ alignSelf: "flex-end" }}
            value={selectvalue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setisFullOpacity(false);
                setselectvalue("aaa");
                setinitialData(allTasks);
              } else if (eo.target.value === "bbb") {
                setselectvalue("bbb");
                setinitialData(completedTask);
              } else if (eo.target.value === "ccc") {
                setselectvalue("ccc");
                setinitialData(notCompletedTask);
              }
            }}
            id="browsers"
          >
            <option value="aaa">
              {i18n.language === "ar" && "جميع المهام"}
              {i18n.language === "en" && "All Tasks "}
              {i18n.language === "fr" && "Toutes les tâches"}
              {i18n.language === "turk" && "Tüm görevler"}
              {i18n.language === "jp" && "ِすべてのタスク"}
            </option>
            <option value="bbb">
              {" "}
              {i18n.language === "ar" && "المهام المكتملة"}
              {i18n.language === "en" && "Completed Tasks"}
              {i18n.language === "fr" && "Tâches terminées"}
              {i18n.language === "turk" && "Tamamlanan Görevler"}
              {i18n.language === "jp" && "ِ完了したタスク"}
            </option>
            <option value="ccc">
              {" "}
              {i18n.language === "en" && "Not Completed Tasks"}
              {i18n.language === "ar" && "المهام غير المكتملة"}
              {i18n.language === "fr" && "Tâches non terminées"}
              {i18n.language === "turk" && "Tamamlanmayan Görevler"}
              {i18n.language === "jp" && "ِ完了していないタスク」"}
            </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (

             
            
        <h1 className="congrats">       {t("congrat")} </h1>
    


          )}

          {value.docs.map((item) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link className="task-link" to={`/editTask/${item.data().id}`}>
                  <h2> {item.data().title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 2) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <p className="time">
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
