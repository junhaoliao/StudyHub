import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import { Container, Form, Header, Segment } from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import { Placeholder } from "semantic-ui-react";
import { Comment } from "semantic-ui-react";
import Avatar from "react-avatar";

const billboard_content = [
  {
    image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
    user: "Kevin",
    date: "00:00:00 on February-28",
    message: "Welcome to the new class!😀"
  },
  {
    image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
    user: "Junhao",
    date: "00:00:00 on February-28",
    message: "What a nice day!😂"
  },
  {
    image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
    user: "Kruzer",
    date: "00:00:00 on February-28",
    message: "😆Let's come and finish the project tonight!"
  },
  {
    image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
    user: "Ashley",
    date: "00:00:00 on February-28",
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

class hub_Billboard extends React.Component {
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const newMessage = {};
    newMessage.user = "RegularUser";
    newMessage.image =
      "https://react.semantic-ui.com/images/avatar/small/matthew.png";

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
    billboard_content.push(newMessage);

    this.setState({ message_to_send: "" });
  };

  plot_comment(comment) {
    return (
      <Comment>
        <Comment.Avatar src={comment.image} />
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

  render() {
    const { message_to_send } = "";
    return (
      <div>
        <Container fluid>
          <div className={"bill_board_header"}>
            <header className={"bill_board"}>Billboard</header>
          </div>

          <div className={"container_design"}>
            <div className={"ui yellow segment"}>
              <Comment.Group>
                {billboard_content.map(comment => this.plot_comment(comment))}
              </Comment.Group>
            </div>
          </div>
        </Container>

        <div className={"input_outline"}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Input
                width={16}
                placeholder="Type in your thought..."
                name="message_to_send"
                value={message_to_send}
                onChange={this.handleChange}
              />
              <Form.Button color={"black"} content="Submit" />
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
}

export default hub_Billboard;
