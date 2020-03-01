import React from "react";
import {uid} from "react-uid";
import {Card} from "semantic-ui-react";

import Item from "./item"

class Items extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.state;
    }

    render() {
        const {item_list} = this.props;

        return (

            <Card.Group itemsPerRow={4}>
                {item_list.map(item => (
                    <Item
                        key={uid(item)}
                        item={item}
                    />
                ))}
            </Card.Group>

        );
    }
}

export default Items;