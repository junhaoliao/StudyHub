import React from "react";
import NavBar from "../NavBar/navbar";
import { readCookie } from "../../actions/Profile";
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
                <a classname="label">{course.name}</a>
              </div>
            ))}
          </div>
          <div className="item">
            <div class="ui blue horizontal label">Courses Taking</div>
            {courseTaking.map(course => (
              <div className="ui blue label">
                <a classname="label">{course.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  profile() {
    if (this.state.login) {
      return this.profilePage();
    } else {
      return <div>Unauthorized Profile Page</div>;
    }
  }
  render() {
    return <div>{this.profile()}</div>;
  }
}
