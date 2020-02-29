import React from "react";
import "./styles.css";
import { Redirect } from "react-router-dom";

export class LoginBox extends React.Component {
  // hard code for existing user log in information
  // username_list = ["Junhao", "Ashley", "Kruzer", "Kevin"];
  // password_list = ["Admin", "Regular", "Regular", "Regular"];

  state = {
    username: "",
    password: "",
    login_regular: false,
    login_admin: false,
    finish_typing: false
  };

  input_handler = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
      finish_typing: false
    });
  };

  submit_handler = event => {
    console.log(this.state);
    event.preventDefault();
    let correct_regular = false;
    let correct_admin = false;
    this.setState(
      {
        finish_typing: true
      },
      () => {
        console.log("finish typing: " + this.state.finish_typing);
      }
    );
    if (this.state.username == "") {
      console.log("Username cannot be empty");
    }
    if (this.state.password == "") {
      console.log("Password cannot be empty");
    }

    // for (
    //   let user_index = 0;
    //   user_index < this.username_list.length;
    //   user_index++
    // ) {
    //   if (
    //     this.username_list[user_index] == this.state.username &&
    //     this.password_list[user_index] == this.state.password
    //   ) {
    //     correct_regular = true;
    //   }
    // }
    if (this.state.username === "user" && this.state.password === "user") {
      correct_regular = true;
    } else {
      correct_regular = false;
    }

    if (this.state.username === "admin" && this.state.password === "admin") {
      correct_admin = true;
    } else {
      correct_admin = false;
    }

    if (correct_regular) {
      console.log(
        "Welcome " + this.state.username + " " + this.state.password + " User"
      );
      this.setState(
        {
          login_regular: true
        },
        () => {
          console.log("login_regular: " + this.state.login_regular);
        }
      );
    } else {
      console.log("Incorrect_regular username or password");
      this.setState(
        {
          login_regular: false
        },
        () => {
          console.log("login_regular: " + this.state.login_regular);
        }
      );
    }

    if (correct_admin) {
      console.log("Welcome Admin User");
      this.setState(
        {
          login_admin: true
        },
        () => {
          console.log("login_admin: " + this.state.login_admin);
        }
      );
    } else {
      console.log("Incorrect_regular username or password");
      this.setState(
        {
          login_admin: false
        },
        () => {
          console.log("login_admin: " + this.state.login_admin);
        }
      );
    }
  };

  render() {
    if (this.state.login_regular) {
      return <Redirect to="/dash_board" />;
    }
    if (this.state.login_admin) {
      return <Redirect to="/adash_board" />;
    } else if (
      !this.state.login_regular &&
      !this.state.login_admin &&
      this.state.finish_typing
    ) {
      return (
        /*The overall login box*/

        <div className="ui placeholder segment">
          <div className="field">
            <label className="ui blue basic label">Username</label>
            <div className="ui left icon input">
              <input
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.input_handler}
              ></input>

              <i className="blue user icon"></i>
            </div>
          </div>
          <div className="field">
            <label className="ui blue basic label">Password</label>
            <div className="ui left icon input">
              <input
                className="password_input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.input_handler}
              ></input>
              <i className="blue lock icon"></i>
            </div>
          </div>
          <div className="field">
            <button
              className="ui primary button"
              type="submit"
              onClick={this.submit_handler}
            >
              Log In
            </button>
          </div>
          <div className="ui negative message">
            <div className="header">Invalid Username or Password</div>
            <p>Please Renter Username and Password</p>
          </div>
        </div>
      );
    } else {
      return (
        /*The overall login box*/

        <div className="ui placeholder segment">
          <div className="field">
            <label className="ui blue basic label">Username</label>
            <div className="ui left icon input">
              <input
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.input_handler}
              ></input>

              <i className="blue user icon"></i>
            </div>
          </div>
          <div className="field">
            <label className="ui blue basic label">Password</label>
            <div className="ui left icon input">
              <input
                className="password_input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.input_handler}
              ></input>
              <i className="blue lock icon"></i>
            </div>
          </div>
          <div className="field">
            <button
              className="ui primary button"
              type="submit"
              onClick={this.submit_handler}
            >
              Log In
            </button>
          </div>
        </div>
      );
    }
  }
}
