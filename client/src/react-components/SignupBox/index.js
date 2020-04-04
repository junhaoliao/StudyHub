import React from "react";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { signupSubmit, username_verifier } from "../../actions/RegularUser";

export class SignupBox extends React.Component {
  state = {
    username: "",
    gender: "",
    GPA: "",
    levelOfEducation: "",
    fieldOfStudy: "",
    password: "",
    confirm_password: "",
    signin_regular: false,
    password_match: false,
    used_username: false,
  };

  handleSignUpFormChange = (field) => {
    const value = field.value;
    const name = field.name;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === "username") {
          username_verifier(value, this);
        }
        if (name === "confirm_password" || name === "password") {
          if (this.state.password === this.state.confirm_password) {
            this.setState({ password_match: true });
          } else {
            this.setState({ password_match: false });
          }
        }
      }
    );
  };

  render() {
    console.log(this.state);
    if (this.state.signin_regular) {
      return <Redirect to="/dash_board" />;
    }
    return (
      <div>
        <form className="ui form attached fluid segment">
          <div className="field">
            <label>Username</label>
            <div className="ui blue input focus">
              <input
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => this.handleSignUpFormChange(e.target)}
              />
            </div>
            {this.state.username ? null : (
              <div className="ui pointing red basic label">
                Please enter a username
              </div>
            )}
            {!this.state.used_username ? null : (
              <div className="ui pointing red basic label">
                Username Already Exists
              </div>
            )}
          </div>

          <div className="two fields">
            <div className="field">
              <label>Gender</label>
              <div>
                <select
                  className="ui dropdown"
                  name="gender"
                  value={this.state.gender}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                >
                  <option value="" />
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>GPA</label>
              <div className="ui input focus">
                <input
                  name="GPA"
                  type="text"
                  placeholder="GPA"
                  value={this.state.GPA}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                />
              </div>
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label>Level of Education</label>
              <div>
                <select
                  className="ui dropdown"
                  name="levelOfEducation"
                  value={this.state.levelOfEducation}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                >
                  <option />
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Master">Master</option>
                  <option value="Ph.D.">Ph.D.</option>
                </select>
              </div>
              {this.state.levelOfEducation ? null : (
                <div className="ui pointing red basic label">
                  Please select degree
                </div>
              )}
            </div>

            <div className="field">
              <label>Field of Study</label>
              <div>
                <select
                  className="ui dropdown"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                >
                  <option />
                  <option value="CS">CS</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
              {this.state.fieldOfStudy ? null : (
                <div className="ui pointing red basic label">
                  Please select discipline
                </div>
              )}
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label>Password</label>
              <div className="ui input focus">
                <input
                  className="password_input"
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                />
              </div>
              {this.state.password ? null : (
                <div className="ui pointing red basic label">
                  Please enter a password
                </div>
              )}
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <div className="ui input focus">
                <input
                  className="confirm_password_input"
                  name="confirm_password"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirm_password}
                  onChange={(e) => this.handleSignUpFormChange(e.target)}
                />
              </div>
              {this.state.confirm_password ? null : (
                <div className="ui pointing red basic label">
                  Please confirm password
                </div>
              )}
            </div>
          </div>
          <div className="field">
            <button
              className="ui blue primary button"
              type="submit"
              onClick={(e) => signupSubmit(e, this)}
            >
              Sign Up
            </button>
          </div>
          {this.state.password_match ? (
            <div />
          ) : (
            <div className="ui negative message">
              <div className="header">Password Does Not Match</div>
              <p>Please Renter Password</p>
            </div>
          )}
        </form>
      </div>
    );
  }
}
