import React, { Component } from "react";
import PropTypes from "prop-types";

class Sidebar extends Component {
  render() {
    if (this.props.sidebarVisible)
      return <div className="Sidebar">this is a sidebar</div>;
    else return <div style={{ display: "none" }} />;
  }
}

Sidebar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired
};

export default Sidebar;
