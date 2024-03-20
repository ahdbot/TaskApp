import Header from "../comp/header";
import Footer from "../comp/Footer";

import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { Link } from "react-router-dom";
import { useEffect } from "react";
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
      <div>
        <Header />

        <main>Loading ........</main>

        <Footer />
      </div>
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
          <main>about page</main>
          <Footer />
        </>
      );
    }
  }
};

export default About;
