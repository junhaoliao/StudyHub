import React from "react";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { signupSubmit, updateSignupForm } from "../../actions/RegularUser";

export class SignupBox extends React.Component {
  state = {
    username: "",
    gender: "",
    GPA: "",
    levelOfEducation: "",
    fieldOfStudy: "",
    password: "",
    confirm_password: "",
    signin_regular: false
  };

  //   input_handler = event => {
  //     event.preventDefault();
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     });
  //   };

  //   submit_handler = event => {
  //     //console.log(this.state);
  //     let correct = true;
  //     if (this.state.username == "") {
  //       console.log("Username cannot be empty");
  //       correct = false;
  //     }
  //     if (this.state.education == "") {
  //       console.log("Level of Education cannot be empty");
  //       correct = false;
  //     }
  //     if (this.state.discipline == "") {
  //       console.log("Field of Study cannot be empty");
  //       correct = false;
  //     }
  //     if (this.state.password == "" || this.state.confirm_password == "") {
  //       console.log("Password cannot be empty");
  //       correct = false;
  //     }
  //     if (this.state.password != this.state.confirm_password) {
  //       console.log("Password does NOT match");
  //       correct = false;
  //     }
  //     if (correct) {
  //       console.log("Welcome to StudentHub! " + this.state.username);
  //       console.log(this.state);
  //     }
  //   };

  render() {
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
                onChange={e => updateSignupForm(this, e.target)}
              ></input>
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label>Gender</label>
              <div>
                <select
                  className="ui dropdown"
                  name="gender"
                  value={this.state.gender}
                  onChange={e => updateSignupForm(this, e.target)}
                >
                  <option value=""></option>
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
                  onChange={e => updateSignupForm(this, e.target)}
                ></input>
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
                  onChange={e => updateSignupForm(this, e.target)}
                >
                  <option></option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Master Year">Master</option>
                  <option value="Ph.D. Year">Ph.D.</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Field of Study</label>
              <div>
                <select
                  className="ui dropdown"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={e => updateSignupForm(this, e.target)}
                >
                  <option></option>
                  <option value="CS">CS</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>
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
                  onChange={e => updateSignupForm(this, e.target)}
                ></input>
              </div>
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
                  onChange={e => updateSignupForm(this, e.target)}
                ></input>
              </div>
            </div>
          </div>
          <div className="field">
            <button
              className="ui blue primary button"
              type="submit"
              onClick={() => signupSubmit(this)}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
