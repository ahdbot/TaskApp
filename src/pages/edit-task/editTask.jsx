import "./editTask.css";

import { React, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { db } from "../../firebase/config";

import TitleSection from "./1-TitleSection";
import SubTasksSection from "./2-SubTasksSection";
import Btnssection from "./3-Btnssection";
import { useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
const EditTask = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  let { stringId } = useParams();

  const titleInput = async (eo) => {
    await updateDoc(doc(db, user.uid, stringId), {
      title: eo.target.value,
    });
  };

  // ======================
  // 2- Sub-Task Section
  // ======================
  const completedCheckbox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, stringId), {
        completed: false,
      });
    }
  };

  const trashIcon = async (item) => {
    await updateDoc(doc(db, user.uid, stringId), {
      details: arrayRemove(item),
    });
  };

  // ======================
  // 3- BTNs Section
  // ======================
  const addMoreBTN = (eo) => {
    eo.preventDefault();
  };

  const [showData, setshowData] = useState(false);

  const deleteBTN = async (eo) => {
    setshowData(true);
    navigate("/", { replace: true });
    await deleteDoc(doc(db, user.uid, stringId));
  };

  if (error) {
    return <h1>Error : {error.message}</h1>;
  }

  if (loading) {
  }

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />

        {showData ? (
          <main>
            <ReactLoading
              type={"spin"}
              color={"blue"}
              height={20}
              width={20}
            />
          </main>
        ) : (
          <div className="edit-task">
            <TitleSection
              user={user}
              stringId={stringId}
              titleInput={titleInput}
            />

            <SubTasksSection
              user={user}
              stringId={stringId}
              completedCheckbox={completedCheckbox}
              trashIcon={trashIcon}
            />

            <Btnssection
              user={user}
              stringId={stringId}
              deleteBTN={deleteBTN}
            />
          </div>
        )}

        <Footer />
      </div>
    );
  }
};

export default EditTask;
