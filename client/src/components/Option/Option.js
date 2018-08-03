import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./Option.css";

class Option extends Component {
  render() {
    return this.props.link ? (
      <Link
        to={this.props.link}
        className="Option"
        onClick={this.props.onClick}
      >
        {this.props.text}
      </Link>
    ) : (
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
