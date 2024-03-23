import { useEffect, useState, useRef } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
const SubTasksSection = ({ user, stringId, titleInput }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  const inputElement = useRef(null);

  if (error) {
    return (
      <main>
        <h1>erorr : {error.message}</h1>
      </main>
    );
  }
  if (loading) {
    return (
      <ReactLoading type={"spin"} color={"blue"} height={200} width={200} />
    );
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            style={{
              textDecoration: value.data().completed
                ? "line-through solid blue"
                : null,
            }}
            ref={inputElement}
            onChange={async (eo) => {
              titleInput(eo);
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i
            onClick={() => {
              inputElement.current.focus();
            }}
            className="fa-regular fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
};

export default SubTasksSection;
