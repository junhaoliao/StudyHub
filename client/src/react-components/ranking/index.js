import React from "react";
import "./styles.css";


import NavBar from "../NavBar/navbar";

import {Button, Header, Icon, Menu, Table} from "semantic-ui-react";


/* Component for the Ranking page */
export class Ranking extends React.Component {

    render() {
        return (
            <div>
                <NavBar/>

                <div className={"courses_container"}>

                    <Menu secondary>
                        <Menu.Item
                            name='Ranking'
                            className={"ranking_header"}
                        />
                        <Button size="small" color="green" position={"right"}>
                            <Icon name="reload"/>
                            Reload
                        </Button>
                        <Table celled padded>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell singleLine>Course Name</Table.HeaderCell>
                                    <Table.HeaderCell>Admin</Table.HeaderCell>
                                    <Table.HeaderCell>Likes</Table.HeaderCell>
                                    <Table.HeaderCell>His/Her course you may like</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h2' textAlign='center'>
                                            CSC309A
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell singleLine>Kevin</Table.Cell>
                                    <Table.Cell>
                                        ❤️ 1234
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        NULL
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h2' textAlign='center'>
                                            ECE361
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell singleLine>Junhao</Table.Cell>
                                    <Table.Cell>
                                        ❤️ 123
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        NULL
                                    </Table.Cell>

                                </Table.Row>

                                <Table.Row>
                                    <Table.Cell>
                                        <Header as='h2' textAlign='center'>
                                            CSC343
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell singleLine>Kruzer</Table.Cell>
                                    <Table.Cell>
                                        ❤️ 12
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        NULL
                                    </Table.Cell>
                                </Table.Row>


                            </Table.Body>
                        </Table>
                    </Menu>

                </div>

            </div>
        );
    }


}






