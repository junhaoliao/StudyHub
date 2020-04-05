export const readCookie = (AdminDashboard) => {
  const url1 = "/RegularUser/check-session";
  fetch(url1)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("Session expired. Please try logging in again.");
        window.location.href = "/";
      }
    })
    .then((json) => {
      if (json.currentUser) {
        AdminDashboard.setState({ login: true });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  const url = "/AllRegularUser";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      if (json) {
        json = json.filter((user) => user.username !== "admin");
        AdminDashboard.setState({
          allUsers: json,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserAccess = (user, AdminDashboard) => {
  const User = {};
  User.userid = user._id;
  const url = "/RegularUser/access";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(User),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        AdminDashboard.setState({
          explore: true,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeUser = (user, AdminDashboard) => {
  console.log(user);
  const User = {};
  User.userid = user;
  const url = "/RegularUser/remove";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(User),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        AdminDashboard.setState({ open: false });
        console.log("confirm clicked");
        readCookie(AdminDashboard);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
