import React from "react";

import "./styles.css";
import {Button, Divider, Grid, Header, Menu, Segment, Table} from "semantic-ui-react";

import NavBar from "../NavBar/navbar";

import {readCookie} from "../../actions/RegularUser";
import {getRanking} from "../../actions/rankings";


/* Component for the Ranking page */
export class Rankings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserID: {},
            likesRankings: [],
            usersRankings: []
        };
        readCookie(this);
        getRanking(this);
    }

    componentDidMount() {
        document.title = "Rankings";
    }

    plotLikesRankings(rankings) {

        //rankings.forEach((course)=>{console.log(course)});
        return (
            <Table.Body>
                {rankings.map((course) => (
                    <Table.Row>
                        <Table.Cell><a href={`/courses/${course.name}`} target="_blank">{course.name}</a></Table.Cell>
                        <Table.Cell>{course.description}</Table.Cell>
                        <Table.Cell>{course.likes}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        );

    }

    plotUsersRankings(rankings) {

        //rankings.forEach((course)=>{console.log(course)});
        return (
            <Table.Body>
                {rankings.map((user) => (
                    <Table.Row>
                        <Table.Cell>{user.username}</Table.Cell>
                        <Table.Cell>{user.gender}</Table.Cell>
                        <Table.Cell>{user.levelOfEducation}</Table.Cell>
                        <Table.Cell>{user.fieldOfStudy}</Table.Cell>
                        <Table.Cell>{user.GPA}</Table.Cell>
                        <Table.Cell>{user.coursesTeaching.length}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        );

    }

    render() {
        const {likesRankings, usersRankings} = this.state;
        return (
            <div>
                <NavBar/>
                <div className={"rankings_container"}>
                    <Menu secondary>
                        <Menu.Item name="Rankings" className={"rankings_header"}/>
                        <Menu.Item position={"right"}>
                            <Button className={"refresh_button"} color='teal' circular icon={"refresh"} as={"a"}
                                    href={""}/>
                        </Menu.Item>
                    </Menu>

                        <Segment>
                            <Grid columns={2} relaxed='very'>
                                <Grid.Column>
                                    <Header>By Course Popularity</Header>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>Course</Table.HeaderCell>
                                                <Table.HeaderCell>Description</Table.HeaderCell>
                                                <Table.HeaderCell>Likes</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {this.plotLikesRankings(likesRankings)}
                                    </Table>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header>By Engagement</Header>
                                    <Table celled>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>User</Table.HeaderCell>
                                                <Table.HeaderCell>Gender</Table.HeaderCell>
                                                <Table.HeaderCell>Level of Education</Table.HeaderCell>
                                                <Table.HeaderCell>Curriculum</Table.HeaderCell>
                                                <Table.HeaderCell>GPA</Table.HeaderCell>
                                                <Table.HeaderCell>Courses Hosted</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {this.plotUsersRankings(usersRankings)}
                                    </Table>
                                </Grid.Column>
                            </Grid>
                            <Divider vertical>OR</Divider>
                        </Segment>

                </div>
            </div>
        );
    }
}