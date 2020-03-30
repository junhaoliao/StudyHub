import React from "react";

import {Button, Form, Header, Icon, Progress, Segment} from "semantic-ui-react";
import {fileUploadHandler} from "../../actions/resource";

export class UploadModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: this.props.courseName,
            file: "",
            fileName: "",
            uploadedFile: false,
            message: "",
            uploadPercentage: ""
        };
    }

    onChange = e => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    };


    render() {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name='file outline'/>
                </Header>
                <Form app={this} onSubmit={fileUploadHandler}>
                    <Form.Field>
                        <input onChange={this.onChange} type={"file"} id='customFile'/>
                    </Form.Field>
                    <Progress percent={this.state.uploadPercentage} indicating progress/>
                    <Button primary>Upload</Button>
                </Form>

            </Segment>
        );
    }
}