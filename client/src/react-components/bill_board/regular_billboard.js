import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";

import {Comment, Container, Form} from "semantic-ui-react";
import {handleChange, handleSubmit, load_content, readCookie} from "../../actions/BillBoard";
// export class RegularBB extends React.Component {
//   render() {
//     return (
//       <div>
//         <NavBar />
//         <Billboard />
//       </div>
//     );
//   }
// }

// function load_content(app) {
//   const url = "/BillBoard/content";
//   fetch(url)
//     .then(res => {
//       if (res.status === 200) {
//         return res.json();
//       }
//     })
//     .then(json => {
//       app.setState({
//         billboard_content: json
//       });
//       //console.log(billboard_content);
//     });
// }

// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

export class RegularBB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: false,
            username: "",
            date: "",
            message: "",
            image: "https://react.semantic-ui.com/images/avatar/small/matthew.png",
            billboard_content: []
        };
        readCookie(this);
        load_content(this);
    }

    componentDidMount() {
        setInterval(() => {
            load_content(this);
        }, 3000);
        document.title = "BillBoard";
    }

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    // handleSubmit = () => {
    //   // const newMessage = {};
    //   // newMessage.username = "RegularUser";
    //   // newMessage.image =
    //   //   "https://react.semantic-ui.com/images/avatar/small/matthew.png";

    //   const now = new Date();

    //   this.state.date =
    //     now.getHours() +
    //     ":" +
    //     now.getMinutes() +
    //     ":" +
    //     now.getSeconds() +
    //     " on " +
    //     months[now.getMonth()] +
    //     "-" +
    //     now.getDate();

    //   const newContent = {};
    //   newContent.username = this.state.username;
    //   newContent.date = this.state.date;
    //   newContent.message = this.state.message;
    //   newContent.image = this.state.image;
    //   //newContent.userid = this.state.userid;
    //   console.log("state ready to send a request:");
    //   console.log(newContent);

    //   console.log(JSON.stringify(newContent));
    //   const url = "/BillBoard/new";
    //   const request = new Request(url, {
    //     method: "post",
    //     body: JSON.stringify(newContent),
    //     headers: {
    //       Accept: "application/json, text/plain, */*",
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   fetch(request)
    //     .then(res => {
    //       if (res.status === 200) {
    //         console.log("Successfully record to the database");
    //       }
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });

    //   console.log("Loading new Billboard content");
    //   //load_content();

    //   // newMessage.message = this.state.message_to_send;
    //   // billboard_content.push(newMessage);
    //   load_content(this);
    //   this.setState({ message: "" });
    // };

    plot_comment(comment) {
        return (
            < Comment >
            < Comment.Avatar
        src = {comment.image}
        />
        < Comment.Content >
        < Comment.Author as = "a" > {comment.username} < /Comment.Author>
            < Comment.Metadata >
            < div > {comment.date} < /div>
            < /Comment.Metadata>
            < Comment.Text > {comment.message} < /Comment.Text>
            < /Comment.Content>
            < /Comment>
    )
        ;
    }

    billboard_page() {
        //const message_to_send = "";
        const {billboard_content} = this.state;
        if (this.state.login) {
            console.log("Welcome to BillBoard");
            return (
                < div >
                < NavBar > < /NavBar>
                < Container
            fluid >
            < div
            className = {"bill_board_header"} > Billboard < /div>

                < div
            className = {"container_design"} >
                < div
            className = {"ui yellow segment billboard_segment"} >
                < Comment.Group >
                {billboard_content.map(comment => this.plot_comment(comment))}
                < /Comment.Group>
                < /div>
                < /div>
                < /Container>

                < div
            className = {"input_outline"} >
                < Form
            onSubmit = {()
        =>
            handleSubmit(this)
        }>
        <
            Form.Group >
            < Form.Input
            width = {16}
            placeholder = "Type in your thought..."
            name = "message"
            value = {this.state.message}
            onChange = {e
        =>
            handleChange(this, e.target)
        }
            />
            < Form.Button
            color = {"black"}
            content = "Submit" / >
                < /Form.Group>
                < /Form>
                < /div>
                < /div>
        )
            ;
        } else {
            console.log("Unauthorized");
            return
        <
            div > Unauthorized < /div>;
        }
    }

    render() {
        return
    <
        div > {this.billboard_page()} < /div>;
    }
}
