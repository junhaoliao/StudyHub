import React from "react";

import "./styles.css";
import { Comment, Container, Form } from "semantic-ui-react";
import { readCookie, updateMessage } from "../../actions/BillBoard";

// const billboard_content = [
//   {
//     image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
//     user: "Kevin",
//     date: "00:00:00 on February-28",
//     message: "Welcome to the new class!😀"
//   },
//   {
//     image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
//     user: "Junhao",
//     date: "00:00:00 on February-28",
//     message: "What a nice day!😂"
//   },
//   {
//     image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
//     user: "Kruzer",
//     date: "00:00:00 on February-28",
//     message: "😆Let's come and finish the project tonight!"
//   },
//   {
//     image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
//     user: "Ashley",
//     date: "00:00:00 on February-28",
//     message: "No problem! I will start with the profile.😎"
//   }
// ];

let billboard_content = [];

function load_content() {
  const url = "/BillBoard/content";
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      billboard_content = json;
      console.log(billboard_content);
    });
}
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
load_content();
class hub_Billboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: "",
      date: "",
      message: "",
      image: "https://react.semantic-ui.com/images/avatar/small/matthew.png"
    };
    readCookie(this);
  }
  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    // const newMessage = {};
    // newMessage.username = "RegularUser";
    // newMessage.image =
    //   "https://react.semantic-ui.com/images/avatar/small/matthew.png";

    const now = new Date();

    this.state.date =
      now.getHours() +
      ":" +
      now.getMinutes() +
      ":" +
      now.getSeconds() +
      " on " +
      months[now.getMonth()] +
      "-" +
      now.getDate();

    const newContent = {};
    newContent.username = this.state.username;
    newContent.date = this.state.date;
    newContent.message = this.state.message;
    newContent.image = this.state.image;
    //newContent.userid = this.state.userid;
    console.log("state ready to send a request:");
    console.log(newContent);

    console.log(JSON.stringify(newContent));
    const url = "/BillBoard/new";
    const request = new Request(url, {
      method: "post",
      body: JSON.stringify(newContent),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    fetch(request)
      .then(res => {
        if (res.status === 200) {
          console.log("Successfully record to the database");
        }
      })
      .catch(error => {
        console.log(error);
      });

    console.log("Loading new Billboard content");
    //load_content();

    // newMessage.message = this.state.message_to_send;
    // billboard_content.push(newMessage);

    this.setState({ message: "" });
  };

  plot_comment(comment) {
    return (
      <Comment>
        <Comment.Avatar src={comment.image} />
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

  billboard_page() {
    const message_to_send = "";
    if (this.state.login) {
      console.log("Welcome to BillBoard");
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
                  name="message"
                  value={this.state.message}
                  onChange={e => updateMessage(this, e.target)}
                />
                <Form.Button color={"black"} content="Submit" />
              </Form.Group>
            </Form>
          </div>
        </div>
      );
    } else {
      console.log("Unauthorized");
      return <div>Unauthorized</div>;
    }
  }
  render() {
    return <div>{this.billboard_page()}</div>;
  }
}

export default hub_Billboard;
