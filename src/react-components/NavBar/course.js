import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Course extends React.Component {


    render() {
        const {course} = this.props;


        let LikedButton;

        if (course.liked) {
            LikedButton = <Button className="mr-auto" variant="danger">
                <span role={"img"} aria-label="red-heart">❤</span>
                Liked</Button>;
        } else {
            LikedButton = <Button className="mr-auto" variant="secondary">
                <span role={"img"} aria-label="white-heart">🤍</span>
                Liked</Button>;
        }

        return (
            <Card border="primary" className={"course_card"} key={course.name}>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>
                        Admin: {course.admin}
                    </Card.Text>
                    <div className="d-flex flex-row mt-auto">
                        {LikedButton}
                        <Button className="ml-auto" variant="primary" href={course.name}>
                            <span role={"img"} aria-label="study">📖</span>
                            Enter</Button>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}

export default Course;