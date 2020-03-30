const bcrypt = require("bcryptjs");

export const readCookie = Profile => {
    const url = "/RegularUser/profile";
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.username) {
                console.log(json);
                Profile.setState({
                    login: true,
                    username: json.username,
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
    const url_courseTaking = "/RegularUser/profile/courseTaking";
    fetch(url_courseTaking)
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
                    courseTaking: json.courses
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

    console.log("check course teaching");
    const url_courseTeaching = "/RegularUser/profile/courseTeaching";
    fetch(url_courseTeaching)
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
                    courseTeaching: json.courses
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateProfileForm = (Profile, field) => {
    const value = field.value;
    const name = field.name;
    Profile.setState({
        [name]: value
    });
};

export const switchView = Profile => {
    if (Profile.state.edit) {
        Profile.setState({
            edit: false
        });
    } else {
        Profile.setState({
            edit: true
        });
    }
};

export const remove_courseTaking = (Profile, course) => {
    console.log(course);
    const courseList = Profile.state.courseTaking;
    for (let i = 0; i < courseList.length; i++) {
        if (courseList[i] === course) {
            courseList.splice(i, 1);
        }
    }
    console.log("removed course");
    console.log(courseList);
    Profile.setState({
        courseTaking: courseList
    });
};

export const remove_courseTeaching = (Profile, course) => {
    console.log(course);
    const courseList = Profile.state.courseTeaching;
    for (let i = 0; i < courseList.length; i++) {
        if (courseList[i] === course) {
            courseList.splice(i, 1);
        }
    }
    console.log("removed course");
    console.log(courseList);
    Profile.setState({
        courseTeaching: courseList
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
                console.log("Password match");
                const newProfile = {};
                let correct = true;
                newProfile.username = Profile.state.username;
                // check password
                if (
                    Profile.state.newPassword === "" &&
                    Profile.state.confirmNewPassword !== ""
                ) {
                    console.log("Please enter a new password");
                    correct = false;
                } else if (
                    Profile.state.newPassword !== "" &&
                    Profile.state.confirmNewPassword === ""
                ) {
                    console.log("Please confirm a new password");
                    correct = false;
                } else if (
                    Profile.state.newPassword !== "" &&
                    Profile.state.confirmNewPassword !== ""
                ) {
                    if (Profile.state.newPassword === Profile.state.confirmNewPassword) {
                        console.log("New password match");
                        correct = true;
                        newProfile.password = Profile.state.newPassword;
                    }
                } else {
                    console.log("No change on the password");
                    correct = true;
                    newProfile.password = Profile.state.oldPassword;
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
                    newProfile.courseTaking = [];
                    newProfile.courseTeaching = [];
                    for (let i = 0; i < Profile.state.courseTaking.length; i++) {
                        newProfile.courseTaking.push(Profile.state.courseTaking[i].id);
                    }
                    for (let i = 0; i < Profile.state.courseTeaching.length; i++) {
                        newProfile.courseTeaching.push(Profile.state.courseTeaching[i].id);
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
                                switchView(Profile);
                            }
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            } else {
                console.log("Password NOT match");
            }
        }
    );
};
