import React from "react";
import { AdminNavBar } from "../admin_navbar/index";
import { AdminUsercard } from "../admin_usercard/index";
export class AdminDashboard extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar></AdminNavBar>
        <AdminUsercard
          username="Junhao"
          education="3rd Year"
          courses="ECE361"
        ></AdminUsercard>
        <AdminUsercard
          username="Ashley"
          education="3rd Year"
          courses="CSC309B"
        ></AdminUsercard>
        <AdminUsercard
          username="Kruzer"
          education="3rd Year"
          courses="CSC343"
        ></AdminUsercard>
        <AdminUsercard
          username="Kevin"
          education="3rd Year"
          courses="CSC309A"
        ></AdminUsercard>
      </div>
    );
  }
}
