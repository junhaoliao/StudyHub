import React from "react";
import { Menu } from "semantic-ui-react";
//import "./styles.css";

export class AdminUsercard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      education: "",
      courses: ""
    };
  }

  render() {
    const { username, education, courses } = this.props;
    return (
      <div className="ui card">
        <div className="content">
          <div className="header">{username}</div>
          <div className="meta">{education}</div>
          <div className="description">
            Course: <strong>{courses}</strong>
          </div>
        </div>
        <div className="extra content">
          <div className="ui two buttons">
            <button className="ui  yellow  button">Explore</button>
            <button className="ui  black  button">Remove</button>
          </div>
        </div>
      </div>
    );
  }
}
