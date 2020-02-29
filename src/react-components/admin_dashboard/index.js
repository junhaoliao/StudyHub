import React from "react";
import { AdminNavBar } from "../admin_navbar/index";
import { AdminUsercard } from "../admin_usercard/index";
export class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar></AdminNavBar>

        <table class="ui celled padded table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Courses Taking</th>
              <th>Courses Teaching</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <button className="ui yellow button">Kevin</button>
              </td>
              <td>
                <button className="ui black button">CSC309B</button>
                <button className="ui black button">CSC343</button>
                <button className="ui black button">ECE361</button>
              </td>
              <td>
                <button className="ui black button">CSC309A</button>
              </td>
              <td>
                <div className="ui two buttons">
                  <button className="ui  yellow  button">Explore</button>
                  <button className="ui  black  button">Remove</button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Junhao</button>
              </td>
              <td>
                <button className="ui black button">CSC309A</button>
                <button className="ui black button">CSC343</button>
                <button className="ui black button">CSC309B</button>
              </td>
              <td>
                <button className="ui black button">ECE361</button>
              </td>
              <td>
                <div className="ui two buttons">
                  <button className="ui  yellow  button">Explore</button>
                  <button className="ui  black  button">Remove</button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Kruzer</button>
              </td>
              <td>
                <button className="ui black button">CSC309B</button>
                <button className="ui black button">CSC309A</button>
                <button className="ui black button">ECE361</button>
              </td>
              <td>
                <button className="ui black button">CSC343</button>
              </td>
              <td>
                <div className="ui two buttons">
                  <button className="ui  yellow  button">Explore</button>
                  <button className="ui  black  button">Remove</button>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Ashley</button>
              </td>
              <td>
                <button className="ui black button">CSC309A</button>
                <button className="ui black button">CSC343</button>
                <button className="ui black button">ECE361</button>
              </td>
              <td>
                <button className="ui black button">CSC309B</button>
              </td>
              <td>
                <div className="ui two buttons">
                  <button className="ui  yellow  button">Explore</button>
                  <button className="ui  black  button">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <th colspan="5">
                <div className="ui right floated pagination menu">
                  <a className="icon item">
                    <i className="left chevron icon"></i>
                  </a>
                  <a className="item">1</a>
                  <a className="item">2</a>
                  <a className="item">3</a>
                  <a className="item">4</a>
                  <a className="icon item">
                    <i className="right chevron icon"></i>
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}
