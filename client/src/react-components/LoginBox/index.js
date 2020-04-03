import React from "react";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { Form, Segment } from "semantic-ui-react";
import { loginSubmit, username_verifier } from "../../actions/RegularUser";

export class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login_regular: false,
      login_admin: false,
      error: true
    };
  }

  handleLoginFormChange = field => {
    const value = field.value;
    const name = field.name;
    this.setState({
      [name]: value
    });
  };

  submit_handler = event => {
    console.log(this.state);
    event.preventDefault();
    if (this.state.username === "") {
      console.log("Username cannot be empty");
      document.querySelector(".username_input").focus();
      return;
    }
    if (this.state.password === "") {
      console.log("Password cannot be empty");
      document.querySelector(".password_input").focus();
      return;
    }

    // actual server call
    loginSubmit(this);
  };

  render() {
    if (this.state.login_admin) {
      return <Redirect to="/adash_board" />;
    } else if (this.state.login_regular) {
      return <Redirect to="/dash_board" />;
    }
    return (
      /*The overall login box*/
      <Segment>
        <Form>
          <div className="field">
            <label>Username</label>
            <div className="ui left icon input">
              <input
                autoFocus
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.handleLoginFormChange(e.target)}
              />

              <i className="blue user icon" />
            </div>
          </div>
          <div className="field">
            <label>Password</label>
            <div className="ui left icon input">
              <input
                className="password_input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.handleLoginFormChange(e.target)}
              />
              <i className="blue lock icon" />
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
          {!this.state.error ? (
            <div className="ui negative message">
              <div className="header">Invalid Username or Password</div>
              <p>Please Renter Username and Password</p>
            </div>
          ) : (
            <div />
          )}
        </Form>
      </Segment>
    );
  }
}
