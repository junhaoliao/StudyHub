import React from "react";

import "./styles.css";

import { SignupBox } from "../SignupBox";
import { LoginBox } from "../LoginBox";

/* Component for the Home page */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sign_up: false
    };
  }

  render() {
    return (
      <div className={"home_page_container"}>
        <div className="ui attached message">
          <h2 className="ui blue center aligned icon header">
            <i className=" circular users icon"></i>
            Welcome to StudentHub
          </h2>
        </div>
        <div className="sign_up_box_container">
          {this.state.sign_up ? <SignupBox /> : <LoginBox />}
        </div>
        {this.state.sign_up ? (
          <div className="ui signup_prompt  warning ">
            <i className="icon help"></i>
            Already signed up?{" "}
            <button
              className="ui primary basic button"
              onClick={() => this.setState({ sign_up: false })}
            >
              Login HERE
            </button>{" "}
            instead.
          </div>
        ) : (
          <div className="ui signup_prompt  warning ">
            <i className="icon help"></i>
            Wanna signed up?{" "}
            <button
              className="ui primary basic button"
              onClick={() => this.setState({ sign_up: true })}
            >
              Sign Up HERE
            </button>{" "}
            instead.
          </div>
        )}
      </div>
    );
  }
}

export default Home;
