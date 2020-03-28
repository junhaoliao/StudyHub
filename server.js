"use strict";

const log = console.log;

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
mongoose.set("useFindAndModify", false);
const { RegularUser } = require("./models/RegularUser");
const { Course } = require("./models/Course");
const { BillBoard } = require("./models/BillBoard");
console.log("Welcome to server.js");

// Create a session cookie
app.use(
  session({
    secret: "oursecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 6000000,
      httpOnly: true
    }
  })
);

/*
user authentication routes
*/
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
      req.session.currentUserID = user._id;
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
    res.send({
      currentUser: req.session.username,
      currentUserID: req.session.currentUserID
    });
  } else {
    res.status(401).send();
  }
});

// A rounte to get all regular users
app.get("/AllRegularUser", (req, res) => {
  RegularUser.find()
    .then(result => {
      if (!result) {
        res.status(404).send();
      } else {
        res.send(result);
      }
    })
    .catch(error => {
      res.status(500).send();
    });
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

app.get("/courses", (req, res) => {
  const currentUserID = req.session.currentUserID;
  if (!currentUserID) {
    res.status(400).send();
    return;
  }

  RegularUser.findById(currentUserID)
    .then(user => {
      if (!user) {
        res.status(404).send();
      } else {
        let count = 0;
        const list = [];
        const rawList = user.courseTeaching.concat(user.courseTaking);
        //console.log(rawList);
        rawList.forEach(courseObjectID =>
          Course.findById(courseObjectID).then(course => {
            RegularUser.findById(course.admin).then(admin => {
              const thisCourse = {};
              thisCourse.name = course.name;
              thisCourse.info = course.description;
              thisCourse.admin = admin.username;
              thisCourse.liked = true;
              list.push(thisCourse);
              count++;
              if (count === rawList.length) {
                res.send({ courses: list });
              }
            });
          })
        );
        //console.log(list);
      }
    })
    .catch(error => res.status(500).send());

  // Course.find().then(
  //     courses => {
  //         res.send({courses}); // can wrap in object if want to add more properties
  //     },
  //     error => {
  //         res.status(500).send(error); // server error
  //     }
  // );
});

app.post("/courses", (req, res) => {
  const currentUserID = req.session.currentUserID;
  if (!currentUserID) {
    res.status(400).send();
    return;
  }
  const course = new Course({
    name: req.body.name,
    description: req.body.description,
    admin: currentUserID,
    users: [currentUserID]
  });

  // Save the user
  course.save().then(
    result => {
      RegularUser.findById(currentUserID).then(user => {
        log(user);
        log(course._id);
        user.courseTeaching.push(course._id);
        user.save();
        res.send(result);
      });
    },
    error => {
      res.status(400).send(error); // 400 for bad request
    }
  );
});

// app.post("/courses", (req, res) => {
//     const course = new Course({
//         name: req.body.name,
//         description: req.body.description,
//         admin: req.body.admin,
//         users: [req.body.admin]
//     });
//     log(course);
//     // Save the user
//     course.save().then(
//         courses => {
//             res.send(courses);
//         },
//         error => {
//             res.status(400).send(error); // 400 for bad request
//         }
//     );
// });

// function to add a user to a course given a course name
// things to be done: the api is not protected
app.patch("/courses/:courseName", (req, res) => {
  const courseName = req.params.courseName;
  const userID = req.session.currentUserID;
  if (!userID) {
    res.status(400).send(); // session expired
    return;
  }
  let theCourse = null;
  Course.findByCourseName(courseName)
    .then(course => {
      if (!course) {
        log("invalid course name");
        res.status(404).send(); // could not find this resource
      } else {
        log(userID);
        course.users.addToSet(userID);

        course.save().then(
          () => {
            RegularUser.findById(userID)
              .then(user => {
                user.courseTaking.addToSet(course._id);
                user.save().then(
                  () => {
                    res.send({
                      message:
                        "successfully added the course to the current user"
                    });
                  },
                  error => {
                    log("bad request");
                    res.status(400).send(error); // 400 for bad request
                  }
                );
              })
              .catch(error => {
                console.log(error);
                res.status(500).send(); // server error
              });
          },
          error => {
            log("bad request");
            res.status(400).send(error); // 400 for bad request
          }
        );
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).send(); // server error
    });
});

/* Bill Board API Route */
// return all bill board content
app.get("/BillBoard/content", (req, res) => {
  const userid = req.session.currentUserID;
  if (userid !== undefined) {
    BillBoard.find()
      .then(result => {
        if (!result) {
          res.status(404).send();
        } else {
          res.send(result);
        }
      })
      .catch(error => {
        res.status(500).send();
      });
  } else {
    console.log("Unauthorized access to BillBoard");
    res.send(401).send();
  }
});

// add a new bill board content
/* request body:
{
    "username": ,
    "date": ,
    "message": ,
    "image": 
}
*/
app.post("/BillBoard/new", (req, res) => {
  const userid = req.session.currentUserID;
  //const userid = req.body.userid;
  //   const username = req.body.username;
  //   const date = req.body.date;
  //   const message = req.body.message;
  //   const image = req.body.image;
  //   console.log("Create a new billboard message");
  //   console.log("User id: " + userid);
  //   console.log("username: " + username);
  //   console.log("date: " + date);
  //   console.log("message: " + message);
  //   console.log("image: " + image);
  if (userid !== undefined) {
    RegularUser.findById(userid)
      .then(user => {
        if (!user) {
          res.status(404).send();
        } else {
          console.log("Found user, add billlboard content");
          const new_BillBoard_content = new BillBoard({
            userid: req.session.currentUserID,
            username: req.body.username,
            date: req.body.date,
            message: req.body.message,
            image: req.body.image
          });
          console.log("Creating new content");
          console.log(new_BillBoard_content);
          new_BillBoard_content.save().then(
            result => {
              console.log("Saving new content");
              res.send(result);
            },
            error => {
              res.send(400).send();
            }
          );
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  } else {
    console.log("Unauthorized access to BillBoard");
    res.send(401).send();
  }
});

app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/client/build/index.html");
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
