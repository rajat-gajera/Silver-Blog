import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/about.css";
import Blog from "./Blog";
const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [myBlogs, setMyBlogs] = useState([]);
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
  const getMyBlogs = async () => {
    try {
      const url = "/blogbyuser/" + userData._id;
      console.log(url);
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
        },
        credentials: "include",
      });
      if (res.status !== 201) {
        const error = new Error(res.error);
        throw error;
      }
      const data = await res.json();
      const ddata = JSON.stringify(data);
      console.log(ddata);
      const jsdata = JSON.parse(ddata);
      setMyBlogs(jsdata);
      console.log(myBlogs);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    callAboutPage();
  }, []);
  useEffect(() => {
    getMyBlogs();
  }, [userData]);
  return (
    <div>
      <div className="about-container">
        <div className="feild">Name : {userData.name}</div>
        <div className="feild"> Email : {userData.email}</div>
        <div className="feild"> Phone : {userData.phone}</div>
        <div className="feild">profession : {userData.work}</div>
      </div>
      <div className="home-page">
        {/* <Blog blog={blogs[1]}></Blog> */}
        {myBlogs.map((b) => {
          return <Blog blog={b} className="blog-card" />;
        })}
      </div>
    </div>
  );
};

export default About;
