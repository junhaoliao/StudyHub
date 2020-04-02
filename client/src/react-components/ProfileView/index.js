import React from "react";
import "./styles.css";
import {Button, Dropdown, Icon, List, Popup} from "semantic-ui-react";

import {getUserProfileById} from "../../actions/Profile"

export class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            gender: "",
            GPA: null,
            levelOfEducation: "",
            fieldOfStudy: "",
            coursesTaking: [],
            coursesTeaching: []
        };
        getUserProfileById(this, this.props.user_id);
    }

    render() {
        const {
            username,
            gender,
            GPA,
            levelOfEducation,
            fieldOfStudy,
            coursesTaking,
            coursesTeaching
        } = this.state;

        return (
            <div>
                <Popup basic on="click" position={"bottom center"}
                       trigger={<Button icon="user" color={"blue"} size={"huge"} circular={true}/>} flowing>
                    <List size={"large"} celled>
                        <List.Item>Username: {username}</List.Item>
                        <List.Item>Gender: {gender}</List.Item>
                        <List.Item>GPA: {GPA}</List.Item>
                        <List.Item>Level of Education: {levelOfEducation}</List.Item>
                        <List.Item>Field of Study: {fieldOfStudy}</List.Item>
                    </List>
                    <List size={"large"} selection relaxed>
                        <Dropdown icon={null} pointing='left' item
                                  text={<div>Courses Taking<Icon name={"triangle right"}/></div>}>
                            <Dropdown.Menu>
                                {coursesTaking.map((course) => (
                                    <Dropdown.Item href={`/courses/${course}`}>{course}</Dropdown.Item>))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown icon={null} pointing='left' item
                                  text={<div>Courses Teaching<Icon name={"triangle right"}/></div>}>
                            <Dropdown.Menu>
                                {coursesTeaching.map((course) => (
                                    <Dropdown.Item href={`/courses/${course}`}>{course}</Dropdown.Item>))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </List>
                </Popup>
            </div>
        );
    }
}
