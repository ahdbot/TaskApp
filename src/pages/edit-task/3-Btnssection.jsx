import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";

const Btnssection = ({ user, stringId, deleteBTN }) => {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  return (
    <section className="center mt">
      <div>
        <button
          onClick={() => {
            deleteBTN();
          }}
          className="delete"
        >
          Delete task
        </button>
      </div>
    </section>
  );
};

export default Btnssection;
