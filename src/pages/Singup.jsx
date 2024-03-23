import Header from "../comp/header";
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Error from "../pages/Error";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassowrd] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [userName, setUserName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  // loading

  // not sing-in

  // sign-in wihhout email virefication

  // (sign-in wihhout email virefication)

  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate("/");
      }
    }
  });

  const SignUpBtn = (eo) => {
    eo.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        sendEmailVerification(auth.currentUser).then(() => {
          console.log("Email verification Sent ! ");
        });
        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
          });
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/user-not-found":
            setfirebaseError("Wrong Email");
            break;

          case "auth/wrong-password":
            setfirebaseError("Wrong Password");
            break;

          case "auth/too-many-requests":
            setfirebaseError("Too many requests, please try aganin later");
            break;

          default:
            setfirebaseError("Please check your email & password");
            break;
        }
      });
  };

  if (error) {
    return <Error />;
  }
  if (loading) {
    return (
      <div>
        <Header />

        <main>Loading........</main>
        <Footer />
      </div>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <div>
          <Header />

          <main>
            <p>We send you an email to verify your Account</p>
            <button className="delete">Send again</button>
          </main>
          <Footer />
        </div>
      );
    }
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>Signup Page</title>
          <meta name="description" content="JAVASCRIPTTTTTTTTTTTTTTTTTTTTT" />
          <style type="text/css">{`
     
   
          
      `}</style>
        </Helmet>
        <Header />

        <main>
          <form>
            <p style={{ fontSize: "23px", marginBottom: "22px" }}>
              Create a new account <span>🧡</span>{" "}
            </p>
            <input
              onChange={(eo) => {
                setUserName(eo.target.value);
              }}
              type="text"
              placeholder="user Name : "
              required
            />
            <input
              onChange={(eo) => {
                setemail(eo.target.value);
              }}
              type="email"
              placeholder="Email : "
              required
            />
            <input
              onChange={(eo) => {
                setpassowrd(eo.target.value);
              }}
              type="password"
              placeholder="password  : "
              required
            />
            <button
              onClick={(eo) => {
                SignUpBtn(eo);
              }}
            >
              Sign Up
            </button>
            <p className="account">
              don't have an account <Link to="/signin"> Sign in </Link>
            </p>
            {hasError && <p>{firebaseError}</p>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
