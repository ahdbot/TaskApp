import Header from "../../comp/header";

import Modal from "../../shared/Modal";
import Footer from "../../comp/Footer";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./signin.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [resetPass, setresetPass] = useState("");
  const [password, setpassword] = useState("");
  const [hasError, sethasError] = useState(false);
  const [firebaseError, setfirebaseError] = useState("");
  const [CloseModal, setCloseModal] = useState(true);
  const [showSendEmail, setshowSendEmail] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const { t, i18n } = useTranslation();
  const forgotPassword = () => {
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  const SignInBTN = (eo) => {
    eo.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
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

  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>
      <Header />

      <main>
        {showModal && (
          <Modal closeModal={closeModal}>
            <input
              onChange={(eo) => {
                setresetPass(eo.target.value);
              }}
              required
              placeholder=" E-mail : "
              type="email"
            />
            <button
              onClick={(eo) => {
                eo.preventDefault();

                sendPasswordResetEmail(auth, resetPass)
                  .then(() => {
                    console.log("send email");
                    setshowSendEmail(true);
                  })
                  .catch((error) => {
                    // ..
                  });
              }}
            >
              {i18n.language === "ar" && " ارسل "}
              {i18n.language === "en" && " send "}
              {i18n.language === "fr" && " envoyer "}
              {i18n.language === "turk" && " elçi "}
              {i18n.language === "jp" && " 送信 "}
            </button>
            {showSendEmail && (
              <p className="check-email">
                Please check your email to reset your password.
              </p>
            )}
          </Modal>
        )}

        <form>
          <input
            onChange={(eo) => {
              setemail(eo.target.value);
            }}
            required
            placeholder=" E-mail : "
            type="email"
          />

          <input
            onChange={(eo) => {
              setpassword(eo.target.value);
            }}
            required
            placeholder=" Password : "
            type="password"
          />

          <button
            onClick={(eo) => {
              SignInBTN(eo);
            }}
          >
            Sign in
          </button>

          {i18n.language === "ar" && (
            <p className="account mtt">
              لاتملك حساب <Link to="/signup"> تسجيل دخول</Link>
            </p>
          )}
          {i18n.language === "en" && (
            <p className="account mtt">
              Don't hava an account <Link to="/signup"> Sign-up</Link>
            </p>
          )}
          {i18n.language === "fr" && (
            <p className="account mtt">
              Je n'ai pas de compte <Link to="/signup">S'inscrire</Link>
            </p>
          )}
          {i18n.language === "turk" && (
            <p className="account mtt">
              Hesap açmayın <Link to="/signup"> Üye olmak</Link>
            </p>
          )}
          {i18n.language === "jp" && (
            <p className="account mtt">
              アカウントをお持ちではありません{" "}
              <Link to="/signup">サインイン</Link>
            </p>
          )}

          <p
            onClick={() => {
              forgotPassword();
            }}
            className="forgot-pass mtt"
          >
            {i18n.language === "ar" && " نسيت كلمة المرور "}
            {i18n.language === "en" && " forget Passowrd"}
            {i18n.language === "fr" && " Mot de passe oublié"}
            {i18n.language === "turk" && " Parolanızı mı unuttunuz"}
            {i18n.language === "jp" && " パスワードをお忘れですか"}
          </p>

          {hasError && <h2>{firebaseError}</h2>}
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
