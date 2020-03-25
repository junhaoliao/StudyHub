import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import Billboard from "./bill_board";

export class RegularBB extends React.Component {
    render() {
        return (
            <div>
                <NavBar/>
                <Billboard/>
            </div>
        );
    }
}
