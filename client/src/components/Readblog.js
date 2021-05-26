import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/readblog.css";
const Readblog = () => {
  let { id } = useParams();
  const [blog, setBlog] = useState({});
  const [authorData, setAuthorData] = useState({});
  const getblog = async () => {
    try {
      const url = "/home/" + id;
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
      if (data) {
        const jsondata = JSON.stringify(data);
        const jsdata = JSON.parse(jsondata);
        // console.log(jsdata);
        const { author, title, subtitle, topic, content, date } = jsdata;
        setBlog({ author, title, subtitle, topic, content, date });
      } else {
        throw new Error({ error: "data not found" });
      }

      // console.log(blog);
    } catch (err) {
      console.log(err);
    }
  };
  const getAuthorDetail = async () => {
    try {
      console.log(blog.author);
      id = blog.author;
      const url = "/user/" + id;
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
      console.log(data);
      const ddata = JSON.stringify(data);
      const jsdata = JSON.parse(ddata);

      setAuthorData(jsdata);
      console.log(authorData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(async () => {
    await getblog();
    // getAuthorDetail();
  }, []);
  useEffect(async () => {
    // getblog();
    await getAuthorDetail();
  }, [blog.author]);
  return (
    <>
      <div className="blog">
        <div className="title">{blog.title}</div>
        <div className="subtitle">{blog.subtitle}</div>
        <div className="topics">
          <h5>
            {blog.topic}
            <span className="date">{blog.date}</span>
          </h5>
        </div>
        <div className="content">{blog.content}</div>
      </div>
      <div className="author">
        <h4>Author</h4>
        <div className="name">Name : {authorData.name}</div>
        <div className="email">Email : {authorData.email}</div>
        <div className="work">Profession : {authorData.work}</div>
      </div>
    </>
  );
};

export default Readblog;
