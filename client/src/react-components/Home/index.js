import React from "react";

import "./styles.css";

import {SignupBox} from "../SignupBox";
import {LoginBox} from "../LoginBox";
import {Button} from "semantic-ui-react";
import {Item} from "semantic-ui-react";
import {Grid, Image, Segment, Menu} from 'semantic-ui-react'
import Divider from "semantic-ui-react/dist/commonjs/elements/Divider";
import List from "semantic-ui-react/dist/commonjs/elements/List";


/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.props.history.push("/home");
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
                    {this.state.sign_up ? <SignupBox/> : <LoginBox/>}
                </div>









                {this.state.sign_up ? (
                    <div className="ui signup_prompt  warning ">
                        <i className="icon help"></i>
                        Already signed up?{" "}
                        <Button
                            basic
                            color={"blue"}
                            size={"small"}
                            onClick={() => this.setState({sign_up: false})}
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
                            onClick={() => this.setState({sign_up: true})}
                        >
                            Sign Up HERE
                        </Button>
                    </div>
                )}


                <div className={"info_container"}>
                    <Grid stackable columns={2}>

                        <Grid.Column>
                            <Segment>
                                <Item.Group >

                                    <Item.Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png'/>

                                    <Item.Content>
                                        <Item.Header as='a'>Become a User!</Item.Header>
                                        <Item.Meta>
                                            <p>
                                                - Sign up as a user can join any class to learn different courses.
                                            </p>
                                            <p>
                                                - You can download or upload any file you want and discuss with other users
                                                learning the same course you are taking in the chat room.
                                            </p>
                                            <p>
                                                - Feel free to like a course if you like the Instructor.
                                            </p>
                                            <p>
                                                - Favourite a file so that you can access it later in your own profile page.
                                            </p>
                                            <p>
                                                - Learning will become easier since joining the StudyHub!
                                            </p>
                                        </Item.Meta>
                                    </Item.Content>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <Item.Group>
                                    <Item.Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png'/>

                                    <Item.Content>
                                        <Item.Header as='a'>Become an Instructor!</Item.Header>
                                        <Item.Meta>
                                            <p>
                                                - Any regular user signed in the StudyHub can create a new course by
                                                himself/herself.
                                            </p>
                                            <p>
                                                - Create your own course page and you are all set!
                                            </p>
                                            <p>
                                                - Start uploading some useful course related files and posting some
                                                announcements.
                                            </p>
                                            <p>
                                                - Try to post some questions and let other users learn through discussion
                                            </p>
                                            <p>
                                                - It's not that hard to become a teacher!
                                            </p>
                                        </Item.Meta>
                                    </Item.Content>
                                </Item.Group>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>



                <div className={"info_container1"}>
                    <Segment>
                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>                            </Grid.Column>
                            <Grid.Column center>
                                <List bulleted>
                                    <List.Item>
                                        <p>
                                            Users can access the courses the added
                                        </p>
                                    </List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>

                        <Divider vertical>DashBoard</Divider>
                    </Segment>
                </div>

                <div className={"info_container1"}>
                    <Segment>
                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                            </Grid.Column>
                            <Grid.Column center>
                                <List bulleted>
                                    <List.Item>
                                        <p>
                                            Talk here!
                                        </p>
                                    </List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>

                        <Divider vertical>Billboard</Divider>
                    </Segment>
                </div>

                <div className={"info_container1"}>
                    <Segment>
                        <Grid columns={2} relaxed='very'>
                            <Grid.Column>
                                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>
                            </Grid.Column>
                            <Grid.Column center>
                                <List bulleted>
                                    <List.Item>
                                        <p>
                                            rank here
                                        </p>
                                    </List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                    <List.Item></List.Item>
                                </List>
                            </Grid.Column>
                        </Grid>

                        <Divider vertical>RankPage</Divider>
                    </Segment>

                </div>



            </div>
        );
    }
}

export default Home;
