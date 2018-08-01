import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Option.css";

class Option extends Component {
  render() {
    return (
      <div className="Option" onClick={this.props.onClick}>
        {this.props.text}
      </div>
    );
  }
}
Option.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};
export default Option;
