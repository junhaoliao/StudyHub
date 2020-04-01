import React from "react";
import {Menu} from "semantic-ui-react";
import {RedirectButton} from "../RedirectButton/index";

//import "./styles.css";

export class AdminNavBar extends React.Component {
    render() {
        return (
            <Menu inverted stackable>
                <Menu.Item className={"navbar_header"} color={"yellow"}>
                    Admin
                </Menu.Item>
                <Menu.Item name="User" href={"/adash_board"} color={"blue"}/>
                <Menu.Item name="BillBoard" href="/abill_board" color={"yellow"}/>
                <Menu.Item position="right">
                    <RedirectButton
                        className="ui inverted yellow basic button"
                        page="/"
                        button_name="Log Out"
                    />
                </Menu.Item>
            </Menu>
        );
    }
}
