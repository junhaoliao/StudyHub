import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class Course extends React.Component {
    LikedButton = "";

    constructor(props) {
        super(props);
        this.state = {
            liked: props.course.liked
        }
    }

    toggle_like = event => {
        // console.log(this.state)
        this.setState({
            liked: !this.state.liked
        });
        if (this.state.liked) {
            this.LikedButton = <Button className="mr-auto" variant="danger" onClick={this.toggle_like}>
                <span role={"img"} aria-label="red-heart">❤</span>
                Liked</Button>;
        } else {
            this.LikedButton = <Button className="mr-auto" variant="secondary" onClick={this.toggle_like}>
                <span role={"img"} aria-label="white-heart">🤍</span>
                Like</Button>;
        }
    };

    render() {
        const {course} = this.props;

        if (this.state.liked) {
            this.LikedButton = <Button className="mr-auto" variant="danger" onClick={this.toggle_like}>
                <span role={"img"} aria-label="red-heart">❤</span>
                Liked</Button>;
        } else {
            this.LikedButton = <Button className="mr-auto" variant="secondary" onClick={this.toggle_like}>
                <span role={"img"} aria-label="white-heart">🤍</span>
                Like</Button>;
        }

        return (
            <Card border="primary" className={"course_card"} key={course.name}>
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{course.name}</Card.Title>
                    <Card.Text>
                        Admin: {course.admin}
                    </Card.Text>
                    <div className="d-flex flex-row mt-auto">
                        {this.LikedButton}
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