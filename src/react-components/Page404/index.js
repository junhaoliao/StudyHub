import React from "react";

import "./styles.css";

/* Component for the Home page */
class Home extends React.Component {
    render() {
        return (
            <div>
                <header className={"emoji_404"}>
                    <span role={"img"} aria-label="sad" className={"large_emoji"}>😦</span>
                </header>
                <header className={"centre"}>
                    The requested page is not found.<br/>
                    Please check the url or come back later.
                </header>
            </div>
        );
    }
}

export default Home;
