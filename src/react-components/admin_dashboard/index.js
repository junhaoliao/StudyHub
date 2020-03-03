import React from "react";
import { AdminNavBar } from "../admin_navbar/index";
import { AlterWindow } from "../AlterWindow/index";
export class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar />

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
                <a className="ui black button" href="/a*">
                  CSC309B
                </a>
                <a className="ui black button" href="/a*">
                  CSC343
                </a>
                <a className="ui black button" href="/a*">
                  ECE361
                </a>
              </td>
              <td>
                <a className="ui black button" href="/CSC309A">
                  CSC309A
                </a>
              </td>
              <td>
                <div className="ui two buttons">
                  <div>
                    <button className="ui  yellow  button">Explore</button>{" "}
                  </div>
                  <AlterWindow
                    className="ui black button"
                    buttonName="Remove"
                    content="Confirmation to Remove the Student"
                    cancelButtonContent="Cancel"
                    confirmButtonContent="Confirm"
                  ></AlterWindow>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Junhao</button>
              </td>
              <td>
                <a className="ui black button" href="/CSC309A">
                  CSC309A
                </a>
                <a className="ui black button" href="/a*">
                  CSC343
                </a>
                <a className="ui black button" href="/a*">
                  CSC309B
                </a>
              </td>
              <td>
                <a className="ui black button" href="/a*">
                  ECE361
                </a>
              </td>
              <td>
                <div className="ui two buttons">
                  <div>
                    <button className="ui  yellow  button">Explore</button>{" "}
                  </div>
                  <AlterWindow
                    className="ui black button"
                    buttonName="Remove"
                    content="Confirmation to Remove the Student"
                    cancelButtonContent="Cancel"
                    confirmButtonContent="Confirm"
                  ></AlterWindow>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Kruzer</button>
              </td>
              <td>
                <a className="ui black button" href="/a*">
                  CSC309B
                </a>
                <a className="ui black button" href="/CSC309A">
                  CSC309A
                </a>
                <a className="ui black button" href="/a*">
                  ECE361
                </a>
              </td>
              <td>
                <a className="ui black button" href="/a*">
                  CSC343
                </a>
              </td>
              <td>
                <div className="ui two buttons">
                  <div>
                    <button className="ui  yellow  button">Explore</button>{" "}
                  </div>
                  <AlterWindow
                    className="ui black button"
                    buttonName="Remove"
                    content="Confirmation to Remove the Student"
                    cancelButtonContent="Cancel"
                    confirmButtonContent="Confirm"
                  ></AlterWindow>
                </div>
              </td>
            </tr>

            <tr>
              <td>
                <button className="ui yellow button">Ashley</button>
              </td>
              <td>
                <a className="ui black button" href="/CSC309A">
                  CSC309A
                </a>
                <a className="ui black button" href="/a*">
                  CSC343
                </a>
                <a className="ui black button" href="/a*">
                  ECE361
                </a>
              </td>
              <td>
                <a className="ui black button" href="/a*">
                  CSC309B
                </a>
              </td>
              <td>
                <div className="ui two buttons">
                  <div>
                    <button className="ui  yellow  button">Explore</button>{" "}
                  </div>
                  <AlterWindow
                    className="ui black button"
                    buttonName="Remove"
                    content="Confirmation to Remove the Student"
                    cancelButtonContent="Cancel"
                    confirmButtonContent="Confirm"
                  ></AlterWindow>
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
