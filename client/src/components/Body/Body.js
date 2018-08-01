import React, { Component } from "react";
import "./Body.css";
import PropTypes from "prop-types";

class Body extends Component {
  render() {
    let classes = ["Body"];
    if (!this.props.sidebarVisible) classes.push("full-width");
    return (
      <div className={classes.join(" ")}>
        lorem ipsum dalor amet setlorem ipsum dalor amet set lorem ipsum dalor
        amet set lorem ipsum dalor amet set lorem ipsum dalor amet set lorem
        ipsum dalor amet set lorem ipsum dalor amet set lorem ipsum dalor amet
        set lorem ipsum dalor amet set lorem ipsum dalor amet setlorem ipsum
        dalor amet setlorem ipsum dalor amet setlorem ipsum dalor amet setlorem
        ipsum dalor amet setlorem ipsum dalor amet setlorem ipsum dalor amet
        setlorem ipsum dalor amet setlorem ipsum dalor amet setlorem ipsum dalor
        amet setlorem ipsum dalor amet setlorem ipsum dalor amet setlorem ipsum
        dalor amet setlorem ipsum dalor amet setlorem ipsum dalor amet setlorem
        ipsum dalor amet setlorem ipsum dalor amet setlorem ipsum dalor amet
        setlorem ipsum dalor amet setlorem ipsum dalor amet setlorem ipsum dalor
        amet setlorem ipsum dalor amet set
      </div>
    );
  }
}

Body.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired
};

export default Body;
