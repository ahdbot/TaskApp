
import Header from "./Header";
import Footer from "./Footer";
import  './Loading.css';



import React from 'react';

const Loading = () => {
  return (
    <div>
        <Header />

        <main>
          <div className="loading"></div>
        </main>
        <Footer />
      </div>
  );
}

export default Loading;