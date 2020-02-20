import React from "react";

export class LoginBox extends React.Component {
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
          ></input>
        </div>

        <div className="password_block">
          <label htmlFor="password">Password</label>
          <input
            className="password_input"
            name="password"
            type="password"
            placeholder="Password"
          ></input>
        </div>

        <button className="login_button" type="button">
          Login
        </button>
      </div>
    );
  }
}
