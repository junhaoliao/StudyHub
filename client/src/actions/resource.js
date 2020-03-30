export const getResources = (app) => {
    // the URL for the request

    const courseName = app.state.courseName;

    const url = "/courses/" + courseName + "/getResources";
    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                //this.courseList = res.json();
                return res.json();
            } else {
                alert("Could not get resources from " + courseName);
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            app.setState({resources: json.resources});
        })
        .catch(error => {
            console.log(error);
        });
};