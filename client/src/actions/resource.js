import axios from "axios";

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
            app.setState({
                admin: json.admin,
                resources: json.resources
            });
        })
        .catch(error => {
            console.log(error);
        });
};

export const fileUploadHandler = async (e, {app}) => {
    e.preventDefault();
    const {file, courseName} = app.state;
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post(`/courses/${courseName}/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: progressEvent => {
                const percentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                app.setState({
                    uploadPercentage: percentage
                });

                // Clear percentage
                setTimeout(() => app.setState({uploadPercentage: 0}), 10000);
            }
        });

        const {resFileName, resFilePath} = res.data;

        app.setState({filename: resFileName, filePath: resFilePath, message: "File Uploaded"});
    } catch (err) {
        if (err.response.status === 500) {
            app.setState({
                message: 'There was a problem with the server'
            });
        } else {
            app.setState({
                message: err.response.data.msg
            });
        }
    }
};