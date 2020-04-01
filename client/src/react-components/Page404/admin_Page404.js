import React from "react";

import {AdminNavBar} from "../admin_navbar/index";

/* Component for the Home page */
export class AdminPage extends React.Component {

    componentDidMount() {
        document.title = "Page Not Found";
    }

    render() {
        return (
            <div>
                <AdminNavBar/>
                <header className={"emoji_404"}>
          <span role={"img"} aria-label="sad" className={"large_emoji"}>
            😦
          </span>
                </header>
                <header className={"centre"}>
                    The requested page is not found.
                    <br/>
                    Please check the url or come back later.
                </header>
            </div>
        );
    }
}
