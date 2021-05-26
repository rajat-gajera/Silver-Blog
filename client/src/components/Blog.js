import React from "react";
import "../CSS/blog.css";
import "bootstrap/dist/css/bootstrap.css";
import { useHistory } from "react-router-dom";
const Blog = (props) => {
  const history = useHistory();
  const onClick = async () => {
    const blogid = props.blog._id;
    const url = "/home/" + blogid;
    console.log(url);
    history.push(url);
  };
  return (
    <div className="blog-card" onClick={onClick}>
      <h4>
        {props.blog.title}
        <span className="date">{props.blog.date}</span>
      </h4>

      <p>{props.blog.subtitle}</p>
      <div className="topic">{props.blog.topic}</div>
    </div>
  );
};

export default Blog;
