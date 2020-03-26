import React from "react";
import "./styles.css";

import NavBar from "../NavBar/navbar";
import Courses from "../Courses/courses";
import ToMarker from "../ToMarker/ToMarker";

import { Button, Form, Header, Icon, Menu, Segment } from "semantic-ui-react";

const course_list = [
  {
    name: "CSC309A",
    admin: "Kevin",
    info: "The best course offered at UofT",
    liked: true
  },
  {
    name: "ECE361",
    admin: "Junhao",
    info: "The best course offered at UofT",
    liked: false
  },
  {
    name: "CSC343",
    admin: "Kruzer",
    info: "The best course offered at UofT",
    liked: true
  },
  {
    name: "CSC309B",
    admin: "Ashley",
    info: "The best course offered at UofT",
    liked: false
  }
];

/* Component for the Home page */
class dash_board extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/dash_board");
  }

  state = {
    adding_course: false,
    add_course_name: "",
    add_course_admin: "",
    terms_confirmed: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { add_course_name, add_course_admin, terms_confirmed } = this.state;
    if (terms_confirmed) {
      const newCourse = {};
      newCourse.name = add_course_name;
      newCourse.admin = add_course_admin;
      newCourse.info = "The best course offered at UofT";
      newCourse.liked = false;
      course_list.push(newCourse);
      this.setState({
        adding_course: false,
        add_course_name: "",
        add_course_admin: "",
        terms_confirmed: false
      });
    }
  };

  componentDidMount() {
    document.title = "Dash Board";
  }

  course_panel() {
    const { adding_course } = this.state;
    if (adding_course) {
      return (
        <div className={"add_course_container"}>
          <Segment inverted>
            <Header as={"h1"}>Adding a new course...</Header>
            <Form onSubmit={this.handleSubmit} inverted>
              <Form.Group widths="equal">
                <Form.Input
                  name="add_course_name"
                  value={this.state.add_course_name}
                  onChange={this.handleChange}
                  required
                  fluid
                  label="Course Name"
                  placeholder="Course Name"
                />
                <Form.Input
                  name="add_course_admin"
                  value={this.state.add_course_admin}
                  onChange={this.handleChange}
                  required
                  fluid
                  label="Course Admin(temporary)"
                  placeholder="Course Admin(temporary)"
                />
              </Form.Group>
              <Form.Checkbox
                onChange={() =>
                  this.setState(prevState => ({
                    terms_confirmed: !prevState.terms_confirmed
                  }))
                }
                checked={this.state.terms_confirmed}
                required
                label="I agree to the Terms and Conditions"
              />
              <Button type="submit">Submit</Button>
            </Form>
          </Segment>
        </div>
      );
    } else {
      return (
        <div className={"courses_container"}>
          <Menu secondary>
            <Menu.Item name="DashBoard" className={"dashboard_header"} />
            <Menu.Item position={"right"}>
              <Button
                basic
                color={"yellow"}
                onClick={() => this.setState({ adding_course: true })}
                className={"add_course_button"}
              >
                <Icon size="large" name={"plus"} />
              </Button>
            </Menu.Item>
          </Menu>
          <Courses course_list={course_list} />
          <ToMarker
            header={"To Edward"}
            content={
              "Since everything will be hard-coded, we only made CSC309A available. " +
              "Anyways feel free to add classes or toggle the like buttons."
            }
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.course_panel()}
      </div>
    );
  }
}

export default dash_board;
