import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";

import {Accordion, Button, Comment, Form, Grid, Header, Icon, Popup, Segment} from "semantic-ui-react";

import Avatar from "react-avatar";

import {ProfileView} from "../ProfileView";
import {uid} from "react-uid";
import {getCourseObject, postNewMsg} from "../../actions/course";


const announcements = [
    {title: "Announcement 1", content: "I am the first announcement."},
    {title: "Announcement 2", content: "I am another announcement."}
];

/* Component for the Home page */
export class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        const {match: {params}} = this.props;

        this.state = {
            courseName: params.courseName,
            admin: {},
            chatroom: [],
            message_to_send: "",
            scroll_height: 0,
            activeIndex: 0
        };
        getCourseObject(this);
    }

    componentDidMount() {
        document.title = this.state.courseName;
        setInterval(() => {
            const app = this;
            getCourseObject(app);
        }, 5000);
        setTimeout(() => {
            const chatroomSegment = document.querySelector(".chat_room_messages");
            chatroomSegment.scrollTop = chatroomSegment.scrollHeight;
        }, 1500);
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});
    //
    // handleSubmit = () => {
    //     const newMessage = {};
    //     newMessage.user = "RegularUser";
    //
    //     const now = new Date();
    //
    //     newMessage.date =
    //         now.getHours() +
    //         ":" +
    //         now.getMinutes() +
    //         ":" +
    //         now.getSeconds() +
    //         " on " +
    //         months[now.getMonth()] +
    //         "-" +
    //         now.getDate();
    //
    //     newMessage.message = this.state.message_to_send;
    //     chat_log.push(newMessage);
    //
    //     this.setState({message_to_send: ""});
    // };

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
                    src={<Avatar name={comment.username} size="42" round={true}/>}
                />
                <Comment.Content>
                    <Comment.Author as="a">{comment.username}</Comment.Author>
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
        const {message_to_send, chatroom, courseName} = this.state;
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
                                <Header.Content> {courseName}</Header.Content>
                            </Header>
                        </div>
                    </Grid.Column>
                </Grid>
                <div className={"chat_room_container"}>
                    <Segment className={"chat_room_messages"}>
                        <Comment.Group>
                            {chatroom.map(msg => this.plot_comment(msg))}
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
                    <Form onSubmit={() => postNewMsg(this)} className={"chat_bar"}>
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
                        href={`/courses/${courseName}/resources`}
                        color={"blue"}
                        className={"resources_button"}
                    >
                        <div className={"resources_button_text"}>📐 Resources</div>
                    </Button>
                    <Accordion className={"announcements_container"} styled>
                        {this.plot_announcements(announcements)}
                    </Accordion>
                </div>
            </div>

        );
    }
}
