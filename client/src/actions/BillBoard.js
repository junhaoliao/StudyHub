const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const readCookie = (BillBoard) => {
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
      if (json && json.currentUser) {
        BillBoard.setState({
          login: true,
          username: json.currentUser,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const readCookie_admin = (BillBoard) => {
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
      if (json && json.currentUser) {
        if (json.currentUser) {
          BillBoard.setState({
            login: true,
            username: json.currentUser,
          });
        } else {
          alert("Unauthorized to Admin Page.");
          window.location.href = "/";
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleChange = (BillBoard, field) => {
  const value = field.value;
  const name = field.name;
  BillBoard.setState({
    [name]: value,
  });
};

export const handleSubmit = (BillBoard) => {
  const now = new Date();

  BillBoard.state.date =
    now.getHours() +
    ":" +
    now.getMinutes() +
    ":" +
    now.getSeconds() +
    " on " +
    months[now.getMonth()] +
    "-" +
    now.getDate();

  const newContent = {};
  newContent.username = BillBoard.state.username;
  newContent.date = BillBoard.state.date;
  newContent.message = BillBoard.state.message;
  newContent.image = BillBoard.state.image;
  //newContent.userid = BillBoard.state.userid;
  console.log("state ready to send a request:");
  console.log(newContent);

  console.log(JSON.stringify(newContent));
  const url = "/BillBoard/new";
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(newContent),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log("Successfully record to the database");
      }
    })
    .catch((error) => {
      console.log(error);
    });

  console.log("Loading new Billboard content");
  //load_content();

  // newMessage.message = BillBoard.state.message_to_send;
  // billboard_content.push(newMessage);
  load_content(BillBoard);
  BillBoard.setState({ message: "" });
  window.location.reload(true);
};

export const load_content = (BillBoard) => {
  const url = "/BillBoard/content";
  fetch(url)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then((json) => {
      BillBoard.setState({
        billboard_content: json,
      });
      //console.log(billboard_content);
    });
};

export const comment_remove = (Comment) => {
  const url = "/BillBoard/delete";
  const id = {};
  id._id = Comment._id;
  console.log(Comment._id);
  console.log(JSON.stringify(id));
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify(id),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  });
  fetch(request)
    .then((res) => {
      if (res.status === 200) {
        console.log("Successfully delete comment");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  window.location.reload(true);
};
