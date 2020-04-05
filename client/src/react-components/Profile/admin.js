import React from "react";
import {Grid} from "semantic-ui-react";
import {
  CancelButton,
  readCookie,
  remove_coursesTaking,
  remove_coursesTeaching,
  SaveButton_admin,
  switchView
} from "../../actions/Profile";

export class ProfileAdmin extends React.Component {
  constructor(props) {
    super(props);
    readCookie(this);
    this.state = {
      login: false,
      edit: false,
      match: true,
      username: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      gender: "",
      GPA: "",
      levelOfEducation: "",
      fieldOfStudy: "",
      coursesTaking: [],
      coursesTeaching: [],
      coursesToBeRemoved: [],
      currentUserID: ""
    };
  }

  handleProfileFormChange = field => {
    const value = field.value;
    const name = field.name;
    this.setState({
      [name]: value
    });
  };

  profilePage() {
    const {
      username,
      gender,
      GPA,
      levelOfEducation,
      fieldOfStudy,
      coursesTaking,
      coursesTeaching
    } = this.state;

    console.log(this.state);
    return (
      <div>
        <div className="ui attached message">
          <h2 className="ui yellow inverted center aligned icon header">
            <i className="user circle icon" />
            Profile
          </h2>
        </div>

        <div className="ui attached segment">
          <Grid divided="vertically">
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Username</div>
                <div className="ui huge yellow horizontal label">
                  {username}
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Gender</div>
                <div className="ui huge yellow horizontal label">{gender}</div>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">GPA</div>
                <div className="ui huge yellow horizontal label">{GPA}</div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui  huge black horizontal label">
                  Level of Education
                </div>
                <div className="ui huge yellow horizontal label">
                  {levelOfEducation}
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Field of Study
                </div>
                <div className="ui huge yellow horizontal label">
                  {fieldOfStudy}
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Teaching
                </div>

                {coursesTeaching.map(course => (
                  <div className="ui huge yellow horizontal label">
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

                {coursesTaking.map(course => (
                  <div className="ui huge yellow horizontal label">
                    {course.name}
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="ui two bottom attached buttons">
          <div
            className="ui huge bottom attached yellow button"
            onClick={() => switchView(this)}
          >
            Edit
          </div>
          <div
            className="ui huge bottom attached black button"
            onClick={this.props.back}
          >
            Back
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
      coursesTaking,
      coursesTeaching
    } = this.state;

    console.log(this.state);
    return (
      <div>
        <div className="ui attached message">
          <h2 className="ui yellow inverted center aligned icon header">
            <i className="user circle icon" />
            Profile
          </h2>
        </div>
        <div className="ui attached segment">
          <Grid divided="vertically">
            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">Username</div>
                <div className="ui medium yellow input focus">
                  <input
                    className="username_input"
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => this.handleProfileFormChange(e.target)}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  New Password
                </div>
                <div className="ui medium yellow input focus">
                  <input
                    className="password_input"
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    value={this.state.newPassword}
                    onChange={e => this.handleProfileFormChange(e.target)}
                  />
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Confirm Password
                </div>
                <div className="ui medium yellow input focus">
                  <input
                    className="confirm_password_input"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.confirmNewPassword}
                    onChange={e => this.handleProfileFormChange(e.target)}
                  />
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
                  onChange={e => this.handleProfileFormChange(e.target)}
                >
                  <option value="" />
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">GPA</div>
                <div className="ui medium yellow input focus">
                  <input
                    name="GPA"
                    type="text"
                    placeholder="GPA"
                    value={GPA}
                    onChange={e => this.handleProfileFormChange(e.target)}
                  />
                </div>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="ui  huge black horizontal label">
                  Level of Education
                </div>
                <select
                  className="ui dropdown"
                  name="levelOfEducation"
                  value={levelOfEducation}
                  onChange={e => this.handleProfileFormChange(e.target)}
                >
                  <option />
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Master">Master</option>
                  <option value="Ph.D.">Ph.D.</option>
                </select>
                {this.state.levelOfEducation ? null : (
                  <div className="ui left pointing red basic label">
                    Please select degree
                  </div>
                )}
              </Grid.Column>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Field of Study
                </div>
                <select
                  className="ui dropdown"
                  name="fieldOfStudy"
                  value={fieldOfStudy}
                  onChange={e => this.handleProfileFormChange(e.target)}
                >
                  <option />
                  <option value="CS">CS</option>
                  <option value="ECE">ECE</option>
                </select>
                {this.state.fieldOfStudy ? null : (
                  <div className="ui left pointing red basic label">
                    Please select discipline
                  </div>
                )}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Teaching
                </div>

                {coursesTeaching.map(course => (
                  <div
                    className="ui huge yellow horizontal label"
                    onClick={() => remove_coursesTeaching(this, course)}
                  >
                    {course.name}
                    <i className="delete icon" />
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={1}>
              <Grid.Column>
                <div className="ui huge black horizontal label">
                  Courses Taking
                </div>

                {coursesTaking.map(course => (
                  <div
                    className="ui huge yellow horizontal label"
                    onClick={() => remove_coursesTaking(this, course)}
                  >
                    {course.name} <i className="delete icon" />
                  </div>
                ))}
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className="ui two bottom attached buttons">
          <div
            className="ui huge yellow button"
            onClick={() => SaveButton_admin(this)}
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

        {this.state.match ? null : (
          <div className="ui negative message">
            <div className="header">The new password does not match</div>
            <p>Please Renter the new password to save changes</p>
          </div>
        )}
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
