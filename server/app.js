const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
require("./db/conn");
const User = require("./model/userSchema");
const PORT = process.env.PORT;
app.use(express.json());

const cookieParser = require("cookie-Parser");
app.use(cookieParser());
//link to the router file..
app.use(require("./router/auth"));

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}!!`);
});
