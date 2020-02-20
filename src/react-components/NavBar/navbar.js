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
                <Navbar.Brand className="text-white" href="#home">StudyHub</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link className="text-white" href="dash_board">DashBoard</Nav.Link>
                        <NavDropdown title={<span className="text-white">Courses</span>}>
                            <NavDropdown.Item href="#action/3.1">CSC309</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">CSC343</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">CSC361</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Button variant="success">Login</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;