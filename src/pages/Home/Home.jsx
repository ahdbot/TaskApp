import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import Error from "../Error";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// import ReactLoading from "react-loading";
import Loading from "react-loading";
import "./Home.css";

// LEVEL 2

// level 3
import "./Home.css";
const SendAgine = () => {
  sendEmailVerification(auth.currentUser).then(() => {
    console.log("Email Verification sent!");
  });
};
const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  console.log(user);
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
          <meta name="description" content="HOMEEEEEEEEEEEE" />
        </Helmet>

        <Header />

        <main>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to={"/edit-task"}>
              sign in
            </Link>{" "}
            to continue... <span>🧡</span>
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
            <style type="text/css">{` 
         main{
          flex-direction: column;
          align-items: flex-start;
  
    width: fit-content;
    margin: auto;
        }

        .delete{
          margin-top: 25px;
        background-color:  #dc3545;
        padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    border-color: #dc3545;
        }
        
        `}</style>
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName} <span>🧡</span>
            </p>
            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                SendAgine();
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

          <main className=" home">
            <section className=" parent-of-btns flex mtt">
              <button>Newest First</button>
              <button>Oldest first </button>
              <select id="browsers">
                <option value="ddddd"> All Tasks </option>
                <option value="dddddd"> Completed </option>
                <option value="dddddd"> Not Completed </option>
              </select>
            </section>

            <section className="flex all-tasks">
              <article dir="auto" className="one-task">
             <Link to={"/edittask"}>
             <h2> New Task</h2>
                <ul>
                  <li>Sub task 1</li>
                  <li>Sub task 2</li>
                </ul>
                <p className="time">a day ago</p>
             
             </Link>
              </article>
            </section>

            <section className="mt">
              <button className="add-task-btn  ">
                Add new Task <i class="fa-solid fa-plus"></i>
              </button>
            </section>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
