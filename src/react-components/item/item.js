import React from "react";
import {Button, Card} from "semantic-ui-react";

class Item extends React.Component {

    CountButton = <Button color={"red"} > ❤️ Hot </Button>;

    constructor(props) {
        super(props);
    }

    render() {
        const {item} = this.props;

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{item.name}</Card.Header>
                    <Card.Meta>Admin: {item.admin}</Card.Meta>
                    <Card.Description>
                        {item.info}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        {this.CountButton}
                        <Button color={"blue"} href={item.name}>
                            <span role={"img"} aria-label="study">📖</span>
                            Enter</Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

export default Item;