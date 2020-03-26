// Functions to help with user actions.

// A function to check if a user is logged in on the session cookie
export const readCookie = app => {
  const url = "/RegularUser/check-session";

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.currentUser) {
        app.setState({ currentUser: json.currentUser });
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
