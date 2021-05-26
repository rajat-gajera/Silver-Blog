import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "../CSS/addblog.css";

const Writeblog = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const geAuthorDetail = async () => {
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
    geAuthorDetail();
  }, []);
  const [blog, setBlog] = useState({
    title: "",
    subtitle: "",
    topic: "",
    contnet: "",
  });
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBlog({ ...blog, [name]: value });
    console.log(blog);
  };
  const submitBlog = async (event) => {
    console.log("Cliked");
    event.preventDefault();

    const { title, subtitle, topic, content } = blog;
    if (!title || !subtitle || !topic || !content) {
      window.alert("All Fields Are Mandatory");
    }
    const author = userData._id;
    console.log(author);
    const res = await fetch("/addblog", {
      method: "POST",

      headers: {
        "Content-Type": "application/json ",
        Accept: "application/json",
        "Access-Control-Origin": "*",
      },

      body: JSON.stringify({ author, title, subtitle, topic, content }),
    });
    const data = res.json();
    if (res.status === 500 || !data) {
      window.alert("Failed to Upload blog!!");
      return;
    } else if (res.status === 201) {
      window.alert("Blog Added Successfully");
      history.push("/");
    } else {
      window.alert("Failed to Upload blog!!");
      return;
    }
  };

  return (
    <div>
      <form className="blog-form" method="POST">
        <div className="form-div">
          <input
            className="input"
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Title"
            required
          />
        </div>
        <div className="form-div">
          <input
            className="input"
            type="text"
            name="subtitle"
            value={blog.subtitle}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Sub Title"
            required
          />
        </div>
        <div className="form-div">
          <input
            className="input"
            type="text"
            name="topic"
            value={blog.topic}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Topics"
            required
          />
        </div>
        <div className="form-div">
          <textarea
            className="contenttextarea"
            name="content"
            value={blog.content}
            onChange={handleChange}
            autoComplete="off"
            placeholder="Content"
            required
          />
        </div>
        <div className="form-div">
          <input
            className="form-submit"
            type="button"
            className="button"
            name="submit"
            value="Add Blog"
            onClick={submitBlog}
          />
        </div>
      </form>
    </div>
  );
};

export default Writeblog;
