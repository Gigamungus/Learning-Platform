import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import Option from "./../Option/Option";

class Sidebar extends Component {
  render() {
    if (this.props.sidebarVisible)
      return (
        <div className="Sidebar">
          <Option text="option1"/>
          <Option text="option2"/>
          <Option text="option3"/>
        </div>
      );
    else return <div style={{ display: "none" }} />;
  }
}

Sidebar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired
};

export default Sidebar;
