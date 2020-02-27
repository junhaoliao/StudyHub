import React from "react";

import "./styles.css";

import NavBar from "../NavBar/navbar";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


/* Component for the add_course page */
class add_course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            add_course_name_field: "",
            add_course_admin_field: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = event => {
        alert(this.state.add_course_name_field + ":" + this.state.add_course_admin_field);
    };

    render() {
        return (
            <div>
                <NavBar/>
                <div align="center">
                    <div className={"add_class_area"}>
                        <Form>
                            <Form.Group controlId="">
                                <Form.Label>Class Name</Form.Label>
                                <Form.Control onChange={this.handleChange} name="add_course_name_field" size="lg"
                                              placeholder="Enter class name"/>
                                <Form.Text className="text-muted">
                                    Please ensure you have a unique class name.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="">
                                <Form.Label>Class Admin(Temporary) </Form.Label>
                                <Form.Control onChange={this.handleChange} name="add_course_admin_field" size="lg"
                                              placeholder="Class Admin(Temporary)"/>
                            </Form.Group>
                            <Button onClick={this.handleSubmit} size="lg" variant="primary" type="submit">
                                Add Class
                            </Button>
                        </Form>
                    </div>
                </div>

            </div>
        );
    }
}

export default add_course;
