import React from "react";

export class LoginBox extends React.Component {
  // hard code for existing user log in information
  username_list = ["Junhao", "Ashley", "Kruzer", "Kevin"];
  password_list = ["Admin", "Regular", "Regular", "Regular"];

  state = {
    username: "",
    password: ""
  };

  input_handler = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submit_handler = event => {
    console.log(this.state);
    event.preventDefault();
    let correct = false;
    if (this.state.username == "") {
      console.log("Username cannot be empty");
    }
    if (this.state.password == "") {
      console.log("Password cannot be empty");
    }
    for (
      let user_index = 0;
      user_index < this.username_list.length;
      user_index++
    ) {
      if (
        this.username_list[user_index] == this.state.username &&
        this.password_list[user_index] == this.state.password
      ) {
        correct = true;
      }
    }

    if (correct) {
      console.log(
        "Welcome " + this.state.username + " " + this.state.password + " User"
      );
    } else {
      console.log("Incorrect username or password");
    }
  };

  render() {
    return (
      /*The overall login box*/
      <div className="loginbox">
        <div className="header">Log In</div>

        <div className="username_block">
          <label htmlFor="username">Username</label>
          <input
            className="username_input"
            name="username"
            type="text"
            placeholder="Username"
            value={this.state.username}
            onChange={this.input_handler}
          ></input>
        </div>

        <div className="password_block">
          <label htmlFor="password">Password</label>
          <input
            className="password_input"
            name="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.input_handler}
          ></input>
        </div>

        <button
          className="login_button"
          type="submit"
          onClick={this.submit_handler}
        >
          Log In
        </button>
      </div>
    );
  }
}
