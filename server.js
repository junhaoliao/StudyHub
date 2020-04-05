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
const fileUpload = require("express-fileupload");
app.use(
    fileUpload({
        limits: {fileSize: 500 * 1024 * 1024}
    })
);
const fs = require("fs");
const fsPromises = fs.promises;

// datetime for converting date to string
const datetime = require("date-and-time");

// building database
const {ObjectID} = require("mongodb");
const {mongoose} = require("./db/mongoose");
mongoose.set("useFindAndModify", false);
const {RegularUser} = require("./models/RegularUser");
const {Course} = require("./models/Course");
const {BillBoard} = require("./models/BillBoard");
const {File} = require("./models/File");
//console.log("Welcome to server.js");

// Create a session cookie
app.use(
    session({
        secret: "csc309", // using this for now, may have a security concern
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

    //console.log("username: " + username);
    //console.log("password: " + password);

    RegularUser.findByUsernamePassword(username, password)
        .then(user => {
            //console.log("found user");
            req.session.username = user.username;
            req.session.currentUserID = user._id;
            //console.log("ready to send response1");
            //console.log("ready to send response2");
            res.send({currentUser: user.username});
        })
        .catch(error => {
            res.status(400).send();
        });
});

// A route for admin to access user information
app.post("/RegularUser/access", (req, res) => {
    const userid = req.body.userid;
    RegularUser.findById(userid)
        .then(user => {
            req.session.username = user.username;
            req.session.currentUserID = user._id;
            res.send({currentUser: user.username});
        })
        .catch(error => {
            res.status(400).send();
        });
});

// A route for admin to delete a user
app.post("/RegularUser/remove", (req, res) => {
    const userid = req.body.userid;
    RegularUser.findById(userid)
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                const teachingList = user.coursesTeaching;
                const takingList = user.coursesTaking;

                // find all courses the user to be removed was teaching
                teachingList.forEach(courseObjectID => {
                    Course.findById(courseObjectID).then(course => {

                        // remove the user from the course's list
                        course.users.shift();

                        // if there's another user in course, that user will be the new course admin
                        if (course.users[0] !== undefined) {
                            RegularUser.findById(course.users[0]).then(newUser => {
                                // remove the new admin from course taking
                                newUser.coursesTaking.pull(course);

                                // put the new admin into the course he/she will instruct
                                newUser.coursesTeaching.push(course);
                                newUser.save();
                            });
                        }
                        // otherwise, there will be no course admin until next user join the course
                        course.save();
                    });
                });

                // deal with the course admin to be removed
                //  remove it from all the courses he/she was taking
                //  to prevent unnecessary problem when switching course admin
                takingList.forEach(courseObjectID => {
                    Course.findById(courseObjectID).then(course => {
                        user.coursesTaking.pull(course);

                        course.users.pull(user);
                        course.save();
                        user.save();
                    });
                });
            }
        })
        .catch(error => res.status(500).send());

    RegularUser.findByIdAndDelete(userid)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(400).send();
        });
});

// delete a course in a user's profile, taking or teaching
app.delete("/RegularUser/:userID/removeCourse/:courseName", (req, res) => {
    const userID = req.params.userID;

    RegularUser.findById(userID).then((user) => {
        if (!user) {
            res.status(404).send();
        } else {
            const courseName = req.params.courseName;
            Course.findByCourseName(courseName)
                .then((course) => {
                    if (course.users[0] === userID) {
                        // delete admin's course
                        course.users.shift();
                        // case 1: there's another user in the course
                        //  he/she will become the new course admin
                        if (course.users[0] !== undefined) {
                            RegularUser.findById(course.users[0]).then(newUser => {
                                // remove the new admin from course taking
                                newUser.coursesTaking.pull(course._id);

                                // put the new admin into the course he/she will instruct
                                newUser.coursesTeaching.push(course._id);
                                newUser.save();
                            });
                        }
                        // case 2: there's only the admin user
                        //  there will be no admin for that course until the next user enroll the course
                        //  and he/she will become the new course admin


                        // remove the course from CourseTeaching list of the user
                        user.coursesTeaching.pull(course._id);

                    } else {
                        // user is not the admin in the course to be deleted
                        //  delete the user from the course' users list
                        course.users.pull(userID);

                        // delete the course from the user's CourseTaking list
                        user.coursesTaking.pull(course._id);
                    }
                    if (user.coursesLiked.includes(course._id)) {
                        user.coursesLiked.pull(course._id);
                        course.likes--;
                    }
                    course.save();
                    user.save();
                    return res.send();
                })
        }
    })
});

