const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../db/conn");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
const Blog = require("../model/blogSchema");
const router = express.Router();

let userId = "";
router.get("/", (req, res) => {
  res.send("Hello Raaja from Router server");
});

//Registration Routet
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Plz fill all Feild" });
  }
  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Already Registerd!!" });
    } else if (password != cpassword) {
      return res
        .status(422)
        .json({ error: "Password & confirm password does not match!!" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

    try {
      const result = await user.save();
      //userId = result._id;
      if (result)
        res.status(201).json({ message: "User Registerd successfully" });
    } catch (err) {
      res.status(500).json({ error: "Failed to Register!!" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to Register!!" });
  }
});
//Login Routet
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please fill all the required Field!" });
    }

    try {
      const userLogin = await User.findOne({ email: email });

      console.log(userLogin._id);

      // userId = userLogin._id;

      if (!userLogin) {
        res.status(400).json({ error: "Invalid Credietials1" });
      }
      const isMatch = await bcryptjs.compare(password, userLogin.password);
      console.log(isMatch);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credietials2" });
      }
      if (userLogin) {
        const token = await userLogin.generateAuthToken(process.env.SECRET_KEY);
        res.cookie("jwttoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        console.log(token);
        // console.log(userLogin);
        res.json({ message: "User sign in succsessfully!" });
      } else {
        res.json({ message: "Something went wrong!!" });
      }
    } catch (e) {
      res.json({ error: e });
    }
  } catch (e) {
    res.json({ error: e });
  }
});

router.get("/about", authenticate, (req, res) => {
  // console.log(req.cookies.jwtoken);
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).send("user Logout");
});

router.post("/addblog", async (req, res) => {
  const { author, title, subtitle, content, topic } = req.body;
  if (!author || !title || !subtitle || !content || !topic) {
    return res.status(422).json({ error: "Plz fill all Feild" });
  }
  const date = new Date().toDateString();
  const blog = new Blog({ author, title, subtitle, content, topic, date });
  try {
    const result = await blog.save();
    if (result)
      res
        .status(201)
        .json({ message: "blog added successfully", body: result });
    else {
      res.status(500).json({ error: "blog uploading falied!" });
    }
  } catch (e) {
    res.status(500).json({ error: "Failed to Upload blog!!" });
  }
});

router.get("/getblogs", async (req, res) => {
  const result = await Blog.find({});
  res.status(200).json(result);
});

router.get("/home/:blogid", async (req, res) => {
  const bid = req.params.blogid;
  try {
    const blog = await Blog.findOne({ _id: bid });
    res.status(201).json(blog);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.get("/user/:userid", async (req, res) => {
  const bid = req.params.userid;
  console.log(bid);
  try {
    const blog = await User.findOne({ _id: bid });
    res.status(201).json(blog);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
router.get("/blogbyuser/:userid", async (req, res) => {
  const bid = req.params.userid;
  console.log(bid);
  try {
    const result = await Blog.find({ author: bid });
    res.status(201).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});
module.exports = router;
