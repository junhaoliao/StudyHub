import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {Button, Icon, Menu, Segment, Table} from 'semantic-ui-react'
import {Link} from "react-router-dom";

/* Component for the CSC309A_resources page */
class CSC309A_resources extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <div className={"resources_header"}>
                    <Button href={"/CSC309A"} icon labelPosition={"left"}>
                        <Icon name={"left arrow"}/>
                        Go Back
                    </Button>
                    <header className={"resources_header_text"}>CSC309A Resources</header>
                </div>
                <Segment placeholder>
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
                                    <Link to={"/*"}>How to learn CSC309 well.docx</Link>
                                </Table.Cell>
                                <Table.Cell>3.09 MB</Table.Cell>
                                <Table.Cell>February 27, 2020</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>The best plan is no plan.txt</Table.Cell>
                                <Table.Cell>0 KB</Table.Cell>
                                <Table.Cell>February 27, 2020</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
                                <Table.Cell>Cell</Table.Cell>
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
                </Segment>


            </div>
        );
    }
}

export default CSC309A_resources;
