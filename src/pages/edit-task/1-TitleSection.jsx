import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Moment from "react-moment";
import ReactLoading from "react-loading";
const SubTasksSection = ({ user, stringId, titleInput }) => {
  const [value, loading, error] = useDocument(doc(db, user.uid, stringId));
  

  if (error) {
    return (
      <main>
        <h1>erorr : {error.message}</h1>
      </main>
    )
  }
  if (loading) {
    return <ReactLoading type={"spin"} color={"blue"} height={200} width={200} />;
  }
  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            onChange={async (eo) => {
              titleInput(eo);
            }}
            defaultValue={value.data().title}
            className="title-input center"
            type="text"
          />
          <i className="fa-regular fa-pen-to-square"></i>
        </h1>
      </section>
    );
  }
};

export default SubTasksSection;
