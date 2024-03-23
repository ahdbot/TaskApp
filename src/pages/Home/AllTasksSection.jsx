import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";

const AllTasksSection = ({ user }) => {
  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const completedTask =    query(
    collection(db, user.uid),
    where("completed", "==", true)
  )

  const notCompletedTask =  query(
    collection(db, user.uid),
    where("completed", "==", false)
  )
  const [initialData, setinitialData] = useState(
    
    query(collection(db, user.uid), orderBy("comepleted", "asc"))
  );
  const [value, loading, error] = useCollection(initialData);

  const [isfullOpacity, setisfullOpacity] = useState(false);

  const [selectvalue, setselectvalue] = useState("");
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
                onClick={() => {
                  setisfullOpacity(true);
                  setinitialData(
                    query(
                      query(collection(db, user.uid), orderBy("id", "desc"))
                    )
                  );
                }}
              >
                Newest first
              </button>
              <button
                style={{ opacity: isfullOpacity ? "0.3" : "1" }}
                onClick={() => {
                  setisfullOpacity(false);
                  setinitialData(
                    query(query(collection(db, user.uid), orderBy("id", "asc")))
                  );
                }}
              >
                Oldest first
              </button>
            </div>
          )}
          <select
            value={selectvalue}
            onChange={(eo) => {
              if (eo.target.value === "aaa") {
                setisfullOpacity(false);
                setselectvalue("aaa");
                setinitialData(allTasks);
              } else if (eo.target.value === "bbb") {
                setselectvalue("bbb");
                setinitialData(
                  completedTask
                );
              } else if (eo.target.value === "ccc") {
                setselectvalue("ccc");
                setinitialData(
                  notCompletedTask
                );
              }
            }}
            id="browsers"
          >
            <option value="aaa"> All Task </option>
            <option value="bbb"> Complete </option>
            <option value="ccc"> Not Complete </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <h1>Congratulations! You have completed your tasks ♥</h1>
          )}

          {value.docs.map((item) => {
            return (
              <Link to={`/editTask/${item.data().id}`}>
                <article key={item.data().id} dir="auto" className="one-task">
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
                </article>
              </Link>
            );
          })}
        </section>
      </div>
    );
  }
};

export default AllTasksSection;
