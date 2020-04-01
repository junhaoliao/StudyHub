import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {UploadModule} from "./UploadModule";
import {Button, Card, Icon, Image, Menu, Popup, Segment, Table} from 'semantic-ui-react'
import {uid} from "react-uid";


import {readCookie} from "../../actions/RegularUser";
import {favourFileHandler, getResources, removeFileHandler} from "../../actions/resource";

/* Component for the Resources page */
export class Resources extends React.Component {
    display_items_element = "";

    constructor(props) {
        console.log("constructing resources page");
        super(props);
        const {match: {params}} = this.props;

        this.state = {
            currentUserID: {},
            admin: {},
            courseName: params.courseName,
            resources: [],
            display_style: "list"
        };
        readCookie(this);
        getResources(this);
    }

    componentDidMount() {
        const {courseName} = this.state;
        document.title = `${courseName} Resources`;
    }

    plot_resource_list(resource) {
        const {currentUserID, admin} = this.state;
        const isAdmin = (currentUserID === admin);
        return (
            <Table.Row key={uid(resource)}>
                <Table.Cell>
                    <a href={resource.link}>{resource.name}</a>
                </Table.Cell>
                <Table.Cell>{resource.size}</Table.Cell>
                <Table.Cell>{resource.date}</Table.Cell>
                <Table.Cell>
                    <Button app={this} file_id={resource.file_id} onClick={favourFileHandler}
                            icon={resource.favoured ? "star" : "star outline"}
                            color={resource.favoured ? "twitter" : null}/>
                    {isAdmin ?
                        <Button icon={"remove circle"} app={this} file_id={resource.file_id}
                                onClick={removeFileHandler}/>
                        : null}
                </Table.Cell>
            </Table.Row>
        );
    }

    plot_resource_icon(resource) {
        return (
            <Card key={uid(resource)}>
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
        const {resources, display_style, currentUserID, admin} = this.state;
        const isAdmin = (currentUserID === admin);
        if (display_style === "list") {
            this.display_items_element = <Segment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>File</Table.HeaderCell>
                            <Table.HeaderCell>Size</Table.HeaderCell>
                            <Table.HeaderCell>Date Uploaded</Table.HeaderCell>
                            <Table.HeaderCell>Operations</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {resources.map(resource => this.plot_resource_list(resource))}
                    </Table.Body>

                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='4'>
                                <Button color='teal' circular icon={"refresh"} as={"a"} href={""}/>
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
                            {resources.map(resource => this.plot_resource_icon(resource))}
                        </Card.Group>

                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Button color='teal' circular icon={"refresh"} as={"a"} href={""}/>
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
        const {courseName, currentUserID, admin, display_style} = this.state;
        const isAdmin = currentUserID === admin;
        this.display_items();
        return (
            <div>
                <NavBar/>
                <Menu tabular>

                    <Menu.Item href={`/courses/${courseName}`} as='a' icon>
                        <Icon name={"left arrow"}/>
                    </Menu.Item>

                    <Menu.Item header className={"resources_header_text"}>{`${courseName} Resources`}</Menu.Item>
                    <Menu.Item active={display_style === 'list'} as='a' position='right' icon name={"list"}
                               onClick={this.set_display_style}>
                        <Icon name={'list'}/>
                    </Menu.Item>
                    <Menu.Item active={display_style === 'icon'} as='a' icon name={"icon"}
                               onClick={this.set_display_style}>
                        <Icon name={'th'}/>
                    </Menu.Item>
                    <Menu.Item as='a' icon>
                        <Popup
                            on='click'
                            disabled={!isAdmin}
                            pinned
                            trigger={<Button color={"yellow"} disabled={!isAdmin} icon={'upload'}
                                             content={isAdmin ? "Upload" : "Only Course Admin can upload"}/>}>
                            <UploadModule courseName={courseName}/>
                        </Popup>
                    </Menu.Item>
                </Menu>
                {this.display_items_element}
            </div>
        );
    }
}