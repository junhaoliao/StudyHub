import React from "react";
import NavBar from "../NavBar/navbar";

//import "./styles.css";

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            gender: "",
            gpa: "",
            education: "",
            discipline: "",
            courses_taking: "",
            courses_teaching: ""
        };
    }

    render() {
        const {
            username,
            gender,
            gpa,
            education,
            discipline,
            courses_taking,
            courses_teaching
        } = this.props;
        return (
            <div>
                <NavBar></NavBar>
                <div className="ui attached message">
                    <h2 className="ui blue inverted center aligned icon header">
                        <i className="user circle icon"></i>
                        Profile
                    </h2>
                </div>
                <div className="ui divided selection list">
                    <div className="item">
                        <div className="ui blue horizontal label">Username</div>
                        Kevin
                    </div>
                    <div className="item">
                        <div className="ui black horizontal label">GPA</div>
                        4.0
                    </div>
                    <div className="item">
                        <div className="ui blue horizontal label">Gender</div>
                        Male
                    </div>
                    <div className="item">
                        <div class="ui black horizontal label">Level of Education</div>
                        3rd Year
                    </div>
                    <div className="item">
                        <div class="ui blue horizontal label">Field of Study</div>
                        ECE
                    </div>
                    <div className="item">
                        <div class="ui black horizontal label">Courses Teaching</div>
                        <div className="ui blue label">
                            <a className="label" href="CSC309A">
                                CSC309A
                            </a>
                        </div>
                    </div>
                    <div className="item">
                        <div class="ui blue horizontal label">Courses Taking</div>
                        <div className="ui blue label">
                            <a className="label" href="CSC309A">
                                CSC309B
                            </a>
                        </div>
                        <div className="ui blue label">
                            <a className="label" href="CSC309A">
                                CSC343
                            </a>
                        </div>
                        <div className="ui blue label">
                            <a className="label" href="CSC309A">
                                ECE361
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
