import React from "react";
import "./styles.css";
import {Redirect} from "react-router-dom";

export class LoginBox extends React.Component {
  // hard code for existing user log in information
  username_list = ["Junhao", "Ashley", "Kruzer", "Kevin"];
  password_list = ["Admin", "Regular", "Regular", "Regular"];

  state = {
    username: "",
    password: "",
    login: false
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
      this.setState(
        {
          login: true
        },
        () => {
          console.log(this.state.login);
        }
      );
    } else {
      console.log("Incorrect username or password");
      this.setState(
        {
          login: false
        },
        () => {
          console.log(this.state.login);
        }
      );
    }
  };

  render() {
    if (!this.state.login) {
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
    } else {
      return <Redirect to="/dash_board"/>;
    }
  }
}
