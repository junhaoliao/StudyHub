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

// Create a session cookie
// app.use(
//   session({
//     secret: "oursecret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       expires: 60000,
//       httpOnly: true
//     }
//   })
// );
app.get("/RegularUser/username/password", (req, res) => {
  console.log("Access User");
  const username = req.body.username;
  const password = req.body.password;
  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      res.send(user);
    })
    .catch(error => {
      res.status(400).send();
    });
});

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

app.get("/CourseTeaching", (req, res) => {
  console.log("Check all courses taking");
  const username = req.body.username;
  const password = req.body.password;
  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      res.send(user.courseTeaching);
    })
    .catch(error => {
      res.status(400).send();
    });
});

app.post("/CourseTeaching", (req, res) => {
  console.log("Add a course to teach");
  const username = req.body.username;
  const password = req.body.password;
  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      const new_course = {
        title: req.body.title,
        admin: req.body.username
      };
      user.courseTeaching.push(new_course);
      user.save();
      res.send(user);
    })
    .catch(error => {
      res.status(400).send();
    });
});

app.get("/CourseTaking", (req, res) => {
  console.log("Check all courses taking");
  const username = req.body.username;
  const password = req.body.password;
  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      res.send(user.courseTaking);
    })
    .catch(error => {
      res.status(400).send();
    });
});

app.post("/CourseTaking", (req, res) => {
  console.log("Add a course to take");
  const username = req.body.username;
  const password = req.body.password;
  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      const new_course = {
        title: req.body.title,
        admin: req.body.username
      };
      user.courseTaking.push(new_course);
      user.save();
      res.send(user);
    })
    .catch(error => {
      res.status(400).send();
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
