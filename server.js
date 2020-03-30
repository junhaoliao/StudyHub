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
app.use(bodyParser.urlencoded({extended: true}));

// fileUpload for uploading file to courses
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    limits: {fileSize: 500 * 1024 * 1024}
}));
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    limits: { fileSize: 500 * 1024 * 1024 }
  })
);

// datetime for converting date to string
const datetime = require('date-and-time');

// building database
const { ObjectID } = require("mongodb");
const { mongoose } = require("./db/mongoose");
mongoose.set("useFindAndModify", false);
const {RegularUser} = require("./models/RegularUser");
const {Course} = require("./models/Course");
const {BillBoard} = require("./models/BillBoard");
const {File} = require("./models/File");
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
            res.send({currentUser: user.username});
        })
        .catch(error => {
            res.status(400).send();
        });
});

app.post("/RegularUser/signup", (req, res) => {
    const username = req.body.username;

    console.log("Create a new user");
    console.log("username: " + username);

    RegularUser.findOne({username: username})
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
                        res.send({currentUser: user.username});
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
        res.status(403).send();
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
                                res.send({courses: list});
                            }
                        });
                    })
                );
                //console.log(list);
            }
        })
        .catch(error => res.status(500).send());


});

app.post("/courses", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        res.status(403).send();
        return;
    }
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        admin: currentUserID,
        users: [currentUserID]
    });

    // Save the course
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

app.get("/courses/:courseName", (req, res) => {
    const userID = req.session.currentUserID;
    if (!userID) {
        return res.status(403).send(); // user not logged in
    }
    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {

                const theCourse = {};
                theCourse.name = course.name;
                // incomplete

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(); // server error
        });


});

// get resources of some course given a course name
app.get("/courses/:courseName/getResources", (req, res) => {
    const userID = req.session.currentUserID;
    if (!userID) {
        return res.status(400).send(); // user not logged in
    }
    const resourcesList = [];
    const courseName = req.params.courseName;
    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {
                let count = 0;
                course.resources.forEach((fileObjectID) => {
                    File.findById(fileObjectID).then((fileDBEntry) => {
                        const newResource = {};
                        newResource.name = fileDBEntry.name;
                        newResource.link = `/download/${fileObjectID._id}`;
                        newResource.type = fileDBEntry.type;
                        newResource.size = fileDBEntry.size;
                        newResource.date = datetime.format(fileDBEntry.date, "M/D/Y h:mm A");
                        resourcesList.push(newResource);
                        count++;
                        if (count === course.resources.length) {
                            return res.send({resources: resourcesList});
                        }
                    }).catch(error => {
                        console.log(error);
                        res.status(500).send(); // server error
                    })


                });

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(); // server error
        });


});

// function to add a user to a course given a course name
// things to be done: the api is not protected
app.patch("/courses/:courseName", (req, res) => {

    const userID = req.session.currentUserID;
    if (!userID) {
        return res.status(400).send(); // user not logged in
    }
    const courseName = req.params.courseName;
    let theCourse = null;
    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                return res.status(404).send(); // could not find this resource
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
                                        return res.status(400).send(error); // 400 for bad request
                                    }
                                );
                            })
                            .catch(error => {
                                console.log(error);
                                return res.status(500).send(); // server error
                            });
                    },
                    error => {
                        log("bad request");
                        return res.status(400).send(error); // 400 for bad request
                    }
                );
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); // server error
        });
});

