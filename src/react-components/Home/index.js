import React from "react";

import "./styles.css";

import { SignupBox } from "../SignupBox/index";

/* Component for the Home page */
class Home extends React.Component {
  render() {
    return (
      <div className="home__bg-image center">
        <SignupBox />
      </div>
    );
  }
}

export default Home;
