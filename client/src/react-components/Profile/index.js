import React from "react";
import NavBar from "../NavBar/navbar";
import { Grid, Button, Segment } from "semantic-ui-react";
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

        <div className="ui attached segment">
          <Grid divided="vertically">
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Username</div>
                <div className="ui huge blue horizontal label">{username}</div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Gender</div>
                <div className="ui huge blue horizontal label">{gender}</div>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">GPA</div>
                <div className="ui huge blue horizontal label">{GPA}</div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div class="ui  huge black horizontal label">
                  Level of Education
                </div>
                <div className="ui huge blue horizontal label">
                  {levelOfEducation}
                </div>
              </Grid.Column>
              <Grid.Column>
                <div class="ui huge black horizontal label">Field of Study</div>
                <div className="ui huge blue horizontal label">
                  {fieldOfStudy}
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Teaching
                </div>

                {courseTeaching.map(course => (
                  <div className="ui huge blue horizontal label">
                    {course.name}
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Taking
                </div>

                {courseTaking.map(course => (
                  <div className="ui huge blue horizontal label">
                    {course.name}
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div
          className="ui huge bottom attached primary button"
          onClick={() => switchView(this)}
        >
          Edit
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
        <div className="ui attached segment">
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Username</div>
                <div className="ui medium blue input focus">
                  <input
                    className="username_input"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => updateProfileForm(this, e.target)}
                  ></input>
                </div>
              </Grid.Column>

              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Old Password
                </div>
                <div className="ui medium blue input focus">
                  <input
                    className="password_input"
                    name="oldPassword"
                    type="password"
                    placeholder="Old Password"
                    value={this.state.oldPassword}
                    onChange={e => updateProfileForm(this, e.target)}
                  ></input>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  New Password
                </div>
                <div className="ui medium blue input focus">
                  <input
                    className="password_input"
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={this.state.newPassword}
                    onChange={e => updateProfileForm(this, e.target)}
                  ></input>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Confirm Password
                </div>
                <div className="ui medium blue input focus">
                  <input
                    className="confirm_password_input"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmnNewPassword}
                    onChange={e => updateProfileForm(this, e.target)}
                  ></input>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Gender</div>

                <select
                  className="ui selection dropdown"
                  name="gender"
                  value={gender}
                  onChange={e => updateProfileForm(this, e.target)}
                >
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">GPA</div>
                <div className="ui medium blue input focus">
                  <input
                    name="GPA"
                    type="text"
                    placeholder="GPA"
                    value={GPA}
                    onChange={e => updateProfileForm(this, e.target)}
                  ></input>
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div class="ui  huge black horizontal label">
                  Level of Education
                </div>
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
              </Grid.Column>
              <Grid.Column>
                <div class="ui huge black horizontal label">Field of Study</div>
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
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Teaching
                </div>

                {courseTeaching.map(course => (
                  <div
                    className="ui huge blue horizontal label"
                    onClick={() => remove_courseTeaching(this, course)}
                  >
                    {course.name}
                    <i className="delete icon"></i>
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Taking
                </div>

                {courseTaking.map(course => (
                  <div
                    className="ui huge blue horizontal label"
                    onClick={() => remove_courseTaking(this, course)}
                  >
                    {course.name} <i className="delete icon"></i>
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="ui two bottom attached buttons">
          <div
            className="ui huge primary button"
            onClick={() => SaveButton(this)}
          >
            Save
          </div>
          <div
            className="ui huge black button"
            onClick={() => CancelButton(this)}
          >
            Cancel
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
