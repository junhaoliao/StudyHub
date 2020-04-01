import React from "react";
import {Button, Menu} from "semantic-ui-react";
import "./styles.css";
import {logout} from "../../actions/NavBar";

/* Component for the NavBar */
class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "dash_board",
            course: ""
        };
    }

  // handleItemClick = (e, { name }) => {
  //
  //     this.setState({ activeItem: name });
  // };

  componentDidMount() {
    const currentPage = window.location.pathname.substr(1);
    switch (currentPage) {
      case "dash_board": {
        this.setState({ activeItem: "dash_board" });
          break;
      }
        case "bill_board": {
            this.setState({activeItem: "bill_board"});
            break;
        }
        case "ranking": {
            this.setState({activeItem: "ranking"});
            break;
        }
        case "favourites": {
            this.setState({activeItem: "favourites"});
            break;
        }
        case "profile": {
            this.setState({activeItem: "profile"});
            break;
        }
        default:
            this.setState({activeItem: "course"});
            this.setState({course: currentPage});
    }
  }

  render() {
    const { activeItem, course } = this.state;
    return (
      <Menu inverted stackable>
        <Menu.Item className={"navbar_header"}>StudyHub</Menu.Item>
        {activeItem === "course" && (
          <Menu.Item
            name={course}
            active={activeItem === "course"}
            color={"blue"}
          />
        )}
        <Menu.Item
          name="DashBoard"
          href={"/dash_board"}
          active={activeItem === "dash_board"}
          color={"blue"}
        />
        <Menu.Item
            name="BillBoard"
            href={"/bill_board"}
            active={activeItem === "bill_board"}
            color={"blue"}
        />
          <Menu.Item
              name="Ranking"
              href={"/ranking"}
              active={activeItem === "ranking"}
              //onClick={this.handleItemClick}
              color={"blue"}
          />

          <Menu.Item
              name="Favourites"
              href={"/favourites"}
              active={activeItem === "favourites"}
              //onClick={this.handleItemClick}
              color={"blue"}
              position="right"
          />
          <Menu.Item
              name="profile"
              href={"/profile"}
              active={activeItem === "profile"}
              color={"blue"}
          />

          <Menu.Item>
              <Button href={"/"} onClick={() => logout()} inverted color={"blue"}>
                  Logout
              </Button>
          </Menu.Item>
      </Menu>
      // <Navbar bg="primary">
      //     <Navbar.Brand className="text-white" href="/">StudyHub</Navbar.Brand>
      //     <Navbar.Collapse>
      //         <Nav className="mr-auto">
      //             <Nav.Link className="text-white" href="/dash_board">DashBoard</Nav.Link>
      //             <NavDropdown title={<span className="text-white">Courses</span>}>
      //                 <NavDropdown.Item href="/CSC309A">CSC309A</NavDropdown.Item>
      //                 <NavDropdown.Item href="/ECE361">ECE361</NavDropdown.Item>
      //                 <NavDropdown.Item href="/CSC343">CSC343</NavDropdown.Item>
      //                 <NavDropdown.Item href="/CSC309B">CSC309B</NavDropdown.Item>
      //             </NavDropdown>
      //         </Nav>
      //         <Button variant="success">Login</Button>
      //     </Navbar.Collapse>
      // </Navbar>
    );
  }
}

export default NavBar;
