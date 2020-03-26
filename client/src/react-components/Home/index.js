import React from "react";

import "./styles.css";

import { SignupBox } from "../SignupBox";
import { LoginBox } from "../LoginBox";
import { Button } from "semantic-ui-react";

/* Component for the Home page */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/home");
    this.state = {
      sign_up: true
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
            <Button
              basic
              color={"blue"}
              size={"small"}
              onClick={() => this.setState({ sign_up: false })}
            >
              Login HERE
            </Button>{" "}
            instead.
          </div>
        ) : (
          <div className="ui signup_prompt  warning ">
            <i className="icon help"></i>
            Don't have an account?{" "}
            <Button
              basic
              color={"blue"}
              size={"small"}
              onClick={() => this.setState({ sign_up: true })}
            >
              Sign Up HERE
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
