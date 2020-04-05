import React from "react";
import "./styles.css";

import NavBar from "../NavBar/navbar";
import Courses from "../Courses/courses";

import {Button, Divider, Form, Header, Icon, Menu, Segment} from "semantic-ui-react";

import {createCourse, getCourseList, joinCourse} from "../../actions/course";
import {readCookie} from "../../actions/RegularUser";

/* Component for the Home page */
class dash_board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            join_course_name: "",
            courseList: [],
            adding_course: false,
            add_course_name: "",
            add_course_info: "",
            terms_confirmed: false
        };
        getCourseList(this);
        readCookie(this);
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    componentDidMount() {
        document.title = "Dash Board";
    }

    course_panel() {
        const {adding_course, add_course_name, add_course_info, terms_confirmed, join_course_name} = this.state;
        if (adding_course) {
            return (
                <div className={"add_course_container"}>
                    <Segment inverted>
                        <Header as={"h1"}>Creating a new course...</Header>
                        <Form onSubmit={() => createCourse(this)} inverted>
                            <Form.Group widths="equal">
                                <Form.Input
                                    name="add_course_name"
                                    value={add_course_name}
                                    onChange={this.handleChange}
                                    required
                                    fluid
                                    label="Course Name"
                                    placeholder="Course Name"
                                />
                                <Form.Input
                                    name="add_course_info"
                                    value={add_course_info}
                                    onChange={this.handleChange}
                                    fluid
                                    label="Course Info (Optional)"
                                    placeholder="Course Info (Optional)"
                                />
                            </Form.Group>
                            <Form.Checkbox
                                onChange={() =>
                                    this.setState(prevState => ({
                                        terms_confirmed: !prevState.terms_confirmed
                                    }))
                                }
                                checked={terms_confirmed}
                                required
                                label="I agree to the Terms and Conditions"
                            />
                            <Button type="submit">Submit</Button>
                        </Form>

                        <Divider horizontal inverted>Or</Divider>

                        <Header as={"h1"}>Joining a new course...</Header>
                        <Form onSubmit={() => joinCourse(this)} inverted>

                            <Form.Input
                                name="join_course_name"
                                value={join_course_name}
                                onChange={this.handleChange}
                                required
                                fluid
                                label="Course Name"
                                placeholder="Course Name"
                            />

                            <Form.Checkbox
                                onChange={() =>
                                    this.setState(prevState => ({
                                        terms_confirmed: !prevState.terms_confirmed
                                    }))
                                }
                                checked={terms_confirmed}
                                required
                                label="I agree to the Terms and Conditions"
                            />
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Segment>
                </div>
            );
        } else {
            const {courseList} = this.state;
            return (
                <div className={"courses_container"}>
                    <Menu secondary>
                        <Menu.Item name="DashBoard" className={"dashboard_header"}/>
                        <Menu.Item position={"right"}>
                            <Button
                                basic
                                color={"yellow"}
                                onClick={() => this.setState({adding_course: true})}
                                className={"add_course_button"}
                            >
                                <Icon size="large" name={"plus"}/>
                            </Button>
                        </Menu.Item>
                    </Menu>
                    {courseList.length !== 0 ? <Courses course_list={courseList}/> :
                        <Header>Seems you haven't enrolled in any courses yet. Click the yellow button to add a course
                            to your DashBoard.</Header>}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <NavBar/>
                {this.course_panel()}
            </div>
        );
    }
}

export default dash_board;
