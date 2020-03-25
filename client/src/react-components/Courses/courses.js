import React from "react";
import {uid} from "react-uid";
import {Card} from "semantic-ui-react";

import Course from "./course"


class Courses extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        const {course_list} = this.props;

        return (

            <Card.Group itemsPerRow={4}>
                {course_list.map(course => (
                    <Course
                        key={uid(course)}
                        course={course}
                    />
                ))}
            </Card.Group>

        );
    }
}

export default Courses;