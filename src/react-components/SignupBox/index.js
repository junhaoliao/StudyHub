import React from "react";
import "./styles.css";
export class SignupBox extends React.Component {
  state = {
    username: "",
    gender: "",
    gpa: "",
    education: "",
    discipline: "",
    password: "",
    confirm_password: ""
  };

  input_handler = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submit_handler = event => {
    let correct = true;
    if (this.state.username == "") {
      console.log("Username cannot be empty");
      correct = false;
    }
    if (this.state.education == "") {
      console.log("Level of Education cannot be empty");
      correct = false;
    }
    if (this.state.discipline == "") {
      console.log("Field of Study cannot be empty");
      correct = false;
    }
    if (this.state.password == "" || this.state.confirm_password == "") {
      console.log("Password cannot be empty");
      correct = false;
    }
    if (this.state.password != this.state.confirm_password) {
      console.log("Password does NOT match");
      correct = false;
    }
    if (correct) {
      console.log("Welcome to StudentHub! " + this.state.username);
      console.log(this.state);
    }
  };
  render() {
    return (
      <div>
        <div class="ui attached message">
          <h2 class="ui blue center aligned icon header">
            <i class="circular users icon"></i>
            Welcome to StudentHub
          </h2>
        </div>
        <form className="ui form attached fluid segment">
          <div className="field">
            <label className="ui blue basic label">Username</label>
            <div className="ui blue input focus">
              <input
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={this.input_handler}
              ></input>
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label className="ui blue basic label">Gender</label>
              <div>
                <select className="ui dropdown">
                  <option value=""></option>
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="ui blue basic label">GPA</label>
              <div className="ui input focus">
                <input
                  className="gpa_input"
                  name="gpa"
                  type="text"
                  placeholder="GPA"
                  value={this.state.gpa}
                  onChange={this.input_handler}
                ></input>
              </div>
            </div>
          </div>

          <div className="two fields">
            <div className="field">
              <label className="ui blue basic label">Level of Education</label>
              <div>
                <select
                  name="education"
                  value={this.state.education}
                  onChange={this.input_handler}
                >
                  <option></option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                  <option>Master</option>
                  <option>Ph.D.</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label className="ui blue basic label">Field of Study</label>
              <div>
                <select
                  name="discipline"
                  value={this.state.discipline}
                  onChange={this.input_handler}
                >
                  <option></option>
                  <option>CS</option>
                  <option>ECE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label className="ui blue basic label">Password</label>
            <div className="ui input focus">
              <input
                className="password_input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.input_handler}
              ></input>
            </div>
          </div>

          <div className="field">
            <label className="ui blue basic label">Confirm Password</label>
            <div className="ui input focus">
              <input
                className="confirm_password_input"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={this.state.confirm_password}
                onChange={this.input_handler}
              ></input>
            </div>
          </div>

          <div className="field">
            <button
              className="ui blue primary button"
              type="submit"
              onClick={this.submit_handler}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="ui bottom attached warning message">
          <i className="icon help"></i>
          Already signed up? <a href="#">Login here</a> instead.
        </div>
      </div>
    );
  }
}
