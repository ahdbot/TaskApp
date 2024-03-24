import Header from "../comp/header";
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Error from "../pages/Error";
import Loading from "react-loading";

import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t, i18n } = useTranslation();
  const [showLoading, setshowLoading] = useState(false);
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

  const SignUpBtn = async (eo) => {
    eo.preventDefault();
    setshowLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        sendEmailVerification(auth.currentUser).then(() => {
          //
          console.log("Email verification sent!");
        });

        updateProfile(auth.currentUser, {
          displayName: userName,
        })
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            console.log(error.code);
            // ...
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        sethasError(true);

        switch (errorCode) {
          case "auth/invalid-email":
            setfirebaseError("Wrong Email");
            break;

          case "auth/operation-not-allowed":
            setfirebaseError("للأسف لا  يُمكن   إنشاء حساب فى الوقت الحالى");
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

    setshowLoading(false);
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
              {i18n.language === "ar" && "تسجيل حساب"}
              {i18n.language === "en" && "Register an account"}
              {i18n.language === "fr" && "Enregistrer un compte"}
              {i18n.language === "turk" && "Hesap kaydedin"}
              {i18n.language === "jp" && "アカウントを登録する"}
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
              placeholder="password :"
              required
            />
            <button
              onClick={(eo) => {
                SignUpBtn(eo);
              }}
            >
              {showLoading ? (
                <div style={{ justifyContent: "center" }} className="flex">
                  <Loading
                    type={"spin"}
                    color={"white"}
                    height={20}
                    width={20}
                  />
                </div>
              ) : (
                "Singup"
              )}
            </button>

            {i18n.language === "ar" && (
              <p className="account">
                تمتلك حساب سجل دخول<Link to="/signin"> سجل دخول اولا</Link>
              </p>
            )}
            {i18n.language === "en" && (
              <p className="account">
                Already hava an account <Link to="/signin"> Sign-in first</Link>
              </p>
            )}
            {i18n.language === "fr" && (
              <p className="account">
                Vous avez déjà un compte{" "}
                <Link to="/sign in">Connectez-vous d'abord</Link>
              </p>
            )}
            {i18n.language === "turk" && (
              <p className="account">
                Zaten bir hesabınız var{" "}
                <Link to="/sign in"> Önce oturum açın</Link>
              </p>
            )}
            {i18n.language === "jp" && (
              <p className="account">
                Zaten bir hesabınız var すでにアカウントをお持ちです{" "}
                <Link to="/sign in"> まずサインインしてください</Link>
              </p>
            )}

            {hasError && <h6 className="mtt">{firebaseError}</h6>}
          </form>
        </main>
        <Footer />
      </>
    );
  }
};

export default Signup;