app.post("/RegularUser/signup", (req, res) => {
    const username = req.body.username;

    //console.log("Create a new user");
    //console.log("username: " + username);

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
                    coursesTeaching: [],
                    coursesTaking: []
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
                //console.log("Username already exists");
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
    //console.log("Access User");
    const username = req.body.username;
    const password = req.body.password;
    //console.log("username: " + username);
    //console.log("password: " + password);

    RegularUser.findByUsernamePassword(username, password)
        .then(user => {
            res.send(user);
        })
        .catch(error => {
            res.status(400).send();
        });
});

app.post("/RegularUser", (req, res) => {
    //console.log("post a new regular user");
    const new_RegularUser = new RegularUser({
        username: req.body.username,
        password: req.body.password,
        GPA: req.body.GPA,
        gender: req.body.gender,
        levelOfEducation: req.body.levelOfEducation,
        fieldOfStudy: req.body.fieldOfStudy,
        coursesTeaching: [],
        coursesTaking: []
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


// regular users can get courses thru this request, so that their course list will be displayed
//  on their dashboard
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
                const rawList = user.coursesTeaching.concat(user.coursesTaking);

                if (rawList.length === 0) {
                    res.send({courses: list});
                }
                //console.log(rawList);
                rawList.forEach(courseObjectID =>
                    Course.findById(courseObjectID).then(course => {
                        // users[0] is always the course admin, who is also a regular user
                        RegularUser.findById(course.users[0]).then(admin => {
                            const thisCourse = {};
                            thisCourse.name = course.name;
                            thisCourse.info = course.description;
                            // admin: for displaying the admin on the dashboard
                            thisCourse.admin = admin.username;
                            thisCourse.liked = user.coursesLiked.includes(course._id);
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

// users can create a course thru this request. since she/he creates the course,
//  she/he is the first user in the "users" array. Therefore, users[0] is the
//  course admin.
app.post("/courses", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        res.status(403).send();
        return;
    }

    const courseName = req.body.name.toUpperCase();

    console.log(courseName);
    Course.findOne({name: courseName})
        .then(existedCourse => {
            if (existedCourse) {
                return res.status(400).send(); // duplicated course name
            }

            const course = new Course({
                name: courseName,
                description: req.body.description,
                users: [currentUserID]
            });

            // Save the course
            course.save().then(
                result => {
                    RegularUser.findById(currentUserID).then(user => {
                        user.coursesTeaching.push(course._id);
                        user.save();
                        res.send(result);
                    });
                },
                error => {
                    res.status(400).send(error); // 400 for bad request
                }
            );
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); // server error
        });
});

// a user can get the course tuple from the DB thru this request, which typically includes
//  the course admin, chatroom, messages, and announcements in this course
app.get("/getCourses/:courseName", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send(); // user not logged in
    }
    const courseName = req.params.courseName;
    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {
                const theCourse = {
                    // admin: for checking whether the current user has permission to post announcements
                    //  also, it would be used for displaying the admin's profile
                    admin: course.users[0],
                    announcements: course.announcements,
                    chatroom: []
                };
                if (course.chatroom.length === 0) {
                    res.send({course: theCourse});
                }
                let count = 0;
                const chatroom = [];
                course.chatroom.forEach((msg) => {
                    RegularUser.findById(msg.user_id).then(
                        (user) => {
                            // if the user does not exist, it is very likely she/he has been deleted
                            //  after sending this message
                            const updatedMsg = {
                                user_id: user ? msg.user_id : 0,
                                date: datetime.format(msg.date, "h:mm:s on MMM D"),
                                message: msg.message,
                                username: user ? user.username : "User has been removed"
                            };
                            chatroom.push(updatedMsg);
                            count++;
                            //log(msg);
                            if (count === course.chatroom.length) {
                                theCourse.chatroom = chatroom;
                                res.send({course: theCourse});
                            }
                        },
                        (error) => {
                            return res.send(400).send(error);
                        }
                    );
                });

            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(); // server error
        });
});

app.get("/getRankings", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send(); // user not logged in
    }
    Course.find()
        .then(courses => {
            courses.sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1;
                } else if (a.likes < b.likes) {
                    return 1;
                } else {
                    return 0;
                }
            });

            RegularUser.find()
                .then(users => {
                    // exclude admin from the list
                    users.splice(0, 1);

                    users.sort((a, b) => {
                        if (a.coursesTeaching > b.coursesTeaching) {
                            return -1;
                        } else if (a.coursesTeaching < b.coursesTeaching) {
                            return 1;
                        } else {
                            return 0;
                        }
                    });

                    return res.send({
                        likesRankings: courses.slice(0, 8),
                        usersRankings: users.splice(0, 8)
                    });
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).send();
                });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send();
        });
});


