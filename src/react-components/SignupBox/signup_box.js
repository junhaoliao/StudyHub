import React from "react";

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
      <div className="signupbox">
        <div className="header"> Sign Up</div>

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

        <div className="gender_block">
          <label htmlFor="username">Gender</label>
          <select
            name="gender"
            value={this.state.gender}
            onChange={this.input_handler}
          >
            <option></option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="gpa_block">
          <label htmlFor="gpa">GPA</label>
          <input
            className="gpa_input"
            name="gpa"
            type="text"
            placeholder="GPA"
            value={this.state.gpa}
            onChange={this.input_handler}
          ></input>
        </div>

        <div className="education_block">
          <label htmlFor="education">Level of Education</label>
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

        <div className="discipline_block">
          <label htmlFor="discipline">Field of Study</label>
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

        <div className="confirm_password_block">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            className="confirm_password_input"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={this.state.confirm_password}
            onChange={this.input_handler}
          ></input>
        </div>

        <button
          className="login_button"
          type="submit"
          onClick={this.submit_handler}
        >
          Sign Up
        </button>
      </div>
    );
  }
}
