import React from "react";
import {Button, Card} from "semantic-ui-react";

import {toggleLikeStatus} from "../../actions/course";

class Course extends React.Component {
    LikedButton = "";

    constructor(props) {
        super(props);
        this.state = {
            liked: props.course.liked
        }
    }

    render() {
        const {course} = this.props;

        if (this.state.liked) {
            this.LikedButton = <Button className="mr-auto" color={"red"} app={this} courseName={course.name}
                                       onClick={toggleLikeStatus}>
                <span role={"img"} aria-label="red-heart">❤</span>
                Liked</Button>;
        } else {
            this.LikedButton = <Button className="mr-auto" color={"grey"} app={this} courseName={course.name}
                                       onClick={toggleLikeStatus}>
                <span role={"img"} aria-label="white-heart">🤍</span>
                Like</Button>;
        }

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{course.name}</Card.Header>
                    <Card.Meta>Admin: {course.admin}</Card.Meta>
                    <Card.Description>
                        {course.info}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        {this.LikedButton}
                        <Button color={"blue"} href={`/courses/${course.name}`}>
                            <span role={"img"} aria-label="study">📖</span>
                            Enter</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

export default Course;