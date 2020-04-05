const bcrypt = require("bcryptjs");

export const readCookie = Profile => {
    const url = "/RegularUser/profile";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert("Session expired. Please try logging in again.");
                window.location.href = "/";
            }
        })
        .then(json => {
            if (json && json.username) {
                console.log(json);
                Profile.setState({
                    login: true,
                    username: json.username,
                    currentUserID: json._id,
                    password: json.password,
                    gender: json.gender,
                    GPA: json.GPA,
                    levelOfEducation: json.levelOfEducation,
                    fieldOfStudy: json.fieldOfStudy
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

  console.log("check course taking");
  const url_coursesTaking = "/RegularUser/profile/coursesTaking";
  fetch(url_coursesTaking)
    .then(res => {
      if (res.status === 200) {
        console.log("find course taking");
        return res.json();
      }
    })
    .then(json => {
      if (json && json.courses) {
        console.log(json);
        Profile.setState({
          coursesTaking: json.courses
        });
      }
    })
    .catch(error => {
      console.log(error);
    });

  console.log("check course teaching");
  const url_coursesTeaching = "/RegularUser/profile/coursesTeaching";
  fetch(url_coursesTeaching)
    .then(res => {
      if (res.status === 200) {
        console.log("find course teaching");
        return res.json();
      }
    })
    .then(json => {
      if (json && json.courses) {
        console.log(json);
        Profile.setState({
          coursesTeaching: json.courses
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const switchView = Profile => {
  if (Profile.state.edit) {
    Profile.setState({
      edit: false,
      save: true,
      match: true,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  } else {
    Profile.setState({
      edit: true,
      save: true,
      match: true,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: ""
    });
  }
};

export const remove_coursesTaking = (Profile, course) => {
    console.log(course);
    const {coursesTaking, coursesToBeRemoved} = Profile.state;
    for (let i = 0; i < coursesTaking.length; i++) {
        if (coursesTaking[i] === course) {
            coursesTaking.splice(i, 1);
        }
    }

    coursesToBeRemoved.push(course.name);

    Profile.setState({
        coursesTaking: coursesTaking,
        coursesToBeRemoved: coursesToBeRemoved
    });
};

export const remove_coursesTeaching = (Profile, course) => {
    console.log(course);
    const {coursesTeaching, coursesToBeRemoved} = Profile.state;
    for (let i = 0; i < coursesTeaching.length; i++) {
        if (coursesTeaching[i] === course) {
            const removedCourse = coursesTeaching.splice(i, 1);
        }
    }
    coursesToBeRemoved.push(course.name);

    Profile.setState({
        coursesTeaching: coursesTeaching,
        coursesToBeRemoved: coursesToBeRemoved
    });
};

export const CancelButton = Profile => {
  readCookie(Profile);
  switchView(Profile);
};

export const SaveButton = Profile => {
  bcrypt.compare(
    Profile.state.oldPassword,
    Profile.state.password,
    (err, result) => {
      if (result) {
        Profile.setState({ save: true });
        console.log("Password match");
        const newProfile = {};
        let correct = true;
        newProfile.username = Profile.state.username;
        newProfile.password = Profile.state.oldPassword;
        // check password
        if (
          Profile.state.newPassword === "" &&
          Profile.state.confirmNewPassword !== ""
        ) {
          console.log("Please enter a new password");
          correct = false;
          Profile.setState({ match: false });
        } else if (
          Profile.state.newPassword !== "" &&
          Profile.state.confirmNewPassword === ""
        ) {
          console.log("Please confirm a new password");
          correct = false;
          Profile.setState({ match: false });
        } else if (
          Profile.state.newPassword !== "" &&
          Profile.state.confirmNewPassword !== ""
        ) {
          if (Profile.state.newPassword === Profile.state.confirmNewPassword) {
            console.log("New password match");
            correct = true;
            newProfile.password = Profile.state.newPassword;
            Profile.setState({ match: true });
          }
        } else {
          console.log("No change on the password");
          correct = true;
          //newProfile.password = Profile.state.oldPassword;
          Profile.setState({ match: false });
        }

        if (Profile.state.newPassword !== Profile.state.confirmNewPassword) {
          console.log("New password NOT match");
          correct = false;
          //newProfile.password = Profile.state.newPassword;
          Profile.setState({ match: false });
        }

        //check level of education
        if (Profile.state.levelOfEducation === "") {
          console.log("Please select level of education");
          correct = false;
        }

        //check field of study
        if (Profile.state.fieldOfStudy === "") {
          console.log("Please select field of study");
          correct = false;
        }

                if (correct) {
                    newProfile.GPA = Profile.state.GPA;
                    newProfile.gender = Profile.state.gender;
                    newProfile.levelOfEducation = Profile.state.levelOfEducation;
                    newProfile.fieldOfStudy = Profile.state.fieldOfStudy;
                    newProfile.coursesTaking = [];
                    newProfile.coursesTeaching = [];
                    const {coursesToBeRemoved, currentUserID} = Profile.state;
                    for (let i = 0; i < coursesToBeRemoved.length; i++) {
                        const removeCourseURL = `/RegularUser/${currentUserID}/removeCourse/${coursesToBeRemoved[i]}`;
                        const removeCourseRequest = new Request(removeCourseURL, {
                            method: "delete",
                            headers: {
                                Accept: "application/json, text/plain, */*",
                                "Content-Type": "application/json"
                            }
                        });
                        fetch(removeCourseRequest)
                            .then(res => {
                                if (res.status === 200) {
                                    console.log("Successfully removed one course");
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            });
                    }

                    for (let i = 0; i < Profile.state.coursesTaking.length; i++) {
                        newProfile.coursesTaking.push(Profile.state.coursesTaking[i].id);
                    }
                    for (let i = 0; i < Profile.state.coursesTeaching.length; i++) {
                        newProfile.coursesTeaching.push(
                            Profile.state.coursesTeaching[i].id
                        );
                    }
                    console.log(newProfile);
                    const url = "/RegularUser/Profile";
                    const request = new Request(url, {
                        method: "post",
                        body: JSON.stringify(newProfile),
                        headers: {
                            Accept: "application/json, text/plain, */*",
                            "Content-Type": "application/json"
                        }
                    });
                    console.log(JSON.stringify(newProfile));
                    fetch(request)
                        .then(res => {
                            if (res.status === 200) {
                                console.log("Successfully updated user information");
                                readCookie(Profile);
                                switchView(Profile);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            } else {
                console.log("Password NOT match");
                Profile.setState({save: false});
            }
        }
    );
};

export const SaveButton_admin = Profile => {
  Profile.setState({ save: true });
  const newProfile = {};
  let correct = true;
  newProfile.username = Profile.state.username;
  newProfile.password = Profile.state.oldPassword;
  // check password
  if (
    Profile.state.newPassword === "" &&
    Profile.state.confirmNewPassword !== ""
  ) {
    console.log("Please enter a new password");
    correct = false;
    Profile.setState({ match: false });
  } else if (
    Profile.state.newPassword !== "" &&
    Profile.state.confirmNewPassword === ""
  ) {
    console.log("Please confirm a new password");
    correct = false;
    Profile.setState({ match: false });
  } else if (
    Profile.state.newPassword !== "" &&
    Profile.state.confirmNewPassword !== ""
  ) {
    if (Profile.state.newPassword === Profile.state.confirmNewPassword) {
      console.log("New password match");
      correct = true;
      newProfile.password = Profile.state.newPassword;
      Profile.setState({ match: true });
    }
  } else {
    console.log("No change on the password");
    correct = true;
    //newProfile.password = Profile.state.oldPassword;
    Profile.setState({ match: false });
  }

  if (Profile.state.newPassword !== Profile.state.confirmNewPassword) {
    console.log("New password NOT match");
    correct = false;
    //newProfile.password = Profile.state.newPassword;
    Profile.setState({ match: false });
  }

  //check level of education
  if (Profile.state.levelOfEducation === "") {
    console.log("Please select level of education");
    correct = false;
  }

  //check field of study
  if (Profile.state.fieldOfStudy === "") {
    console.log("Please select field of study");
    correct = false;
  }

  if (correct) {
    newProfile.GPA = Profile.state.GPA;
    newProfile.gender = Profile.state.gender;
    newProfile.levelOfEducation = Profile.state.levelOfEducation;
    newProfile.fieldOfStudy = Profile.state.fieldOfStudy;
    newProfile.coursesTaking = [];
    newProfile.coursesTeaching = [];
    for (let i = 0; i < Profile.state.coursesTaking.length; i++) {
      newProfile.coursesTaking.push(Profile.state.coursesTaking[i].id);
    }
    for (let i = 0; i < Profile.state.coursesTeaching.length; i++) {
      newProfile.coursesTeaching.push(Profile.state.coursesTeaching[i].id);
    }
    console.log(newProfile);
    const url = "/RegularUser/Profile";
    const request = new Request(url, {
      method: "post",
      body: JSON.stringify(newProfile),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    console.log(JSON.stringify(newProfile));
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          console.log("Successfully updated user information");
          readCookie(Profile);
          switchView(Profile);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export const getUserProfileById = (app, user_id) => {
  const url = `/RegularUser/getProfileById/${user_id}`;

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return console.log("cannot get user profile info");
      }
    })
    .then(json => {
      app.setState({
        username: json.username,
        gender: json.gender,
        GPA: json.GPA,
        levelOfEducation: json.levelOfEducation,
        fieldOfStudy: json.fieldOfStudy,
        coursesTaking: json.coursesTaking,
        coursesTeaching: json.coursesTeaching
      });
    })
    .catch(error => {
      console.log(error);
    });
};
