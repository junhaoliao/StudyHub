"use strict";

// starting the express server
const express = require("express");
const app = express();

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

// building database
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
const { RegularUser } = require("./models/RegularUser");

console.log("Welcome to server.js");

// Create a session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60000,
      httpOnly: true
    }
  })
);

// A route to login and create a session
app.post("/RegularUser/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("username: " + username);
  console.log("password: " + password);

  RegularUser.findByUsernamePassword(username, password)
    .then(user => {
      console.log("found user");
      req.session.username = user.username;
      console.log("ready to send response1");
      //req.seesion.user = user._id;
      console.log("ready to send response2");
      res.send({ currentUser: user.username });
    })
    .catch(error => {
      res.status(400).send();
    });
});

app.post("/RegularUser/signup", (req, res) => {
  const username = req.body.username;

  console.log("Create a new user");
  console.log("username: " + username);

  RegularUser.findOne({ username: username })
    .then(result => {
      if (!result) {
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
          user => {
            req.session.username = user.username;
            res.send({ currentUser: user.username });
            //res.send(result);
          },
          error => {
            res.status(400).send(error);
          }
        );
      } else {
        console.log("Username already exists");
        res.status(400).send();
      }
    })
    .catch(error => {
      res.status(400).send();
    });
});

// A route to logout a user
app.get("/RegularUser/logout", (req, res) => {
  // Remove the session
  req.session.destroy(error => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send();
    }
  });
});

// A route to check if a use is logged in on the session cookie
app.get("/RegularUser/check-session", (req, res) => {
  if (req.session.username) {
    res.send({ currentUser: req.session.username });
  } else {
    res.status(401).send();
  }
});

// API rountes start here

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

app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
