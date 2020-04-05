import React from "react";
import {readCookie} from "./RegularUser";

export const getCourseList = (app) => {
    // the URL for the request
    const url = "/courses";
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //this.courseList = res.json();
                return res.json();
            } else {
                console.log(res.status);
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState({courseList: json.courses});
        })
        .catch(error => {
            console.log(error);
        });
};

export const createCourse = (app) => {
    console.log("submitting");
    const {add_course_name, add_course_info, terms_confirmed} = app.state;

    // ensure the user have understand the rules
    if (!terms_confirmed) {
        return;
    }

    // the URL for the request
    const url = "/courses";

    const newCourse = {
        name: add_course_name,
        description: add_course_info
    };
    console.log(newCourse);
    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newCourse),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Course added successfully. Now you can go to the dashboard to access the course!");
                getCourseList(app);
                app.setState({
                    adding_course: false,
                    add_course_name: "",
                    add_course_info: "",
                    terms_confirmed: false
                });

            } else {
                alert("Course was not added. There may have been a course with a same name.");
                app.setState({
                    terms_confirmed: false
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export const joinCourse = (app) => {
    const {join_course_name, terms_confirmed} = app.state;

    // ensure the user have understand the rules
    if (!terms_confirmed) {
        return;
    }

    // the URL for the request
    const url = `/courses/${join_course_name}`;

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "PATCH",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                alert("Course joined successfully. Now you can go to the dashboard to access the course!");
                getCourseList(app);
                app.setState({
                    join_course_name: "",
                    adding_course: false,
                    add_course_name: "",
                    add_course_info: "",
                    terms_confirmed: false
                });

            } else {
                alert("This course may not exist. Or you have already enrolled into this course.");
                app.setState({
                    terms_confirmed: false
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};

export const getCourseObject = (app) => {
    // the URL for the request
    readCookie(app);
    const courseName = app.state.courseName;
    const url = "/getCourses/" + courseName;

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //this.courseList = res.json();
                return res.json();
            } else {
                alert("Could not get courses");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            const course = json.course;
            app.setState({
                admin: course.admin,
                chatroom: course.chatroom,
                announcements: course.announcements
            });
            setTimeout(() => {
                const chatroomSegment = document.querySelector(".chat_room_messages");
                if (chatroomSegment.clientHeight + chatroomSegment.scrollTop + 200 > chatroomSegment.scrollHeight) {
                    chatroomSegment.scrollTop = chatroomSegment.scrollHeight;
                }
            }, 1500);
        })
        .catch(error => {
            console.log(error);
        });
};

export const postNewMsg = (app) => {

    const {courseName, message_to_send} = app.state;

    // the URL for the request
    const url = "/courses/" + courseName + "/chatroom";

    const newMessage = {message: message_to_send};

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newMessage),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                getCourseObject(app);
                app.setState({
                    message_to_send: ""
                });
                const chatroomSegment = document.querySelector(".chat_room_messages");
                chatroomSegment.scrollTop = chatroomSegment.scrollHeight;
            } else {
                alert("The message was not sent for unknown reason. You may want to logout and log back in.")
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const postNewAnnouncement = (app) => {

    const {courseName, newAnnouncementTitle, newAnnouncementContent} = app.state;

    // the URL for the request
    const url = "/courses/" + courseName + "/announcement";

    const newAnnouncement = {
        title: newAnnouncementTitle,
        content: newAnnouncementContent
    };

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(newAnnouncement),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                getCourseObject(app);
                app.setState({
                    message: {
                        success: true,
                        header: "Posted!",
                        content: "Now everyone in this course will be notified."
                    },
                    newAnnouncementTitle: "",
                    newAnnouncementContent: ""
                });
            } else {
                app.setState({
                    message: {
                        success: false,
                        header: "The announcement was not posted for unknown reasons!",
                        content: "You may want to try again later."
                    }
                })
            }
        })
        .catch(error => {
            console.log(error);
            app.setState({
                message: {
                    success: false,
                    header: "The announcement was not posted!",
                    content: error
                }
            })
        });
};

export const removeAnnouncementHandler = (e, {app, announcement_id}) => {
    e.preventDefault();

    const {courseName} = app.state;
    const url = `/courses/${courseName}/${announcement_id}`;

    const request = new Request(url, {
        method: "delete",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                getCourseObject(app);
            } else {
                alert("Operation Invalid");
                getCourseObject(app);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const toggleLikeStatus = (e, {app, courseName}) => {
    e.preventDefault();

    const url = `/courses/${courseName}/like`;

    const request = new Request(url, {
        method: "PATCH",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.

            if (res.status === 200) {
                return res.json();
            } else {
                console.log(res.status);
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState({
                liked: json.liked
            })
        })
        .catch(error => {
            console.log(error);
        });
};
