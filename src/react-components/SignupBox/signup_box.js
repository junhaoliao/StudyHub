import React from "react";

export class SignupBox extends React.Component {
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
          ></input>
        </div>

        <div className="gender_block">
          <label htmlFor="username">Gender</label>
          <select>
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
          ></input>
        </div>

        <div className="education_block">
          <label htmlFor="education">Level of Education</label>
          <select>
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
          <select>
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
          ></input>
        </div>

        <div className="confirm_password_block">
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            className="confirm_password_input"
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
          ></input>
        </div>
      </div>
    );
  }
}
