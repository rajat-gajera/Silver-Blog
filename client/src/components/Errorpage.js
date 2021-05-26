import React from "react";
import "../App.css";
import errorpageimg from "../404error.png";
const Errorpage = () => {
  return (
    <>
      <div className="error-page">
        <img src={errorpageimg} className="errorimg" alt=""></img>
      </div>
    </>
  );
};

export default Errorpage;
