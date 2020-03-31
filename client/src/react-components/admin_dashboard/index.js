import React from "react";
import { AdminNavBar } from "../admin_navbar/index";
import { AlterWindow } from "../AlterWindow/index";
import { readCookie, getUserAccess, removeUser } from "../../actions/Admin";
import { ProfileAdmin } from "../Profile/admin";
import { Button, Confirm } from "semantic-ui-react";
export class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      explore: false,
      open: false
    };
    readCookie(this);
  }

  render() {
    console.log("Admin state:");
    console.log(this.state.allUsers);
    return (
      <div>
        <AdminNavBar />
        {this.state.explore ? (
          <ProfileAdmin
            back={() => {
              this.setState({ explore: false });
              readCookie(this);
            }}
          ></ProfileAdmin>
        ) : (
          <table class="ui celled padded table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.allUsers.map(user => (
                <tr>
                  <td>
                    <button className="ui yellow button">
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
                        this.setState({ open: true });
                      }}
                    >
                      Remove
                    </Button>
                    <Confirm
                      open={this.state.open}
                      content={
                        "Please Confirm to Removew User: " + user.username
                      }
                      cancelButton="Cancel"
                      confirmButton="Confirm"
                      onCancel={() => {
                        this.setState({ open: false });
                        console.log("cancel clicked");
                      }}
                      onConfirm={() => removeUser(user._id, this)}
                    ></Confirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