// get resources of some course given a course name
app.get("/courses/:courseName/getResources", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(400).send(); // user not logged in
    }

    const courseName = req.params.courseName;
    RegularUser.findById(currentUserID)
        .then(user => {
            if (!user) {
                res.status(404).send(); // could not find this user
            }
            Course.findByCourseName(courseName)
                .then(course => {
                    if (!course) {
                        log("invalid course name");
                        return res.status(404).send(); // could not find this resource
                    }
                    if (!course.users.includes(currentUserID)) {
                        return res.status(403).send(); // unauthorised user
                    }

                    const resourcesList = [];
                    // if this courses does not have any resources, simply send an empty array
                    if (course.resources.length === 0) {
                        res.send({
                            // for checking whether the current user has permission to upload
                            admin: course.users[0],
                            resources: resourcesList
                        });
                    }
                    let count = 0;
                    course.resources.forEach((fileObjectID) => {
                        File.findById(fileObjectID).then((fileDBEntry) => {
                            const newResource = {};
                            newResource.file_id = fileObjectID;
                            newResource.name = fileDBEntry.name;
                            newResource.link = `/download/${fileObjectID}`;
                            newResource.type = fileDBEntry.type;
                            newResource.size = fileDBEntry.size;
                            newResource.date = datetime.format(fileDBEntry.date, "M/D/Y h:mm A");
                            newResource.favoured = user.filesFavoured.includes(fileObjectID);
                            resourcesList.push(newResource);
                            count++;
                            if (count === course.resources.length) {
                                return res.send({
                                    // for checking whether the current user has permission to upload
                                    admin: course.users[0],
                                    resources: resourcesList
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                            res.status(500).send(); // server error
                        })
                    });


                })
                .catch(error => {
                    console.log(error);
                    res.status(500).send(); // server error
                });
        }).catch(error => {
        console.log(error);
        res.status(500).send(); // server error
    });
});

// function for a user to join a course given a course name
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
                                if (
                                    user.coursesTeaching.includes(course._id) ||
                                    user.coursesTaking.includes(course._id)
                                ) {
                                    return res.status(400).send();
                                }
                                if (course.users.length === 1) {
                                    user.coursesTeaching.addToSet(course._id);
                                } else {
                                    user.coursesTaking.addToSet(course._id);
                                }

                                user.save().then(
                                    () => {
                                        return res.send({
                                            message: "Successfully enrolled!"
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
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        res.status(400).send();
        return;
    }
    let theCourse = null;
    const courseName = req.params.courseName;

    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {
                // check whether the current user is the admin of the course,
                //  given course.users[0] is always the course admin
                if (course.users[0] != currentUserID) {
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
            console.log(error);
            return res.status(500).send(); // server error
        });
});

app.delete("/courses/:courseName/:announcement", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        res.status(400).send();
        return;
    }
    let theCourse = null;
    const courseName = req.params.courseName;
    console.log(courseName);
    const _id = req.params.announcement;

    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {
                //find the announcements
                const announcement = course.announcements.id(_id);
                if (!announcement) {
                    log("invalid announcement id");
                    res.status(404).send(); // could not find this resource
                } else {
                    // check whether the current user is the admin of the course,
                    //  given course.users[0] is always the course admin
                    if (course.users[0] != currentUserID) {
                        return res.status(403).send();
                    } else {
                        //find the macthed announcement (by id)
                        //  const theAnnouncement = course.announcements.id(_id);
                        course.announcements.pull(announcement);
                        //save the course
                        course.save().then(
                            result => {
                                return res.send({
                                    message: "announcement deleted successfully"
                                });
                            },
                            error => {
                                return res.status(400).send(error);
                            }
                        );

                    }
                }
                //hi i am working here
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); // server error
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
                    //console.log("Found user, add billlboard content");
                    const new_BillBoard_content = new BillBoard({
                        userid: req.session.currentUserID,
                        username: req.body.username,
                        date: req.body.date,
                        message: req.body.message,
                        image: req.body.image
                    });
                    //console.log("Creating new content");
                    console.log(new_BillBoard_content);
                    new_BillBoard_content.save().then(
                        result => {
                            //console.log("Saving new content");
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
        //console.log("Unauthorized access to BillBoard");
        res.send(401).send();
    }
});

app.post("/BillBoard/delete", (req, res) => {
    const comment_id = req.body._id;
    //console.log(comment_id);
    BillBoard.findByIdAndDelete(comment_id)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(400).send();
        });
});
/* Profile API routes*/
// return regular user profile of the current user
app.get("/RegularUser/profile", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        //console.log("Unauthorized access to user profile");
        res.status(401).send();
    }
    RegularUser.findById(currentUserID)
        .then(user => {
            if (!user) {
                //console.log("Regular user does not exist");
                res.status(404).send();
            } else {
                res.send(user);
            }
        })
        .catch(error => {
            res.status(500).send();
        });
});

