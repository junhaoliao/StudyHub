import React from "react";
import NavBar from "../NavBar/navbar";
import {
  readCookie,
  switchView,
  updateProfileForm,
  CancelButton,
  SaveButton,
  remove_courseTaking,
  remove_courseTeaching
} from "../../actions/Profile";
import { Visibility } from "semantic-ui-react";
//import "./styles.css";

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
    this.state = {
      login: false,
      edit: false,
      username: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      gender: "",
      GPA: "",
      levelOfEducation: "",
      fieldOfStudy: "",
      courseTaking: [],
      courseTeaching: []
    };
  }

  profilePage() {
    const {
      username,
      gender,
      GPA,
      levelOfEducation,
      fieldOfStudy,
      courseTaking,
      courseTeaching
    } = this.state;

    console.log(this.state);
    return (
      <div>
        <NavBar></NavBar>
        <div className="ui attached message">
          <h2 className="ui blue inverted center aligned icon header">
            <i className="user circle icon"></i>
            Profile
          </h2>
        </div>
        <div className="ui divided selection list">
          <div className="item">
            <div className="ui blue horizontal label">Username</div>
            {username}
          </div>
          <div className="item">
            <div className="ui black horizontal label">GPA</div>
            {GPA}
          </div>
          <div className="item">
            <div className="ui blue horizontal label">Gender</div>
            {gender}
          </div>
          <div className="item">
            <div class="ui black horizontal label">Level of Education</div>
            {levelOfEducation}
          </div>
          <div className="item">
            <div class="ui blue horizontal label">Field of Study</div>
            {fieldOfStudy}
          </div>
          <div className="item">
            <div class="ui black horizontal label">Courses Teaching</div>
            {courseTeaching.map(course => (
              <div className="ui black label">
                <a classname="ui black label">{course.name}</a>
              </div>
            ))}
          </div>
          <div className="item">
            <div class="ui blue horizontal label">Courses Taking</div>
            {courseTaking.map(course => (
              <div className="ui blue label">
                <a classname="ui blue label">{course.name}</a>
              </div>
            ))}
          </div>
          <div className="item">
            <button class="ui primary button" onClick={() => switchView(this)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    );
  }

  ProfilePageEdit() {
    const {
      username,
      gender,
      GPA,
      levelOfEducation,
      fieldOfStudy,
      courseTaking,
      courseTeaching
    } = this.state;

    console.log(this.state);
    return (
      <div>
        <NavBar></NavBar>
        <div className="ui attached message">
          <h2 className="ui blue inverted center aligned icon header">
            <i className="user circle icon"></i>
            Profile
          </h2>
        </div>

        <div className="ui divided selection list">
          <div className="item">
            <div className="ui blue horizontal label">Username</div>
            <div className="ui blue input focus">
              <input
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => updateProfileForm(this, e.target)}
              ></input>
            </div>
          </div>

          <div className="field">
            <label>Old Password</label>
            <div className="ui input focus">
              <input
                className="password_input"
                name="oldPassword"
                type="password"
                placeholder="Password"
                value={this.state.oldPassword}
                onChange={e => updateProfileForm(this, e.target)}
              ></input>
            </div>
          </div>
          <div className="two fields">
            <div className="field">
              <label>New Password</label>
              <div className="ui input focus">
                <input
                  className="password_input"
                  name="newPassword"
                  type="password"
                  placeholder="Password"
                  value={this.state.newPassword}
                  onChange={e => updateProfileForm(this, e.target)}
                ></input>
              </div>
            </div>

            <div className="field">
              <label>Confirm New Password</label>
              <div className="ui input focus">
                <input
                  className="confirm_password_input"
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirmnNewPassword}
                  onChange={e => updateProfileForm(this, e.target)}
                ></input>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="field">
              <div className="ui black horizontal label">GPA</div>
              <div className="ui input focus">
                <input
                  name="GPA"
                  type="text"
                  placeholder="GPA"
                  value={GPA}
                  onChange={e => updateProfileForm(this, e.target)}
                ></input>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="field">
              <div className="ui blue horizontal label">Gender</div>
              <div>
                <select
                  className="ui dropdown"
                  name="gender"
                  value={gender}
                  onChange={e => updateProfileForm(this, e.target)}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <div className="item">
            <div class="ui black horizontal label">Level of Education</div>
            <div>
              <select
                className="ui dropdown"
                name="levelOfEducation"
                value={levelOfEducation}
                onChange={e => updateProfileForm(this, e.target)}
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
          <div className="item">
            <div class="ui blue horizontal label">Field of Study</div>
            <div>
              <select
                className="ui dropdown"
                name="fieldOfStudy"
                value={fieldOfStudy}
                onChange={e => updateProfileForm(this, e.target)}
              >
                <option></option>
                <option value="CS">CS</option>
                <option value="ECE">ECE</option>
              </select>
            </div>
          </div>
          <div className="item">
            <div class="ui black horizontal label">Courses Teaching</div>
            {courseTeaching.map(course => (
              <div className="ui black label">
                <a
                  classname="ui black label"
                  onClick={() => remove_courseTeaching(this, course)}
                >
                  {course.name}
                  <i className="delete icon"></i>
                </a>
              </div>
            ))}
          </div>
          <div className="item">
            <div class="ui blue horizontal label">Courses Taking</div>
            {courseTaking.map(course => (
              <div className="ui blue label">
                <a
                  classname="ui blue label"
                  onClick={() => remove_courseTaking(this, course)}
                >
                  {course.name}
                  <i className="delete icon"></i>
                </a>
              </div>
            ))}
          </div>
          <div className="item">
            <button class="ui primary button" onClick={() => SaveButton(this)}>
              Save
            </button>
            <button class="ui  button" onClick={() => CancelButton(this)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  profile() {
    if (this.state.login) {
      if (!this.state.edit) {
        return this.profilePage();
      } else {
        return this.ProfilePageEdit();
      }
    } else {
      return <div>Unauthorized Profile Page</div>;
    }
  }
  render() {
    return <div>{this.profile()}</div>;
  }
}
