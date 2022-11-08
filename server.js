const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
// const jwt = require("jwt");
const home = require("./routes/home");

const app = express();
const port = process.env.PORT || 5000;

dotenv.config({ path: __dirname + "/.env" });

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (err) => console.error("An error occurred: " + err));

db.once("open", () =>
  console.log("The connection of MongoDB is succsessfully established")
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/home", home);

app.listen(port, () => console.log("Server running"));
