// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = app => {
  const url = "/RegularUser/check-session";

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
      if (json && json.currentUser) {
        app.setState({
          currentUser: json.currentUser,
          currentUserID: json.currentUserID
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateLoginForm = (loginBox, field) => {
  const value = field.value;
  const name = field.name;
  loginBox.setState({
    [name]: value
  });
};

export const loginSubmit = loginBox => {
  console.log(loginBox.state);
  const request = new Request("/RegularUser/login", {
    method: "post",
    body: JSON.stringify(loginBox.state),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
  // Send the request with fetch()
  console.log("sending request");
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        console.log("return json");
        return res.json();
      } else {
        loginBox.setState({ error: false });
      }
    })
    .then(json => {
      console.log(json);
      if (json.currentUser !== undefined) {
        loginBox.setState({ login_regular: true });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateSignupForm = (SignupBox, field) => {
  const value = field.value;
  const name = field.name;
  SignupBox.setState({
    [name]: value
  });
};

export const signupSubmit = signupBox => {
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
  if (correct) {
    console.log("sign up for new user");
    const request = new Request("/RegularUser/signup", {
      method: "post",
      body: JSON.stringify(signupBox.state),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    // Send the request with fetch()
    console.log("sending request");
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          console.log("return json");
          return res.json();
        }
      })
      .then(json => {
        console.log(json);
        if (json.currentUser !== undefined) {
          signupBox.setState({ signin_regular: true, password_match: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
