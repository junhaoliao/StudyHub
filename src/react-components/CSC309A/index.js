import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";

import {Accordion, Button, Comment, Form, Grid, Header, Icon, Popup, Segment} from "semantic-ui-react";

import {ProfileView} from "../ProfileView";
import ToMarker from "../ToMarker/ToMarker";
import {uid} from "react-uid";

const chat_log = [
    {
        user: "Kevin",
        date: "Today at 0:00AM",
        message: "Welcome to the new class!😀"
    },
    {user: "Junhao", date: "Today at 0:00AM", message: "What a nice day!😂"},
    {
        user: "Kruzer",
        date: "Today at 0:00AM",
        message: "😆Let's come and finish the project tonight!"
    },
    {
        user: "Ashley",
        date: "Today at 0:00AM",
        message: "No problem! I will start with the profile.😎"
    }
];

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const announcements = [
    {title: "Announcement 1", content: "I am the first announcement."},
    {title: "Announcement 2", content: "I am another announcement."}
];

/* Component for the Home page */
class CSC309A extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message_to_send: "",
            activeIndex: 0
        };
    }

    componentDidMount() {
        document.title = "CSC309A";
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleSubmit = () => {
        const newMessage = {};
        newMessage.user = "RegularUser";

        const now = new Date();

        newMessage.date =
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds() +
            " on " +
            months[now.getMonth()] +
            "-" +
            now.getDate();

        newMessage.message = this.state.message_to_send;
        chat_log.push(newMessage);

        this.setState({message_to_send: ""});
    };

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    plot_comment(comment) {
        return (
            <Comment key={uid(comment)}>
                <Comment.Avatar
                    src=<Avatar name={comment.user} size="42" round={true}/>
                />
                <Comment.Content>
                    <Comment.Author as="a">{comment.user}</Comment.Author>
                    <Comment.Metadata>
                        <div>{comment.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.message}</Comment.Text>
                </Comment.Content>
            </Comment>
        );
    }

    plot_announcements(announcements) {
        const {activeIndex} = this.state;
        let result = [];
        for (let i = 0; i < announcements.length && i < 3; i++) {
            result.push(
                <Accordion.Title key={uid(announcements[i]) + "_title"}
                                 active={activeIndex === i}
                                 index={i}
                                 onClick={this.handleClick}
                >
                    <Icon name="dropdown"/>
                    {announcements[i].title}
                </Accordion.Title>
            );
            result.push(
                <Accordion.Content active={activeIndex === i} key={uid(announcements[i]) + "_content"}>
                    <p>{announcements[i].content}</p>
                </Accordion.Content>
            );
        }
        return result;
    }

    render() {
        const {message_to_send} = this.state;
        return (
            <div>
                <NavBar/>
                <Grid padded={"horizontally"} relaxed={"very"}>
                    <Grid.Column>
                        <ProfileView/>
                    </Grid.Column>
                    <Grid.Column>
                        <div className={"course_header"}>
                            <Header as="h1">
                                <Header.Content> CSC309A</Header.Content>
                            </Header>
                        </div>
                    </Grid.Column>
                </Grid>
                <div className={"chat_room_container"}>
                    <Segment className={"chat_room_messages"}>
                        <Comment.Group>
                            {chat_log.map(comment => this.plot_comment(comment))}
                        </Comment.Group>
                    </Segment>
                    <Popup
                        on="click"
                        trigger={<Button className={"emoji_selector"}>😀</Button>}
                        flowing
                        hoverable
                    >
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "😀"
                                })
                            }
                        >
                            😀
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "😆"
                                })
                            }
                        >
                            😆
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "😂"
                                })
                            }
                        >
                            😂
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "😎"
                                })
                            }
                        >
                            😎
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "👍"
                                })
                            }
                        >
                            👍
                        </Button>
                        <Button
                            onClick={() =>
                                this.setState({
                                    message_to_send: this.state.message_to_send + "🤝"
                                })
                            }
                        >
                            🤝
                        </Button>
                    </Popup>
                    <Form onSubmit={this.handleSubmit} className={"chat_bar"}>
                        <Form.Group>
                            <Form.Input
                                width={16}
                                placeholder="Enter your message here"
                                name="message_to_send"
                                value={message_to_send}
                                onChange={this.handleChange}
                            />
                            <Form.Button color={"blue"} content="Submit"/>
                        </Form.Group>
                    </Form>
                </div>
                <div className={"course_secondary_column"}>
                    <Button
                        href="/CSC309A/resources"
                        color={"blue"}
                        className={"resources_button"}
                    >
                        <div className={"resources_button_text"}>📐 Resources</div>
                    </Button>
                    <Accordion className={"announcements_container"} styled>
                        {this.plot_announcements(announcements)}
                    </Accordion>
                </div>
                <ToMarker header={"To Edward"}
                          content={"The chat room can work locally although nothing will be saved. Please try the emoji~"}/>
            </div>
        );
    }
}

export default CSC309A;
