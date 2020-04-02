import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {Button, Header, Segment, Table} from 'semantic-ui-react'


import {readCookie} from "../../actions/RegularUser";
import {getFavourites, unfavourFileOnFavouritesPage} from "../../actions/resource";

/* Component for the Favourites page */
export class Favourites extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserID: {},
            filesFavoured: []
        };
        readCookie(this);
        getFavourites(this);
    }

    componentDidMount() {
        document.title = "Favourites";
    }

    plot_resource_list(resourceList) {
        return (
            <Table.Body>
                {resourceList.map((resource) => (
                    <Table.Row>
                        <Table.Cell>
                            <a href={resource.link}>{resource.name}</a>
                        </Table.Cell>
                        <Table.Cell>{resource.size}</Table.Cell>
                        <Table.Cell>{resource.date}</Table.Cell>
                        <Table.Cell>
                            <Button app={this} file_id={resource.file_id} onClick={unfavourFileOnFavouritesPage}
                                    icon={"star"}
                                    color={"twitter"}/>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        );
    }


    render() {
        const {filesFavoured} = this.state;
        return (
            <div>
                <NavBar/>
                <div className={"resources_header_container"}>
                    Favourites
                </div>
                <div className={"favourites_container"}>
                    {filesFavoured.length !== 0 ? (filesFavoured.map(course => (
                        <Segment>
                            <Header>{course.courseName}</Header>
                            <Table celled fixed>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>File</Table.HeaderCell>
                                        <Table.HeaderCell>Size</Table.HeaderCell>
                                        <Table.HeaderCell>Date Uploaded</Table.HeaderCell>
                                        <Table.HeaderCell>Operations</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {this.plot_resource_list(course.files)}
                            </Table>
                        </Segment>
                    ))) : <Header>Seems you haven't added any resources to your Favourites.</Header>}
                </div>
            </div>
        );
    }
}