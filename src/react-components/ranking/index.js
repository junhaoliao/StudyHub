import React from "react";
import "./styles.css";


import NavBar from "../NavBar/navbar";

import {Button, Form, Header, Icon, Menu, Segment} from "semantic-ui-react";
import Items from "../item/items";



const item_list = [

    {name: "CSC309A", admin: "Kevin", info: "1234 people liked this course", count: 1234},
    {name: "ECE361", admin: "Junhao", info: "123 people liked this course", count: 123},
    {name: "CSC343", admin: "Kruzer", info: "12 people liked this course", count: 12},
    {name: "CSC309B", admin: "Ashley", info: "1 people liked this course", count: 1}
];


/* Component for the Ranking page */
class Ranking extends React.Component {



item_panel() {

    return (<div className={"items_container"}>
            <Menu secondary>
                <Menu.Item
                    name='Ranking'
                    className={"ranking_header"}
                />
                <Menu.Item
                    position={"right"}
                >
                    <Button size="small" color="green" position={"right"}>
                        <Icon name="reload" />
                        Reload
                    </Button>
                </Menu.Item>
            </Menu>
            <Items
                item_list={item_list}
            />
        </div>
    );

}

    render() {
        return (
            <div>
                <NavBar/>
                {this.item_panel()}
            </div>
        );
    }


}

export default Ranking;









