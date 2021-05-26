import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/signin.css";
import signinphoto from "../signin.jpg";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App.js";
const Signin = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json ",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successfull");
      history.push("/");
    }
  };
  return (
    <>
      <section className="signin">
        <div className="container mt-5">
          <div className="signin-container">
            <div className="image-container">
              <img src={signinphoto} className="image" />
            </div>
            <div className="form">
              <h2> Sign In</h2>
              <div className="signin-form">
                <form className="register-form" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-email"></i>
                    </label>
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      placeholder="Your Email"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-pin-assistant material-icons-name"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="off"
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      onClick={loginUser}
                      className="form-submit"
                      value="Sign In"
                    />
                  </div>

                  <div className="form-group1">
                    <NavLink to="/signup">I am Not Registred!</NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signin;