// return regular user profile of the current user
app.get("/RegularUser/getProfileById/:user_id", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        //console.log("Unauthorized access to user profile");
        return res.status(401).send();
    }
    const user_id = req.params.user_id;
    RegularUser.findById(user_id)
        .then(user => {
            if (!user) {
                //console.log("Regular user does not exist");
                return res.status(404).send();
            }
            //console.log(user);
            const userProfile = {
                username: user.username,
                gender: user.gender,
                GPA: user.GPA,
                levelOfEducation: user.levelOfEducation,
                fieldOfStudy: user.fieldOfStudy,
                coursesTaking: [],
                coursesTeaching: []
            };
            if (
                user.coursesTaking.length === 0 &&
                user.coursesTeaching.length === 0
            ) {
                return res.send(userProfile);
            }
            if (user.coursesTaking.length === 0) {
                let count = 0;
                user.coursesTeaching.forEach(courseTeaching_id => {
                    Course.findById(courseTeaching_id)
                        .then(courseTeaching => {
                            userProfile.coursesTeaching.push(courseTeaching.name);
                            count++;
                            if (count === user.coursesTeaching.length) {
                                return res.send(userProfile);
                            }
                        })
                        .catch(error => {
                            return res.status(500).send();
                        });
                });
            }
            if (user.coursesTeaching.length === 0) {
                let count = 0;
                user.coursesTaking.forEach(courseTaking_id => {
                    Course.findById(courseTaking_id)
                        .then(courseTaking => {
                            userProfile.coursesTaking.push(courseTaking.name);
                            count++;
                            if (count === user.coursesTaking.length) {
                                return res.send(userProfile);
                            }
                        })
                        .catch(error => {
                            return res.status(500).send();
                        });
                });
            }
            let coursesTakingCount = 0;
            user.coursesTaking.forEach(courseTaking_id => {
                Course.findById(courseTaking_id)
                    .then(courseTaking => {
                        userProfile.coursesTaking.push(courseTaking.name);
                        coursesTakingCount++;
                        if (coursesTakingCount === user.coursesTaking.length) {
                            let coursesTeachingCount = 0;
                            user.coursesTeaching.forEach(courseTeaching_id => {
                                Course.findById(courseTeaching_id)
                                    .then(courseTeaching => {
                                        userProfile.coursesTeaching.push(courseTeaching.name);
                                        coursesTeachingCount++;
                                        if (coursesTeachingCount === user.coursesTeaching.length) {
                                            return res.send(userProfile);
                                        }
                                    })
                                    .catch(error => {
                                        return res.status(500).send();
                                    });
                            });
                        }
                    })
                    .catch(error => {
                        return res.status(500).send();
                    });
            });
        })
        .catch(error => {
            return res.status(500).send();
        });
});

