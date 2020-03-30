import React from "react";
import {Button, Card} from "semantic-ui-react";

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
            this.LikedButton = <Button color={"red"} onClick={this.toggle_like}>
                ❤️ Liked</Button>;
        } else {
            this.LikedButton = <Button color={"grey"} onClick={this.toggle_like}>
                🤍 Like</Button>;
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