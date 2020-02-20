import React from "react";

import "./styles.css";

import {LoginBox} from "../LoginBox/login_box";
import {SignupBox} from "../SignupBox/signup_box";

/* Component for the Home page */
class Home extends React.Component {
    render() {
        return (
            <div className="home__bg-image center">
                <LoginBox/>
                <SignupBox/>
            </div>
        );
    }
}

export default Home;
