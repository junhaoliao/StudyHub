import React from "react";

import "./styles.css";
import NavBar from "../NavBar/navbar";
import {Embed} from 'semantic-ui-react'

/* Component for the CSC309A_resources_someVideo page */
class CSC309A_resources_someVideo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            video_id: "rnEB2F_v_cE"
        }
    }

    render() {
        const {video_id} = this.state;

        return (
            <div>
                <NavBar/>
                <Embed
                    id={video_id}
                    placeholder={"http://i3.ytimg.com/vi/" + video_id + "/maxresdefault.jpg"}
                    iframe={{
                        allowFullScreen: true
                    }}
                    source='youtube'
                />
            </div>
        );
    }
}

export default CSC309A_resources_someVideo;
