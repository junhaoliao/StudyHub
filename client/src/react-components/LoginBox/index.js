import React from "react";
import "./styles.css";
import { Redirect } from "react-router-dom";
import { Form, Segment } from "semantic-ui-react";
import { updateLoginForm, loginSubmit } from "../../actions/RegularUser";
import App from "../../App";

export class LoginBox extends React.Component {
  // hard code for existing user log in information
  // username_list = ["Junhao", "Ashley", "Kruzer", "Kevin"];
  // password_list = ["Admin", "Regular", "Regular", "Regular"];
  //   constructor(props) {
  //     super(props);
  //     //this.props.history.push("/login");
  //   }
  state = {
    username: "",
    password: "",
    login_regular: false
    // login_admin: false,
    // finish_typing: false
  };

  // input_handler = event => {
  //     event.preventDefault();
  //     this.setState({
  //         [event.target.name]: event.target.value,
  //         finish_typing: false
  //     });
  // };

  // submit_handler = event => {
  //     console.log(this.state);
  //     event.preventDefault();
  //     if (this.state.username === "") {
  //         console.log("Username cannot be empty");
  //         document.querySelector(".username_input").focus();
  //         return;
  //     }
  //     if (this.state.password === "") {
  //         console.log("Password cannot be empty");
  //         document.querySelector(".password_input").focus();
  //         return;
  //     }
  //     let correct_regular = false;
  //     let correct_admin = false;
  //     this.setState(
  //         {
  //             finish_typing: true,
  //             password: ""
  //         },
  //         () => {
  //             console.log("finish typing: " + this.state.finish_typing);
  //         }
  //     );

  //     // for (
  //     //   let user_index = 0;
  //     //   user_index < this.username_list.length;
  //     //   user_index++
  //     // ) {
  //     //   if (
  //     //     this.username_list[user_index] == this.state.username &&
  //     //     this.password_list[user_index] == this.state.password
  //     //   ) {
  //     //     correct_regular = true;
  //     //   }
  //     // }
  //     if (this.state.username === "user" && this.state.password === "user") {
  //         correct_regular = true;
  //     } else {
  //         correct_regular = false;
  //     }

  //     if (this.state.username === "admin" && this.state.password === "admin") {
  //         correct_admin = true;
  //     } else {
  //         correct_admin = false;
  //     }

  //     if (correct_regular) {
  //         console.log(
  //             "Welcome " + this.state.username + " " + this.state.password + " User"
  //         );
  //         this.setState(
  //             {
  //                 login_regular: true
  //             },
  //             () => {
  //                 console.log("login_regular: " + this.state.login_regular);
  //             }
  //         );
  //     } else {
  //         console.log("Incorrect_regular username or password");
  //         this.setState(
  //             {
  //                 login_regular: false
  //             },
  //             () => {
  //                 console.log("login_regular: " + this.state.login_regular);
  //             }
  //         );
  //     }

  //     if (correct_admin) {
  //         console.log("Welcome Admin User");
  //         this.setState(
  //             {
  //                 login_admin: true
  //             },
  //             () => {
  //                 console.log("login_admin: " + this.state.login_admin);
  //             }
  //         );
  //     } else {
  //         console.log("Incorrect_regular username or password");
  //         this.setState(
  //             {
  //                 login_admin: false
  //             },
  //             () => {
  //                 console.log("login_admin: " + this.state.login_admin);
  //             }
  //         );
  //     }
  // };

  render() {
    // const { app } = this.props;
    // console.log(App);
    if (this.state.login_regular) {
      return <Redirect to="/dash_board" />;
    }
    // if (this.state.login_admin) {
    //   return <Redirect to="/adash_board" />;
    // } else {
    return (
      /*The overall login box*/
      <Segment>
        <Form>
          <div className="field">
            <label className="ui blue basic label">Username</label>
            <div className="ui left icon input">
              <input
                autoFocus
                className="username_input"
                name="username"
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => updateLoginForm(this, e.target)}
              />

              <i className="blue user icon" />
            </div>
          </div>
          <div className="field">
            <label className="ui blue basic label">Password</label>
            <div className="ui left icon input">
              <input
                className="password_input"
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => updateLoginForm(this, e.target)}
              />
              <i className="blue lock icon" />
            </div>
          </div>
          <div className="field">
            <button
              className="ui primary button"
              type="submit"
              onClick={() => loginSubmit(this, App)}
            >
              Log In
            </button>
          </div>
          {!this.state.login_regular &&
          !this.state.login_admin &&
          this.state.finish_typing ? (
            <div className="ui negative message">
              <div className="header">Invalid Username or Password</div>
              <p>Please Renter Username and Password</p>
            </div>
          ) : (
            <div />
          )}
        </Form>
      </Segment>
    );
  }
}
