import React from "react";
import {uid} from "react-uid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Course from "./course"

const course_list = [
    {name: "CSC309A", admin: "Kevin", liked: true},
    {name: "ECE361", admin: "Junhao", liked: false},
    {name: "CSC343", admin: "Kruzer", liked: true},
    {name: "CSC309B", admin: "Ashley", liked: false}
];

class Courses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: course_list,
        }
    }

    render() {
        return (
            <div>
                <Container className={"cards_grid"}>
                    <Row>
                        {this.state.courses.map(course => (
                            <Course
                                key={uid(course)}
                                course={course}
                            />
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Courses;