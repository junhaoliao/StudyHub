import React from "react";
import { Menu } from "semantic-ui-react";
//import "./styles.css";

export class AdminNavBar extends React.Component {
  render() {
    return (
      <Menu inverted stackable>
        <Menu.Item className={"navbar_header"} color={"yellow"}>
          Admin
        </Menu.Item>
        <Menu.Item name="User" href={"/adash_board"} color={"blue"} />
        <Menu.Item name="BillBoard" color={"yellow"} />
      </Menu>
    );
  }
}
