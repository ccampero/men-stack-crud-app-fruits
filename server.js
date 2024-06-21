const dotenv = require("dotenv"); // require package
dotenv.config(); 
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", async (req, res) => {
    res.send("hello, friend!");
  })
 
  app.get("/", async (req, res) => {
    res.render("index.ejs");
  });

  mongoose.connect(process.env.MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000")
});