import React from "react";
import "./styles.css";
import { Dropdown } from "semantic-ui-react";
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    };
  }
  render() {
    return this.state.visible ? (
      <button
        className="circular ui blue massive icon button"
        onClick={() => this.setState({ visible: false })}
      >
        <i className="user  icon"></i>
      </button>
    ) : (
      <div>
        <button
          className="circular ui blue massive icon button"
          onClick={() => this.setState({ visible: true })}
        >
          <i className="user  icon"></i>
        </button>
        <div className="ui inverted vertical menu">
          <div className="item">Username: Kevin</div>
          <div className="item">Geneder: Male</div>
          <div className="item">GPA: 4.0</div>
          <div className="item">Level of Education: 3rd Year</div>
          <div className="item">Field of Study: ECE</div>
          <Dropdown item text="Courses Taking">
            <Dropdown.Menu>
              <Dropdown.Item href="*">CSC309B</Dropdown.Item>
              <Dropdown.Item href="*">ECE361</Dropdown.Item>
              <Dropdown.Item href="*">CSC343</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown item text="Courses Teaching">
            <Dropdown.Menu>
              <Dropdown.Item href="CSC309A">CSC309A</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    );
  }
}
