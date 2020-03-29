import React from "react";

import {Button, Form, Header, Icon, Progress, Segment} from "semantic-ui-react";
import axios from 'axios';

export class uploadModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
    onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    const percentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                    this.setState({
                        uploadPercentage: percentage
                    });

                    // Clear percentage
                    setTimeout(() => this.setState({uploadPercentage: 0}), 10000);
                }
            });

            const {resFileName, resFilePath} = res.data;

            this.setState({filename: resFileName, filePath: resFilePath, message: "File Uploaded"});
        } catch (err) {
            if (err.response.status === 500) {
                this.setState({
                    message: 'There was a problem with the server'
                });
            } else {
                this.setState({
                    message: err.response.data.msg
                });
            }
        }
    };

    render() {
        return (
            <Segment placeholder>
                <Header icon>
                    <Icon name='file outline'/>
                </Header>
                <Form onSubmit={this.onSubmit}>
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