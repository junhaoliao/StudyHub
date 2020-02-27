import React from "react";
import "./styles.css";


import NavBar from "../NavBar/navbar";
import Courses from "../Courses/courses";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import add_course from "../../actions/add_course";


/* Component for the Home page */
class dash_board extends React.Component {
    state = {
        add_course_name: "",
        add_course_admin: "",
        course_list: [

            {name: "CSC309A", admin: "Kevin", info: "the best course offered at UofT", liked: true},
            {name: "ECE361", admin: "Junhao", info: "the best course offered at UofT", liked: false},
            {name: "CSC343", admin: "Kruzer", info: "the best course offered at UofT", liked: true},
            {name: "CSC309B", admin: "Ashley", info: "the best course offered at UofT", liked: false}
        ]
    };
    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // log(name)

        // 'this' is bound to the component in this arrow function.
        this.setState({
            [name]: value // [name] sets the object property name to the value of the 'name' variable.
        });
    };

    render() {
        return (
            <div>
                <NavBar/>
                <Container>
                    <Row className={"flex-row"}>
                        <header className={"dashboard_header mr-auto"}>
                            DashBoard
                        </header>
                        <Button href={"add_course"} variant="outline-warning" className={"add_course_button ml-auto"}>
                            +
                        </Button>
                    </Row>
                </Container>
                <Courses
                    course_list={this.state.course_list}
                />
            </div>
        );
    }
}

export default dash_board;
