import React from "react";

import { AdminNavBar } from "../admin_navbar/index";
import { getUserAccess, readCookie, removeUser } from "../../actions/Admin";
import { ProfileAdmin } from "../Profile/admin";
import { Button, Confirm } from "semantic-ui-react";

export class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      allUsers: [],
      explore: false,
      open: false,
      userToBeRemoved: {},
    };
    readCookie(this);
  }

  list_all_users() {
    const { allUsers, userToBeRemoved } = this.state;
    const result = [];
    {
      allUsers.map((user) => {
        console.log(user);
        result.push(
          <tr>
            <td>
              <button
                className="ui yellow button"
                onClick={() => getUserAccess(user, this)}
              >
                {user.username}
              </button>
            </td>
            <td>
              <button
                className="ui yellow button"
                onClick={() => getUserAccess(user, this)}
              >
                Explore
              </button>
              <Button
                className="ui black button"
                onClick={() => {
                  this.setState({
                    open: true,
                    userToBeRemoved: user,
                  });
                  console.log(user.username);
                }}
              >
                Remove
              </Button>
            </td>
          </tr>
        );
      });
    }

    return result;
  }

  render() {
    const { allUsers, userToBeRemoved } = this.state;
    console.log("Admin state:");
    console.log(allUsers);
    console.log(this.state.login);
    if (this.state.login) {
      return (
        <div>
          <AdminNavBar />
          {this.state.explore ? (
            <ProfileAdmin
              back={() => {
                this.setState({ login: true }, () => {
                  readCookie(this);
                  this.setState({ explore: false });
                  window.location.reload(true);
                });
              }}
            />
          ) : (
            <table class="ui celled padded table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{this.list_all_users()}</tbody>
            </table>
          )}
          <Confirm
            open={this.state.open}
            content={`Please Confirm to Remove User: ${userToBeRemoved.username}`}
            cancelButton="Cancel"
            confirmButton="Confirm"
            onCancel={() => {
              this.setState({ open: false });
              console.log("cancel clicked");
            }}
            onConfirm={() => removeUser(userToBeRemoved._id, this)}
          />
        </div>
      );
    } else {
      return <div>Unauthorized to Admin Page</div>;
    }
  }
}