// add an announcement to the course
// 1. get the course
// 2. check whether the current user is the admin of the course
// 3. push the announcement into course.announcements
// 4. delete the first announcement whenever there are more than 3 announcements
app.post("/courses/:courseName/announcement", (req, res) => {
  console.log("rock your body");
  const currentUserID = req.session.currentUserID;
  if (!currentUserID) {
    res.status(400).send();
    return;
  }
  let theCourse = null;
  console.log("rock your body right");
  const courseName = req.params.courseName;

  Course.findByCourseName(courseName)
    .then(course => {
      console.log("backstreet boy alright");
      if (!course) {
        log("invalid course name");
        res.status(404).send(); // could not find this resource
      } else {
        // check whether the current user is the admin of the course
        if (course.admin != currentUserID) {
          return res.status(403).send();
        } else {
          const newAnnouncement = {
            title: req.body.title,
            content: req.body.content
          };
          course.announcements.push(newAnnouncement);

          //see if there are more than 3 announcements
          if (course.announcements.length > 3) {
            //delete the oldest announcement
            course.announcements.shift();
          }

          //save the course
          course.save().then(
            result => {
              return res.send({
                message: "announcement sent successfully"
              });
            },
            error => {
              return res.status(400).send(error);
            }
          );
        }
      }
    })
    .catch(error => {
      console.log("hi i am here");
      console.log(error);
      return res.status(111).send(); // server error
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

/* Profile API routes*/
// return regular user profile by user id
app.get("/RegularUser/profile", (req, res) => {
    const userid = req.session.currentUserID;
    if (userid !== undefined) {
        RegularUser.findById(userid)
            .then(user => {
                if (!user) {
                    console.log("Regular user does not exist");
                    res.status(404).send();
                } else {
                    res.send(user);
                }
            })
            .catch(error => {
                res.status(500).send();
            });
    } else {
        console.log("Unauthorized access to user profile");
        res.status(401).send();
    }
});

// return regular user course taking
app.get("/RegularUser/profile/courseTaking", (req, res) => {
  const userid = req.session.currentUserID;
  if (userid != undefined) {
    RegularUser.findById(userid)
      .then(user => {
        if (!user) {
          console.log("Regular user does not exist");
          res.status(404).send();
        } else {
          let count = 0;
          const list = [];
          const rawList = user.courseTaking;
          rawList.forEach(courseObjectID =>
            Course.findById(courseObjectID).then(course => {
              RegularUser.findById(course.admin).then(admin => {
                const thisCourse = {};
                thisCourse.id = courseObjectID;
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
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  } else {
    console.log("Unauthorized access to profile course taking");
    res.status(401).send();
  }
});

// return regular user course teaching
app.get("/RegularUser/profile/courseTeaching", (req, res) => {
  const userid = req.session.currentUserID;
  if (userid != undefined) {
    RegularUser.findById(userid)
      .then(user => {
        if (!user) {
          console.log("Regular user does not exist");
          res.status(404).send();
        } else {
          let count = 0;
          const list = [];
          const rawList = user.courseTeaching;
          rawList.forEach(courseObjectID =>
            Course.findById(courseObjectID).then(course => {
              RegularUser.findById(course.admin).then(admin => {
                const thisCourse = {};
                thisCourse.id = courseObjectID;
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
        }
      })
      .catch(error => {
        res.status(400).send();
      });
  } else {
    console.log("Unauthorized access to profile course teaching");
    res.status(401).send();
  }
});
// update user information
/* request body:
  {
      "username": "",
      "password": "",
      "GPA": ,
      "gender": "",
      "levelOfEducation": "",
      "fieldOfStudy": ""
  }
  */
app.post("/RegularUser/Profile", (req, res) => {
  const userid = req.session.currentUserID;
  //const userid = req.body.userid;
  if (userid !== undefined) {
    RegularUser.findById(userid).then(user => {
      if (!user) {
        console.log("Regular user does not exist");
        res.status(404).send();
      } else {
        user.username = req.body.username;
        user.password = req.body.password;
        user.GPA = req.body.GPA;
        user.gender = req.body.gender;
        user.levelOfEducation = req.body.levelOfEducation;
        user.fieldOfStudy = req.body.fieldOfStudy;
        user.courseTaking = req.body.courseTaking;
        user.courseTeaching = req.body.courseTeaching;
        console.log("test1");
        user
          .save()
          .then(
            result => {
              console.log("Saving new user profile");
              res.send(result);
            },
            error => {
              console.log("test2");
              res.send(400).send();
            }
          )
          .catch(error => {
            console.log("test3");
            res.status(400).send();
          });
      }
    });
  }
});

// handling upload requests
// partial code from example https://github.com/bradtraversy/react_file_uploader
const sizeToString = (size) => {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    } else {
        return `${Math.round(size / 1024 / 1024 * 100) / 100} MB`;
    }
};
app.post('/courses/:courseName/upload', (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }
    if (req.files === null) {
        return res.status(400).send();
    }

    const courseName = req.params.courseName;

    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                return res.status(404).send(); // could not find the course
            } else {
                if (course.admin != currentUserID) {
                    console.log("not admin");
                    console.log(course.admin);
                    console.log(currentUserID);
                    return res.status(403).send(); // not the admin uploading
                }

                const file = req.files.file;

                // if the file is over the uploading limit, the file should not be saved
                if (file.truncated) {
                    console.log("File larger than limit");
                    return res.status(400).send({
                        message: "File larger than limit"
                    });
                }

                const fileDBEntry = new File(
                    {
                        name: file.name,
                        type: file.name.split('.').pop().toLowerCase(),
                        size: sizeToString(file.size),
                        date: new Date(),
                        course: course._id
                    }
                );

                fileDBEntry.save().then((result) => {
                    // move the resource into the server's path
                    file.mv(`${__dirname}/uploads/${result._id}`, err => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }

                        // save the file to the course
                        course.resources.push(result._id);
                        course.save();

                        return res.json({fileName: file.name, filePath: `/uploads/${result._id}`});
                    });
                }).catch(error => {
                    console.log(error);
                    return res.status(500).send(); // server error
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(); // server error
        });

});

app.get('/download/:file_id', (req, res) => {
    // check whether the user has logged in
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        res.status(403).send();
    }

    const file_id = req.params.file_id;
    if (!ObjectID.isValid(file_id)) {
        res.status(400).send();
    }

    File.findById(file_id).then((fileDBEntry) => {
        if (!fileDBEntry) {
            res.status(404).send();
        } else {
            res.download(`${__dirname}/uploads/${file_id}`, fileDBEntry.name);
        }
    }).catch(error => {
        console.log(error);
        res.status(500).send(); // server error
    });


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
