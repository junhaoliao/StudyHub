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
                alert("Could not get courses");
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
                    terms_confirmed: false,
                    message: {
                        body: "Success: Added a Course.",
                        type: "success"
                    }
                });

            } else {
                alert("Course was not added. There may have been a course with a same name.");
                app.setState({
                    terms_confirmed: false,
                    message: {
                        body: "Error: Could not add Course.",
                        type: "error"
                    }
                });
            }
        })
        .catch(error => {
            console.log(error);
        });

};