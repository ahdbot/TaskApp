import React, { useState } from "react";
import "./Footer.css";

function getDate() {
  const today = new Date();

  const year = today.getFullYear();

  return `${year}`;
}

const Footer = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div className="myfooter">
      <footer className="ali   ">
        Designed and developed by Ahmad Bajaber
        <p>{currentDate} 	&copy;</p>
      </footer>
    </div>
  );
};

export default Footer;
