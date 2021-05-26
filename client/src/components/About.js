import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/about.css";
const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });

      if (res.status !== 200) {
        const error = new Error(res.error);
        throw error;
      }

      const data = await res.json();
      const ddata = JSON.stringify(data);
      const jsdata = JSON.parse(ddata);

      setUserData(jsdata);

      console.log(userData);
    } catch (err) {
      console.log(err);
      history.push("/signin");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <div>
      <div className="about-container">
        <div className="feild">Name : {userData.name}</div>
        <div className="feild"> Email : {userData.email}</div>
        <div className="feild"> Phone : {userData.phone}</div>
        <div className="feild">profession : {userData.work}</div>
      </div>
    </div>
  );
};

export default About;
