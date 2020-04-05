import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";

import {Accordion, Button, Comment, Divider, Form, Grid, Header, Icon, Popup, Segment} from "semantic-ui-react";

import Avatar from "react-avatar";

import {ProfileView} from "../ProfileView";
import {getCourseObject, postNewMsg, removeAnnouncementHandler} from "../../actions/course";
import {AddAnnouncement} from "./AddAnnouncement";

/* Component for the Home page */
export class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        const {match: {params}} = this.props;

        this.state = {
            courseName: params.courseName,
            admin: "",
            currentUserID: {},
            chatroom: [],
            announcements: [],
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
        }, 3000);
        setTimeout(() => {
            const chatroomSegment = document.querySelector(".chat_room_messages");
            chatroomSegment.scrollTop = chatroomSegment.scrollHeight;

        }, 1500);
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex});
    };

    plot_comment(comment) {
        return (
            <Comment>
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
        const {activeIndex, currentUserID, admin} = this.state;
        const isAdmin = currentUserID === admin;
        let result = [];
        for (let i = 0; i < announcements.length; i++) {
            result.push(
                <Accordion.Title
                    active={activeIndex === i}
                    index={i}
                    onClick={this.handleClick}
                >
                    {isAdmin ? <Button icon={"remove circle"} app={this} announcement_id={announcements[i]._id}
                                       onClick={removeAnnouncementHandler}/> : null}
                    <Icon name="dropdown"/>
                    <span>{announcements[i].title}</span>
                </Accordion.Title>
            );
            result.push(
                <Accordion.Content active={activeIndex === i}>
                    <div className={"announcement_content"}><p>{announcements[i].content}</p></div>
                </Accordion.Content>
            );
        }
        return result;
    }

    render() {
        const {message_to_send, chatroom, courseName, currentUserID, announcements, admin} = this.state;
        const isAdmin = currentUserID === admin;
        if (admin === "") {
            return (<div/>);
        }

        return (
            <div>
                <NavBar/>
                <Grid padded={"horizontally"} relaxed={"very"}>
                    <Grid.Column>
                        <ProfileView user_id={admin}/>
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
                                required
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
                    <Divider horizontal>Or</Divider>
                    <div className={"post_announcements_button_container"}>
                        <Popup
                            on='click'

                            disabled={!isAdmin}
                            pinned
                            trigger={
                                <Button
                                    className={"post_announcements_button"}
                                    color='yellow'
                                    disabled={!isAdmin}
                                >
                                    <div
                                        className={"post_announcements_button_text"}>{isAdmin ? "📢 Post Announcements" : "📢 Only Course Admin can post announcements"}</div>
                                </Button>
                            }>
                            <AddAnnouncement courseName={courseName}/>
                        </Popup>
                    </div>

                    <Accordion className={"announcements_container"} styled>
                        {this.plot_announcements(announcements)}
                    </Accordion>
                </div>
            </div>

        );
    }
}
