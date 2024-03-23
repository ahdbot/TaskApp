import Header from "../comp/header"
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
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
            {/* {array.map((item) => {
              <div key={item}>
                <h3> {item} </h3>;
              </div>;
            })} */}
          </main>
          <Footer />
        </>
      );
    }
  }
};

export default About;
