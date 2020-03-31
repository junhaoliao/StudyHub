import React from "react";
import {Button, Form, Header, Message, Segment} from "semantic-ui-react";
import {postNewAnnouncement} from "../../actions/course";

export class AddAnnouncement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: this.props.courseName,
            newAnnouncementTitle: "",
            newAnnouncementContent: "",
            message: {},
        };
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    render() {
        const {message, newAnnouncementTitle, newAnnouncementContent} = this.state;
        return (
            <Segment inverted>
                <Header>Post A New Announcement</Header>
                <Form inverted onSubmit={() => postNewAnnouncement(this)}>
                    <Form.Field required>
                        <label>Title</label>
                        <Form.Input
                            name="newAnnouncementTitle"
                            value={newAnnouncementTitle}
                            onChange={this.handleChange}
                            placeholder='Title'
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Content</label>
                        <Form.Input
                            name="newAnnouncementContent"
                            value={newAnnouncementContent}
                            onChange={this.handleChange}
                            placeholder='Content'/>
                    </Form.Field>
                    <Button type='submit'>Post it!</Button>
                </Form>
                {message.header ? <Message positive={message.success} negative={!message.success}>
                    <Message.Header>{message.header}</Message.Header>
                    <p>
                        {message.content}
                    </p>
                </Message> : null}
            </Segment>
        );
    }
}