import React from "react";

export class RedirectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "",
      button_name: ""
    };
  }
  render() {
    return (
      <a className={this.props.className} href={this.props.page}>
        {this.props.button_name}
      </a>
    );
  }
}
