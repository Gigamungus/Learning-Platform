import React, { Component } from "react";
import "./Body.css";
import PropTypes from "prop-types";

class Body extends Component {
  render() {
    let classes = ["Body"];
    if (!this.props.sidebarVisible) classes.push("full-width");
    return <div className={classes.join(" ")}>this is a body element</div>;
  }
}

Body.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired
};

export default Body;
