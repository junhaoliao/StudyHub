import React from "react";

import "./styles.css";

import {SignupBox} from "../SignupBox";
import {LoginBox} from "../LoginBox";
import {Button, Grid, Item, Menu, Segment} from "semantic-ui-react";
import List from "semantic-ui-react/dist/commonjs/elements/List";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";


/* Component for the Home page */
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sign_up: false
        };
    }

    componentDidMount() {
        document.title = "StudyHub";
    }

    state = {activeItem: 'dashboard'}

    handleItemClick = (e, {name}) => this.setState({activeItem: name})

    render() {
        const {activeItem} = this.state;

        return (
            <div className={"home_page_container"}>
                <div className="ui attached message">
                    <h2 className="ui blue center aligned icon header">
                        <i className=" circular users icon"/>
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


                <div className={"info_container1"}>
                    <Segment>
                        <Menu attached='top' tabular>
                            <Menu.Item
                                name='DashBoard'
                                active={activeItem === 'dashboard'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='BillBoard'
                                active={activeItem === 'billboard'}
                                onClick={this.handleItemClick}
                            />
                            <Menu.Item
                                name='Rankings'
                                active={activeItem === 'rankpage'}
                                onClick={this.handleItemClick}
                            />
                        </Menu>

                        {(this.state.activeItem === "DashBoard") ? (
                            // introduction to the DashBoard
                            <Segment attached='bottom'>
                                <List>
                                    <div className={"fontsize"}>
                                        <List.Item>
                                            <Icon name='book' size='small'/> You can add or join a course here.
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='clipboard' size='small'/> All the courses you are teaching or
                                            taking will be listed.
                                        </List.Item>
                                        <List.Item>
                                            <Icon name='hand point up' size='small'/> Click "Enter" on the course to see
                                            announcement and upload files.
                                        </List.Item>
                                    </div>
                                </List>
                            </Segment>
                        ) : (
                            // introduction of BillBoard
                            (this.state.activeItem === "BillBoard") ? (
                                <Segment attached='bottom'>
                                    <List>
                                        <div className={"fontsize"}>
                                            <List.Item>
                                                <Icon name='comment alternate' size='small'/> You can chat will other
                                                users here.
                                            </List.Item>
                                            <List.Item>
                                                <Icon name='file alternate' size='small'/> Up to 50 most recent messages
                                                will be kept here.
                                            </List.Item>
                                            <List.Item>
                                                <Icon name='question' size='small'/> Post the question to ask for help
                                                from other users when you are stuck!
                                            </List.Item>
                                        </div>
                                    </List>
                                </Segment>
                            ) : (
                                // introduction of RankPage
                                (this.state.activeItem === "Rankings") ? (
                                    <Segment attached='bottom'>
                                        <List>
                                            <div className={"fontsize"}>
                                                <List.Item>
                                                    <Icon name='chart bar outline' size='small'/> You can see all the
                                                    courses from the website by ranking.
                                                </List.Item>
                                                <List.Item>
                                                    <Icon name='thumbs up' size='small'/> Hit the like bottom on a
                                                    course to boost its rank!
                                                </List.Item>
                                                <List.Item>
                                                    <Icon name='sort amount down' size='small'/> Let other users know
                                                    which course is on top hits on the website!
                                                </List.Item>
                                            </div>
                                        </List>
                                    </Segment>
                                ) : (
                                    // default of introduction to our website
                                    <Segment attached='bottom'>
                                        <List>
                                            <div className={"fontsize"}>
                                                <List.Item>
                                                    <Icon name='mouse pointer' size='small'/> Click to know more about
                                                    our website!
                                                </List.Item>
                                                <List.Item>
                                                    <Icon name='add user' size='small'/> Sign up within a minute to
                                                    become a user!
                                                </List.Item>
                                                <List.Item>
                                                    <Icon name='check' size='small'/> Study will never be so easy like
                                                    this!
                                                </List.Item>
                                            </div>

                                        </List>
                                    </Segment>
                                )

                            )
                        )}
                    </Segment>

                </div>


                <div className={"info_container"}>
                    <Grid stackable columns={2}>

                        <Grid.Column>
                            <Segment>
                                <div className={"user_type_icon_container"}><Icon name='user'
                                                                                  size='huge'/></div>
                                <div className={"user_description_container"}>
                                    <Item.Group>
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>Become a User!</Item.Header>
                                                <Item.Meta>
                                                    <List bulleted>
                                                        <List.Item>
                                                            Sign up as a user can join any class to learn different
                                                            courses.
                                                        </List.Item>
                                                        <List.Item>
                                                            You can download or upload any file you want and discuss
                                                            with other users in the chat room.
                                                        </List.Item>
                                                        <List.Item>
                                                            Feel free to like a course if you like the Instructor.
                                                        </List.Item>
                                                        <List.Item>
                                                            Favourite a file so that you can access it later in your
                                                            own profile page.
                                                        </List.Item>
                                                        <List.Item>
                                                            Learning will become easier since joining the StudyHub!
                                                        </List.Item>
                                                    </List>
                                                </Item.Meta>
                                            </Item.Content>
                                        </Item>
                                    </Item.Group>
                                </div>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column>
                            <Segment>
                                <div className={"user_type_icon_container"}><Icon name='user secret'
                                                                                  size='huge'/></div>
                                <div className={"user_description_container"}>
                                    <Item.Group>
                                        <Item>
                                            <Item.Content>
                                                <Item.Header>Become an Instructor!</Item.Header>
                                                <Item.Meta>
                                                    <List bulleted verticalAlign={"middle"}>
                                                        <List.Item>
                                                            Any regular user signed in the StudyHub can create a new
                                                            course by
                                                            himself/herself.
                                                        </List.Item>
                                                        <List.Item>
                                                            Create your own course page and you are all set!
                                                        </List.Item>
                                                        <List.Item>
                                                            Start uploading some useful course related files and
                                                            posting some
                                                            announcements.
                                                        </List.Item>
                                                        <List.Item>
                                                            Try to post some questions and let other users learn
                                                            through discussion.
                                                        </List.Item>
                                                        <List.Item>
                                                            It's not that hard to become a teacher!
                                                        </List.Item>
                                                    </List>
                                                </Item.Meta>
                                            </Item.Content>
                                        </Item>

                                    </Item.Group>
                                </div>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </div>


                {/*<div className={"info_container1"}>*/}
                {/*    <Segment>*/}
                {/*        <Grid columns={2} relaxed='very'>*/}
                {/*            <Grid.Column>*/}
                {/*                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>                            </Grid.Column>*/}
                {/*            <Grid.Column center>*/}
                {/*                <List bulleted>*/}
                {/*                    <List.Item>*/}
                {/*                        <p>*/}
                {/*                            Users can access the courses the added*/}
                {/*                        </p>*/}
                {/*                    </List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                </List>*/}
                {/*            </Grid.Column>*/}
                {/*        </Grid>*/}

                {/*        <Divider vertical>DashBoard</Divider>*/}
                {/*    </Segment>*/}
                {/*</div>*/}

                {/*<div className={"info_container1"}>*/}
                {/*    <Segment>*/}
                {/*        <Grid columns={2} relaxed='very'>*/}
                {/*            <Grid.Column>*/}
                {/*                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>*/}
                {/*            </Grid.Column>*/}
                {/*            <Grid.Column center>*/}
                {/*                <List bulleted>*/}
                {/*                    <List.Item>*/}
                {/*                        <p>*/}
                {/*                            Talk here!*/}
                {/*                        </p>*/}
                {/*                    </List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                </List>*/}
                {/*            </Grid.Column>*/}
                {/*        </Grid>*/}

                {/*        <Divider vertical>Billboard</Divider>*/}
                {/*    </Segment>*/}
                {/*</div>*/}

                {/*<div className={"info_container1"}>*/}
                {/*    <Segment>*/}
                {/*        <Grid columns={2} relaxed='very'>*/}
                {/*            <Grid.Column>*/}
                {/*                <Image size="large" src='https://react.semantic-ui.com/images/wireframe/image.png'/>*/}
                {/*            </Grid.Column>*/}
                {/*            <Grid.Column center>*/}
                {/*                <List bulleted>*/}
                {/*                    <List.Item>*/}
                {/*                        <p>*/}
                {/*                            rank here*/}
                {/*                        </p>*/}
                {/*                    </List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                    <List.Item></List.Item>*/}
                {/*                </List>*/}
                {/*            </Grid.Column>*/}
                {/*        </Grid>*/}

                {/*        <Divider vertical>RankPage</Divider>*/}
                {/*    </Segment>*/}

                {/*</div>*/}


            </div>
        );
    }
}

export default Home;