// return regular user course taking
app.get("/RegularUser/profile/coursesTaking", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (currentUserID) {
        RegularUser.findById(currentUserID)
            .then(user => {
                if (!user) {
                    console.log("Regular user does not exist");
                    res.status(404).send();
                } else {
                    let count = 0;
                    const list = [];
                    const rawList = user.coursesTaking;
                    rawList.forEach(courseObjectID =>
                        Course.findById(courseObjectID).then(course => {
                            // course.users[0] is always the course admin
                            RegularUser.findById(course.users[0]).then(admin => {
                                const thisCourse = {};
                                thisCourse.id = courseObjectID;
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
app.get("/RegularUser/profile/coursesTeaching", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (currentUserID) {
        RegularUser.findById(currentUserID)
            .then(user => {
                if (!user) {
                    console.log("Regular user does not exist");
                    res.status(404).send();
                } else {
                    let count = 0;
                    const list = [];
                    const rawList = user.coursesTeaching;
                    rawList.forEach(courseObjectID =>
                        Course.findById(courseObjectID).then(course => {
                            // course.users[0] is always the course admin
                            RegularUser.findById(course.users[0]).then(admin => {
                                const thisCourse = {};
                                thisCourse.id = courseObjectID;
                                thisCourse.name = course.name;
                                thisCourse.info = course.description;
                                thisCourse.admin = admin.username;
                                thisCourse.liked = false;
                                list.push(thisCourse);
                                count++;
                                if (count === rawList.length) {
                                    res.send({courses: list});
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
                //console.log("Regular user does not exist");
                res.status(404).send();
            } else {
                user.username = req.body.username;
                user.password = req.body.password;
                user.GPA = req.body.GPA;
                user.gender = req.body.gender;
                user.levelOfEducation = req.body.levelOfEducation;
                user.fieldOfStudy = req.body.fieldOfStudy;
                user.coursesTaking = req.body.coursesTaking;
                user.coursesTeaching = req.body.coursesTeaching;
                //console.log("test1");
                user
                    .save()
                    .then(
                        result => {
                            //console.log("Saving new user profile");
                            res.send(result);
                        },
                        error => {
                            console.log("test2");
                            console.log(error);
                            res.status(400).send();
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
const sizeToString = size => {
    if (size < 1024) {
        return `${size} B`;
    } else if (size < 1024 * 1024) {
        return `${Math.round(size / 1024)} KB`;
    } else {
        return `${Math.round((size / 1024 / 1024) * 100) / 100} MB`;
    }
};

// upload resources onto some course's Resources page
app.post('/courses/:courseName/upload', (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send({
            message: 'Your session has expired. Please log in and try again.'
        });
    }
    if (req.files === null) {
        return res.status(400).send({
            message: 'No file selected.'
        });
    }

    const courseName = req.params.courseName;

    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                return res.status(404).send({
                    message: "This course is not find in the database."
                }); // could not find the course
            } else {
                // course.users[0] is always the course admin
                if (course.users[0] != currentUserID) {
                    return res.status(403).send({
                        message: "You are not the admin of this course"
                    }); // not the admin uploading
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

                        return res.json({
                            fileName: file.name,
                            filePath: `/uploads/${result._id}`
                        });
                    });
                })
                    .catch(error => {
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

    File.findById(file_id)
        .then(fileDBEntry => {
            if (!fileDBEntry) {
                res.status(404).send();
            } else {
                res.download(`${__dirname}/uploads/${file_id}`, fileDBEntry.name);
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).send(); // server error
        });
});

app.delete("/upload/:file_id", (req, res) => {
    // check whether the user has logged in
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }
    const file_id = req.params.file_id;
    if (!ObjectID.isValid(file_id)) {
        return res.status(400).send();
    }

    File.findByIdAndRemove(file_id).then((fileDBEntry) => {
        if (!fileDBEntry) {
            return res.status(404).send();
        }
        const courseID = fileDBEntry.course;
        Course.findById(courseID).then((course) => {
            if (!course) {
                fileDBEntry.save();
                return res.status(404).send();
            }
            // course.users[0] is always the course admin
            if (course.users[0] != currentUserID) {
                fileDBEntry.save();
                return res.status(403).send();
            }
            course.resources.pull(ObjectID(file_id));
            course.save();
            fsPromises.unlink(`${__dirname}/uploads/${file_id}`).then(
                () => {
                    return res.send({message: "success"});
                }
            )
                .catch((error) => {
                    return res.status(500).send(error); // server error
                });
        })
    }).catch(error => {
        console.log(error);
        res.status(500).send(); // server error
    });
});

// post msg to some course chat room given course name
app.post("/courses/:courseName/chatroom", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }

    console.log("start to find the course");
    const courseName = req.params.courseName;
    Course.findByCourseName(courseName)
        .then(course => {
            console.log("start to create the message object");
            const newMsg = {
                user_id: currentUserID,
                date: new Date(),
                message: req.body.message
            };

            course.chatroom.push(newMsg);

            if (course.chatroom.length > 50) {
                course.chatroom.shift();
            }
            console.log("start to save the course tuple");
            course
                .save()
                .then(result => {
                    return res.send(result);
                })
                .catch(error => {
                    return res.status(500).send();
                });
        })
        .catch(error => {
            return res.status(500).send();
        });
});

// like a course
app.patch("/courses/:courseName/like", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }

    const courseName = req.params.courseName;
    Course.findByCourseName(courseName)
        .then(course => {
            if (!course) {
                log("invalid course name");
                res.status(404).send(); // could not find this resource
            } else {
                //give the course a heart
                //log(currentUserID);
                if (!course.users.includes(currentUserID)) {
                    return res.status(403).send();
                }

                RegularUser.findById(currentUserID)
                    .then(user => {
                        if (!user) {
                            return res.status(404).send();
                        } else {
                            let liked = false;
                            if (user.coursesLiked.includes(course._id)) {
                                user.coursesLiked.pull(course._id);
                                course.likes--;
                            } else {
                                liked = true;
                                user.coursesLiked.push(course._id);
                                course.likes++;
                            }
                            course.save().then(
                                result => {
                                    user.save().then(
                                        result => {
                                            return res.send({
                                                liked: liked
                                            });
                                        },
                                        error => {
                                            return res.status(500).send(error);
                                        }
                                    );
                                },
                                error => {
                                    return res.status(500).send(error);
                                }
                            );
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).send(); //server error
                    });
            }
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); //server error
        });
});

app.patch("/resources/:resource_id/favour", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }

    const resource_id = req.params.resource_id;

    File.findById(resource_id)
        .then(fileDBEntry => {
            if (!fileDBEntry) {
                return res.status(404).send();
            }
            RegularUser.findById(currentUserID)
                .then(user => {
                    let nowFavoured = false;
                    if (user.filesFavoured.includes(resource_id)) {
                        user.filesFavoured.pull(resource_id);
                    } else {
                        user.filesFavoured.push(resource_id);
                        nowFavoured = true;
                    }

                    user.save().then(
                        result => {
                            return res.send({
                                favoured: nowFavoured
                            });
                        },
                        error => {
                            return res.status(500).send(error);
                        }
                    );
                })
                .catch(error => {
                    console.log(error);
                    return res.status(500).send(); //server error
                });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); //server error
        });
});

app.get("/resources/favourites", (req, res) => {
    const currentUserID = req.session.currentUserID;
    if (!currentUserID) {
        return res.status(403).send();
    }

    RegularUser.findById(currentUserID)
        .then(user => {
            if (!user) {
                return res.status(403).send();
            }
            const rawList = user.filesFavoured;
            if (rawList.length === 0) {
                return res.send({
                    filesFavoured: []
                });
            }
            const filesFavoured = new Map();
            let count = 0;
            rawList.forEach(file_id => {
                File.findById(file_id)
                    .then(fileDBEntry => {
                        if (!fileDBEntry) {
                            user.filesFavoured.pull(file_id);
                        } else {
                            Course.findById(fileDBEntry.course)
                                .then(course => {
                                    if (!course) {
                                        return res.status(404).send();
                                    }
                                    const courseName = course.name;
                                    if (!filesFavoured.has(courseName)) {
                                        filesFavoured.set(courseName, []);
                                    }
                                    const filesInTheCourse = filesFavoured.get(courseName);
                                    filesInTheCourse.push({
                                        file_id: fileDBEntry._id,
                                        name: fileDBEntry.name,
                                        link: `/download/${fileDBEntry._id}`,
                                        size: fileDBEntry.size,
                                        date: datetime.format(fileDBEntry.date, "M/D/Y h:mm A")
                                    });
                                    filesFavoured.set(courseName, filesInTheCourse);
                                    count++;
                                    if (count === rawList.length) {
                                        user.save();
                                        //console.log(filesFavoured);
                                        const finalList = [];
                                        filesFavoured.forEach((list, key) => {
                                            finalList.push({
                                                courseName: key,
                                                files: list
                                            });
                                        });
                                        return res.send({filesFavoured: finalList});
                                    }
                                })
                                .catch(error => {
                                    console.log(error);
                                    return res.status(500).send(); //server error
                                });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        return res.status(500).send(); //server error
                    });
            });
        })
        .catch(error => {
            console.log(error);
            return res.status(500).send(); //server error
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
