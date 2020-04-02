export const readCookie = BillBoard => {
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
        BillBoard.setState({
          login: true,
          username: json.currentUser
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const handleChange = (BillBoard, field) => {
  const value = field.value;
  const name = field.name;
  BillBoard.setState({
    [name]: value
  });
};
