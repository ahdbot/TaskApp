import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import { db } from "../../firebase/config";
import Error from "../Error";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import Loading from "react-loading";

// Level 3
import "./Home.css";

import HomeModal from "./Model";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [showLoading, setshowLoading] = useState(false);
  const [taskTitle, settitle] = useState("");
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [showMessage, setshowMessage] = useState(false);

  const [user, loading, error] = useAuthState(auth);

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");

      // ...
    });
  };

  // LEVEL3
  const [showModal, setshowModal] = useState(false);
  // const forgotPassword = () => {
  //   setshowModal(true);
  // };

  // / function of modal

  const closeModal = () => {
    setshowModal(false);
    settitle("");
    setarray([]);
  };

  const titleinput = (eo) => {
    settitle(eo.target.value);
  };

  const detailsinput = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();

    if (!array.includes(subTask)) {
      array.push(subTask);
    }

    // console.log(array);
    setsubTask("");
  };

  const submitBTn = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);

    const taskId = new Date().getTime();
    await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      details: array,
      id: taskId,
      completed: false,
    });

    setshowLoading(false);
    settitle("");
    setarray([]);

    setshowModal(false);
    setshowMessage(true);

    setTimeout(() => {
      setshowMessage(false);
    }, 4000);
  };

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome to React Level 2 🔥🔥🔥</span>{" "}
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home ">
            {/* OPIONS (filtered data) */}

            {/* SHOW all tasks */}

            <AllTasksSection user={user} />

            {/* <section className="flex all-tasks mt">
              <article dir="auto" className="one-task">
                <Link to={"/edit-task"}>
                  <h2> New Task </h2>
                  <ul>
                    <li>Sub task 1 </li>
                    <li> Sub task 2</li>
                  </ul>

                  <p className="time"><time>a day ago</time></p>
                </Link>
              </article>
            </section> */}

            {/* Add new task BTN */}
            <section className="mt">
              <button
                dir="auto"
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
              >
                {i18n.language === "en" && "Add new task"}
                {i18n.language === "ar" && "أضف مهمة جديدة"}
                {i18n.language === "fr" && "Ajouter une nouvelle tâche"}
                {i18n.language === "turk" && "Yeni görev ekle"}
                {i18n.language === "jp" && "ِ新しいタスクを追加する"}

                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <HomeModal
                closeModal={closeModal}
                titleInput={titleinput}
                detailsInput={detailsinput}
                addBTN={addBTN}
                submitBTN={submitBTn}
                taskTitle={taskTitle}
                subTask={subTask}
                array={array}
                showLoading={showLoading}
              />
            )}

            <p
              style={{ right: showMessage ? "20px" : "-100vw" }}
              className="show-message"
            >
              Task Added Successfully
              <i class="fa-regular fa-circle-check"></i>
            </p>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
