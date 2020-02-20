import React from "react";
import "./styles.css";


import NavBar from "../NavBar/navbar";
import Courses from "../Courses/courses";


/* Component for the Home page */
class Home extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <header className={"dashboard_header"}>
                    DashBoard
                </header>
                <Courses/>
            </div>
        );
    }
}

export default Home;
