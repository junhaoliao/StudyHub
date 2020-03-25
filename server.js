"use strict";

// starting the express server
const express = require("express");
const app = express();

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// building database
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { RegularUser } = require("./models/RegularUser");

console.log("Welcome to server.js");

app.post("/RegularUser", (req, res) => {
  console.log("post a new regular user");
  const new_RegularUser = new RegularUser({
    username: req.body.username,
    password: req.body.password,
    GPA: req.body.GPA,
    gender: req.body.gender,
    levelOfEducation: req.body.levelOfEducation,
    fieldOfStudy: req.body.fieldOfStudy,
    courseTeaching: [],
    courseTaking: []
  });
  new_RegularUser.save().then(
    result => {
      res.send(result);
    },
    error => {
      res.status(400).send(error);
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
