import React from "react";
import {uid} from "react-uid";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import Course from "./course"


class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        const {course_list} = this.props;

        return (
            <div>
                <Container className={"cards_grid"}>
                    <Row>
                        {course_list.map(course => (
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