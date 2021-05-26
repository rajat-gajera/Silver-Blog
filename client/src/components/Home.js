import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App.js";
import "../CSS/blog.css";

import Blog from "./Blog";
const Home = () => {
  const { state, dispatch } = useContext(UserContext);

  const [blogs, setBlogs] = useState([]);
  const [userData, setUserData] = useState();
  const callHomePage = async () => {
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
      // console.log(data);
      dispatch({ type: "USER", payload: true });

      setUserData(data);

      // console.log(userData);
    } catch (err) {
      console.log(err);
    }
  };

  const getblogs = async () => {
    try {
      const res = await fetch("/getblogs", {
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
      // console.log("-------------");
      // console.log(jsdata);
      setBlogs(jsdata);
      // console.log(ddata);
      // console.log(blogs);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    callHomePage();
    getblogs();
  }, []);
  //date topic main title subtitle
  return (
    <div className="home-page">
      {/* <Blog blog={blogs[1]}></Blog> */}
      {blogs.map((b) => {
        return <Blog blog={b} className="blog-card" />;
      })}
    </div>
  );
};

export default Home;
