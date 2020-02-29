import React from "react";

import { AdminNavBar } from "../admin_navbar/index";
import Billboard from "./bill_board";

export class AdminBB extends React.Component {
  render() {
    return (
      <div>
        <AdminNavBar />
        <Billboard></Billboard>
      </div>
    );
  }
}
