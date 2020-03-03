import React from "react";
import { Button, Confirm } from "semantic-ui-react";

export class AlterWindow extends React.Component {
  state = { open: false };

  show = () => this.setState({ open: true });
  handleConfirm = () => this.setState({ open: false });
  handleCancel = () => this.setState({ open: false });

  render() {
    return (
      <div>
        <Button className={this.props.className} onClick={this.show}>
          {this.props.buttonName}
        </Button>
        <Confirm
          open={this.state.open}
          content={this.props.content}
          cancelButton={this.props.cancelButtonContent}
          confirmButton={this.props.confirmButtonContent}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        />
      </div>
    );
  }
}
