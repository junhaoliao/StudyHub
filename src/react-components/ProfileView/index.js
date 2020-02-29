import React from "react";
import "./styles.css";
import {Button, Dropdown, Icon, List, Popup} from "semantic-ui-react";

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    render() {
        return (
            <div>
                <Popup basic on="click" position={"bottom center"}
                       trigger={<Button icon="user" color={"blue"} size={"huge"} circular={true}/>} flowing>
                    <List size={"large"} celled>
                        <List.Item>Username: Kevin</List.Item>
                        <List.Item>Gender: Male</List.Item>
                        <List.Item>GPA: 4.0</List.Item>
                        <List.Item>Level of Education: 3rd Year</List.Item>
                        <List.Item>Field of Study: ECE</List.Item>
                    </List>
                    <List size={"large"} selection relaxed>
                        <Dropdown icon={null} pointing='left' item
                                  text={<div>Courses Taking<Icon name={"triangle right"}/></div>}>
                            <Dropdown.Menu>
                                <Dropdown.Item href="*">CSC309B</Dropdown.Item>
                                <Dropdown.Item href="*">ECE361</Dropdown.Item>
                                <Dropdown.Item href="*">CSC343</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown icon={null} pointing='left' item
                                  text={<div>Courses Teaching<Icon name={"triangle right"}/></div>}>
                            <Dropdown.Menu>
                                <Dropdown.Item href="CSC309A">CSC309A</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </List>
                </Popup>
            </div>
        );
    }
}
