import { React, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
const SubTasksSection = ({ user, stringId, completedCheckbox, trashIcon }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);

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
            <label htmlFor="checkbox">Completed </label>
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
              Add
            </button>

            <button
              onClick={(eo) => {
                eo.preventDefault();
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              cancel{" "}
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
            Add more <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
};

export default SubTasksSection;
