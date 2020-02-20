import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

/* Component for the Home page */
class CSC309A extends React.Component {
    alertClicked() {
        alert('You clicked the third ListGroupItem');
    }

    render() {
        return (
            <div>
                <NavBar/>
                <div className={"course_name_container"}>
                    <header className={"course_name"}>CSC309A</header>
                </div>

                <div className={"course_main_container d-flex"}>
                    <Container className={"chat_room_container"}>
                        <Form>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Control className={"chat_room"} as={"textarea"}
                                              defaultValue="Kevin: Welcome to the new class" rows="16"/>
                            </Form.Group>
                        </Form>
                        <InputGroup className={"chat_room_message_bar"}>
                            <FormControl
                                placeholder="Type Your Message Here"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">
                                    <span role={"img"} aria-label="emoji">😀</span>
                                </Button>
                                <Button variant="outline-secondary">Send</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Container>
                    <div>
                        <Button className={"resource_button"}>
                            Resources
                        </Button>
                        <header className={"announcement_header"}>
                            Announcements
                        </header>
                        <div className={"announcements"}>
                            <Accordion defaultActiveKey="0">
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                            Announcement 1
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>Hello! I'm the body</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                            Announcement 2
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="1">
                                        <Card.Body>Hello! I'm another body</Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default CSC309A;
