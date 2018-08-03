import React, { Component } from "react";
import "./Body.css";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomeScreenContainer from "./../HomeScreen/HomeScreenContainer";

class Body extends Component {
  render() {
    let classes = ["Body"];
    if (!this.props.sidebarVisible) classes.push("full-width");
    return (
      <div className={classes.join(" ")}>
        <Route exact path="/" component={HomeScreenContainer} />
      </div>
    );
  }
}

Body.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired
};

export default Body;
