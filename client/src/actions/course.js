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