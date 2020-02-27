import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {Button, Card, Grid, Icon, Image, Menu, Segment, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom";

/* Component for the CSC309A_resources page */
class CSC309A_resources extends React.Component {
    display_items_element = "";

    constructor(props) {
        super(props);
        this.state = {
            display_style: "list"
        };

    }

    display_items() {
        if (this.state.display_style == "list") {
            this.display_items_element = <Segment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>File</Table.HeaderCell>
                            <Table.HeaderCell>Size</Table.HeaderCell>
                            <Table.HeaderCell>Date Uploaded</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Grid>
                                    <Grid.Column width={1}>
                                        <Button icon='world'/>
                                    </Grid.Column>
                                    <Grid.Column width={9} className={"resource_file_names"}>
                                        <Link to={"/*"}>How to learn CSC309 well.docx</Link>
                                    </Grid.Column>

                                </Grid>

                            </Table.Cell>
                            <Table.Cell>3.09 MB</Table.Cell>
                            <Table.Cell>February 27, 2020</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Grid>
                                    <Grid.Column width={1}>
                                        <Button icon='world'/>
                                    </Grid.Column>
                                    <Grid.Column width={9} className={"resource_file_names"}>
                                        <Link to={"/*"}>The best plan is no plan.txt</Link>
                                    </Grid.Column>
                                </Grid>
                            </Table.Cell>
                            <Table.Cell>0 KB</Table.Cell>
                            <Table.Cell>February 27, 2020</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Grid>
                                    <Grid.Column width={1}>
                                        <Button icon='world'/>
                                    </Grid.Column>
                                    <Grid.Column width={9} className={"resource_file_names"}>
                                        <Link to={"/*"}>The best plan is no plan.txt</Link>
                                    </Grid.Column>
                                </Grid>
                            </Table.Cell>
                            <Table.Cell>0 KB</Table.Cell>
                            <Table.Cell>February 27, 2020</Table.Cell>
                        </Table.Row>
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='3'>
                                <Menu floated='right' pagination>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron left'/>
                                    </Menu.Item>
                                    <Menu.Item as='a'>1</Menu.Item>
                                    <Menu.Item as='a'>2</Menu.Item>
                                    <Menu.Item as='a'>3</Menu.Item>
                                    <Menu.Item as='a'>4</Menu.Item>
                                    <Menu.Item as='a' icon>
                                        <Icon name='chevron right'/>
                                    </Menu.Item>
                                </Menu>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </Segment>;
        } else {
            this.display_items_element =
                <Segment>
                    <Card.Group itemsPerRow={5}>
                        <Card>
                            <Image src='/*' wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>How to learn CSC309 well.docx</Card.Header>
                                <Card.Meta>
                                    <span className='date'>February 27, 2020</span>
                                </Card.Meta>
                                <Card.Description>
                                    Any file description comes under here
                                </Card.Description>
                                <a href={"/*"}>
                                    <Icon name='download'/>
                                    Download
                                </a>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src='/*' wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>The best plan is no plan.txt</Card.Header>
                                <Card.Meta>
                                    <span className='date'>February 27, 2020</span>
                                </Card.Meta>
                                <Card.Description>
                                    Any file description comes under here
                                </Card.Description>
                                <a href={"/*"}>
                                    <Icon name='download'/>
                                    Download
                                </a>
                            </Card.Content>
                        </Card>
                        <Card>
                            <Image src='/*' wrapped ui={false}/>
                            <Card.Content>
                                <Card.Header>The best plan is no plan.txt</Card.Header>
                                <Card.Meta>
                                    <span className='date'>February 27, 2020</span>
                                </Card.Meta>
                                <Card.Description>
                                    Any file description comes under here
                                </Card.Description>
                                <a href={"/*"}>
                                    <Icon name='download'/>
                                    Download
                                </a>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                    <Menu floated='right' pagination>
                        <Menu.Item as='a' icon>
                            <Icon name='chevron left'/>
                        </Menu.Item>
                        <Menu.Item as='a'>1</Menu.Item>
                        <Menu.Item as='a'>2</Menu.Item>
                        <Menu.Item as='a'>3</Menu.Item>
                        <Menu.Item as='a'>4</Menu.Item>
                        <Menu.Item as='a' icon>
                            <Icon name='chevron right'/>
                        </Menu.Item>
                    </Menu>
                </Segment>;
        }

    }

    set_display_style = (e) => {
        // console.log(this.state)
        this.setState({display_style: e.target.name});
        console.log(this.state);
        this.display_items();
    };

    render() {
        this.display_items();
        return (
            <div>
                <NavBar/>
                <Menu>
                    <Menu.Item>
                        <Menu.Item href="/CSC309A" as='a' icon>
                            <Icon name={"left arrow"}/>
                        </Menu.Item>
                    </Menu.Item>
                    <Menu.Item header className={"resources_header_text"}>CSC309A Resources</Menu.Item>
                    <Menu.Item as='a' icon position='right' name={"list"} onClick={this.set_display_style}>
                        <Icon name={'list'}/>
                    </Menu.Item>
                    <Menu.Item as='a' icon name={"icon"} onClick={this.set_display_style}>
                        <Icon name={'th'}/>
                    </Menu.Item>
                </Menu>
                {this.display_items_element}
            </div>
        );
    }
}

export default CSC309A_resources;
