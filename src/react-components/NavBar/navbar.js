import React from "react";

import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


/* Component for the NavBar */
class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="primary">
                <Navbar.Brand className="text-white" href="/">StudyHub</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link className="text-white" href="/dash_board">DashBoard</Nav.Link>
                        <NavDropdown title={<span className="text-white">Courses</span>}>
                            <NavDropdown.Item href="/CSC309A">CSC309A</NavDropdown.Item>
                            <NavDropdown.Item href="/ECE361">ECE361</NavDropdown.Item>
                            <NavDropdown.Item href="/CSC343">CSC343</NavDropdown.Item>
                            <NavDropdown.Item href="/CSC309B">CSC309B</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button variant="success">Login</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;