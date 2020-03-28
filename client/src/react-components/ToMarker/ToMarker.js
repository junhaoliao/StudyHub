import React from "react";

import {Icon, Message} from "semantic-ui-react";

class ToMarker extends React.Component {
    marking = false;

    render() {
        const {header, content} = this.props;
        return (this.marking ? <Message warning icon>
            <Icon name='star' loading/>
            <Message.Content>
                <Message.Header>{header}</Message.Header>
                {content}
            </Message.Content>
        </Message> : <empty/>);
    }
}

export default ToMarker;