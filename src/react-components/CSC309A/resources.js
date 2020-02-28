import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {Button, Card, Grid, Icon, Image, Menu, Segment, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom";


const course_resources = [
    {
        name: "How to learn CSC309 well.docx",
        link: "/*",
        type: "docx",
        size: "3.09 MB",
        date: "February 28, 2020",
        description: "I am a description",
        faved: false
    },
    {
        name: "The best plan is no plan.txt",
        link: "/*",
        type: "txt",
        size: "0 KB",
        date: "February 28, 2020",
        description: "I am a description",
        faved: true
    },
    {
        name: "I don't really have those files.pdf",
        link: "/*",
        type: "pdf",
        size: "0 KB",
        date: "February 28, 2020",
        description: "I am a description",
        faved: true
    }
];

/* Component for the CSC309A_resources page */
class CSC309A_resources extends React.Component {
    display_items_element = "";

    constructor(props) {
        super(props);
        this.state = {
            display_style: "list"
        };

    }

    componentDidMount() {
        document.title = "CSC309A Resources";
    }

    plot_resource_list(resource) {
        return (
            <Table.Row>
                <Table.Cell>
                    <Grid>
                        <Grid.Column width={1}>
                            <Button icon={resource.faved ? "star" : "star outline"}/>
                        </Grid.Column>
                        <Grid.Column width={9} className={"resource_file_names"}>
                            <Link to={resource.link}>{resource.name}</Link>
                        </Grid.Column>
                    </Grid>
                </Table.Cell>
                <Table.Cell>{resource.size}</Table.Cell>
                <Table.Cell>{resource.date}</Table.Cell>
            </Table.Row>
        );
    }

    plot_resource_icon(resource) {
        return (
            <Card>
                <Image size="medium" src={"/file_icons/" + resource.type + ".svg"}/>
                <Card.Content>
                    <Card.Header>{resource.name}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{resource.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {resource.description}
                    </Card.Description>
                    <a href={resource.link}>
                        <Icon name='download'/>
                        Download
                    </a>
                </Card.Content>
            </Card>
        );
    }

    display_items() {
        if (this.state.display_style === "list") {
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
                        {course_resources.map(resource => this.plot_resource_list(resource))}
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
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    Now showing files in Icon Mode
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Card.Group itemsPerRow={5}>
                            {course_resources.map(resource => this.plot_resource_icon(resource))}
                        </Card.Group>

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
        }

    }

    set_display_style = (e, {name}) => {
        // console.log(this.state)
        this.setState({display_style: name});
        console.log(this.state);
        this.display_items();
    };

    render() {
        this.display_items();
        return (
            <div>
                <NavBar/>
                <Menu>

                    <Menu.Item href="/CSC309A" as='a' icon>
                        <Icon name={"left arrow"}/>
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
