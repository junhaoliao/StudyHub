import React from "react";

import {Button, Form, Header, Icon, Message, Progress, Segment} from "semantic-ui-react";
import {fileUploadHandler} from "../../actions/resource";

export class UploadModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileInputKey: null,
            courseName: this.props.courseName,
            file: "",
            uploadedFile: false,
            message: {},
            uploadPercentage: ""
        };
    }

    handleFileInputChange = e => {
        this.setState({
            file: e.target.files[0]
        });
    };


    render() {
        const {message, uploadPercentage, fileInputKey} = this.state;
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name='file outline'/>
                </Header>
                <Form app={this} onSubmit={fileUploadHandler}>
                    <Form.Field>
                        <input key={fileInputKey || ''} onChange={this.handleFileInputChange} type={"file"}/>
                    </Form.Field>
                    <Progress percent={uploadPercentage} indicating progress/>
                    <Button primary>Upload</Button>
                </Form>
                {message.header ? <Message positive={message.success} negative={!message.success}>
                    <Message.Header>{message.header}</Message.Header>
                    <p>
                        {message.content}
                    </p>
                </Message> : null}
            </Segment>
        );
    }
}