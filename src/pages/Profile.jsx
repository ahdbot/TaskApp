import Header from "../comp/header";
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { deleteUser } from "firebase/auth";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });

  const DeleteBtn = () => {
    deleteUser(user)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...

        console.log(error.message);
      });
  };

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <h2>Loading.......................</h2>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>

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
          {i18n.language === "ar" && (
            <div dir="rtl">
              <h6>الايميل: {user.email}</h6>
              <h6>اسم المستخدم: {user.displayName}</h6>
              <h6>
                اخر تسجيل دخول:{" "}
                <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
              </h6>

              <h6>
                تم إنشاء الحساب:{" "}
                <Moment fromNow date={user.metadata.creationTime} />
              </h6>
            </div>
          )}

          {i18n.language === "en" && (
            <div>
              <h6>Email: {user.email}</h6>
              <h6>UserName: {user.displayName}</h6>
              <h6>
                Last Sign-in :{" "}
                <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
              </h6>

              <h6>
                Account Created :{" "}
                <Moment fromNow date={user.metadata.creationTime} />
              </h6>
            </div>
          )}
          {i18n.language === "fr" && (
            <div>
              <h6>Email: {user.email}</h6>
              <h6>Nom d'utilisateur: {user.displayName}</h6>
              <h6>
                Dernière connexion:{" "}
                <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
              </h6>

              <h6>
                Compte créé:{" "}
                <Moment fromNow date={user.metadata.creationTime} />
              </h6>
            </div>
          )}
          {i18n.language === "turk" && (
            <div>
              <h6>E-posta: {user.email}</h6>
              <h6>Kullanıcı adı: {user.displayName}</h6>
              <h6>
                Son oturum açma:{" "}
                <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
              </h6>

              <h6>
                Hesap oluşturuldu :{" "}
                <Moment fromNow date={user.metadata.creationTime} />
              </h6>
            </div>
          )}
          {i18n.language === "jp" && (
            <div>
              <h6>Eメール: {user.email}</h6>
              <h6>ユーザー名: {user.displayName}</h6>
              <h6>
                最終サインイン:{" "}
                <Moment fromNow date={user.metadata.lastSignInTime} />{" "}
              </h6>

              <h6>
                アカウントが作成されました:{" "}
                <Moment fromNow date={user.metadata.creationTime} />
              </h6>
            </div>
          )}
        </main>

        <Footer />
      </>
    );
  }
};

export default Profile;
