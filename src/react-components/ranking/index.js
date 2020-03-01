

import React from "react";

import NavBar from "../NavBar/navbar";

import "./styles.css";
import {Button, Icon, Menu} from "semantic-ui-react";
import Courses from "../Courses/courses";


const course_list = [

    {name: "CSC309A", admin: "Kevin", info: "1234 people liked this course", liked: 1234},
    {name: "ECE361", admin: "Junhao", info: "123 people liked this course", liked: 123},
    {name: "CSC343", admin: "Kruzer", info: "12 people liked this course", liked: 12},
    {name: "CSC309B", admin: "Ashley", info: "1 people liked this course", liked: 1},
];


/* Component for the Ranking page */
class Ranking extends React.Component {



    render() {
        return (
            <div>
                <NavBar/>
                <Button size="small" color="green">
                    <Icon name="renew" />
                    Renew
                </Button>

                <div className={"courses_container"}>
                    <Menu secondary>
                        <Menu.Item
                            name='Rank'
                            className={"dashboard_header"}
                        />

                    </Menu>
                    <Courses
                        course_list={course_list}
                    />
                </div>


            </div>
        );
    }
}

export default Ranking;