// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = (app) => {
  const url = "/RegularUser/check-session";

  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("Session expired. Please try logging in again.");
        window.location.href = "/";
      }
    })
    .then((json) => {
      app.setState({
        currentUser: json.currentUser,
        currentUserID: json.currentUserID,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const loginSubmit = (loginBox) => {
  console.log(loginBox.state);
  const request = new Request("/RegularUser/login", {
    method: "post",
    body: JSON.stringify(loginBox.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  // Send the request with fetch()
  console.log("sending request");
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log("return json");
        return res.json();
      } else {
        loginBox.setState({ error: false });
      }
    })
    .then((json) => {
      console.log(json);
      if (json.currentUser === "admin") {
        loginBox.setState({ login_admin: true });
      }
      if (json.currentUser !== undefined) {
        loginBox.setState({ login_regular: true });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signupSubmit = (e, signupBox) => {
  e.preventDefault();
  window.location.reload(false);
  let correct = true;
  if (signupBox.state.username === "") {
    console.log("Username cannot be empty");
    correct = false;
  }
  if (signupBox.state.levelOfEducation === "") {
    console.log("Level of Education cannot be empty");
    correct = false;
  }
  if (signupBox.state.fieldOfStudy === "") {
    console.log("Field of Study cannot be empty");
    correct = false;
  }
  if (
    signupBox.state.password === "" ||
    signupBox.state.confirm_password === ""
  ) {
    console.log("Password cannot be empty");
    correct = false;
  }
  if (signupBox.state.password !== signupBox.state.confirm_password) {
    console.log("Password does NOT match");
    correct = false;
  }
  if (correct && !signupBox.state.used_username) {
    alert("Successfully Signed Up. Please Login In");
    window.location.href = "/";
    console.log("sign up for new user");
    const request = new Request("/RegularUser/signup", {
      method: "post",
      body: JSON.stringify(signupBox.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });
    // Send the request with fetch()
    console.log("sending request");
    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          console.log("return json");
          return res.json();
        }
      })
      .then((json) => {
        console.log(json);
        if (json.currentUser !== undefined) {
          signupBox.setState({ signin_regular: true, password_match: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert("Signup Failed. Please Try Again");
    window.location.href = "/";
  }
};

export const username_verifier = (username, signupBox) => {
  const body = {};
  body.username = username;
  console.log(body);
  const url = "/RegularUser/username";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 404) {
        signupBox.setState({ used_username: false });
      } else {
        signupBox.setState({ used_username: true });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
