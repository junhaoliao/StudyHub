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

    componentDidMount() {
        const currentPage = window.location.pathname.substr(1);
        switch (currentPage) {
            case "dash_board": {
                this.setState({activeItem: "dash_board"});
                break;
            }
            case "bill_board": {
                this.setState({activeItem: "bill_board"});
                break;
            }
            case "rankings": {
                this.setState({activeItem: "rankings"});
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
        const {activeItem, course} = this.state;
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
                    name="Rankings"
                    href={"/rankings"}
                    active={activeItem === "rankings"}
                    color={"blue"}
                />

                <Menu.Item
                    name="Favourites"
                    href={"/favourites"}
                    active={activeItem === "favourites"}
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
        );
    }
}

export default NavBar;
