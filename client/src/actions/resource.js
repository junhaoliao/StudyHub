import axios from "axios";
import { uid } from "react-uid";

export const getResources = app => {
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

export const fileUploadHandler = async (e, { app }) => {
  e.preventDefault();
  const { file, courseName } = app.state;
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`/courses/${courseName}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: progressEvent => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        app.setState({
          uploadPercentage: percentage
        });

        // Clear percentage
        setTimeout(() => app.setState({ uploadPercentage: 0 }), 10000);
      }
    });

    app.setState({
      fileInputKey: uid(Math.random()),
      file: "",
      message: {
        success: true,
        header: "File uploaded successfully!",
        content: "The file is now available on this course page."
      }
    });
  } catch (err) {
    if (err.response.status === 500) {
      app.setState({
        uploadPercentage: "",
        message: {
          success: false,
          header: "There was a problem with the server",
          content: "Please check and try again at a later time"
        }
      });
    } else {
      app.setState({
        uploadPercentage: "",
        message: {
          success: false,
          header: "Error occurs",
          content: err.response.data.message
        }
      });
    }
  }
};

export const removeFileHandler = (e, { app, file_id }) => {
  e.preventDefault();

  const url = "/upload/" + file_id;

  const request = new Request(url, {
    method: "delete",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(function(res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        getResources(app);
      } else {
        alert("Operation Invalid");
        getResources(app);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const favourFileHandler = (e, { app, file_id }) => {
  e.preventDefault();

  const url = `/resources/${file_id}/favour`;

  const request = new Request(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(function(res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        getResources(app);
      } else {
        alert("Operation Invalid");
        getResources(app);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getFavourites = app => {
  // the URL for the request

  const url = "/resources/favourites";
  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        //this.courseList = res.json();
        return res.json();
      } else {
        alert("Could not get favoured resources");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      app.setState({
        filesFavoured: json.filesFavoured
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const unfavourFileOnFavouritesPage = (e, { app, file_id }) => {
  e.preventDefault();

  const url = `/resources/${file_id}/favour`;

  const request = new Request(url, {
    method: "PATCH",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(function(res) {
      // Handle response we get from the API.
      // Usually check the error codes to see what happened.
      if (res.status === 200) {
        getFavourites(app);
      } else {
        alert("Operation Invalid");
        getFavourites(app);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
