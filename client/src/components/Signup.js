import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../CSS/signup.css";
import signupphoto from "../signup.jpg";
import { NavLink, useHistory } from "react-router-dom";
const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    errors: {
      name: "",
      email: "",
      phone: "",
      work: "",
      password: "",
      cpassword: "",
    },
  });
  const [error, setError] = useState(<p></p>);

  let name, value;
  const handleInputs = (event) => {
    name = event.target.name;
    value = event.target.value;
    console.log(name + " " + value);

    if (value === "") {
      setError(<p>{name} should not be empty</p>);
    } else {
      setError(<p></p>);
    }
    setUser({ ...user, [name]: value });
  };
  const postData = async (event) => {
    event.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    if (!name || !email || !phone || !work || !password || !cpassword) {
      window.alert("Invalid Input!");
      return;
    }

    try {
      const res = await fetch("/register", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json ",
          Accept: "application/json",
          "Access-Control-Origin": "*",
        },
        body: JSON.stringify({ name, email, phone, work, password, cpassword }),
      });
      const data = await res.json();
      if (data.status === 422 || data.status === 500 || !data) {
        window.alert("Registration Failed");
        console.log("Registration Failed");
        return;
      } else {
        window.alert("Registration Successfully");
        history.push("/signin");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-container">
            <div className="form">
              <h2> Sign Up</h2>
              <div className="signup-form">
                <form method="POST" className="register-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email material-icons-email"></i>
                    </label>
                    <input
                      type="text"
                      name="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Phone">
                      <i className="zmdi zmdi-phone material-icons-phone"></i>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder="Your Phone No. "
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work">
                      <i className="zmdi zmdi-slideshow material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="work"
                      autoComplete="off"
                      value={user.work}
                      onChange={handleInputs}
                      placeholder="Your Profession"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">
                      <i className="zmdi zmdi-pin-assistant material-icons-name"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                      placeholder="Password"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <i className="zmdi zmdi-pin-assistant material-icons-name"></i>
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                  {error}
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      value="Sign Up"
                      onClick={postData}
                    />
                  </div>
                  <NavLink to="/signin">I am already Registred!</NavLink>
                </form>
              </div>
            </div>

            <div className="image-container ">
              <img src={signupphoto} className=" image" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
