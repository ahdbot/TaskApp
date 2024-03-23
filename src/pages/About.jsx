import Header from "../comp/header";
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const inputElement = useRef(null);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>About Page</title>
        </Helmet>
        <Header />
        <main>About page</main>
        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      navigate("/");
    }
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>About Page</title>
            <meta name="description" content="HTMLLLLLLLLLLLLLLLL" />
          </Helmet>
          <Header />
          <main>
            <button
              onClick={(eo) => {
                inputElement.current.Foucs();
              }}
              className="delete"
            >
              delete
            </button>

            <input ref={inputElement} type="text" name="" id="aaaa" />
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;
