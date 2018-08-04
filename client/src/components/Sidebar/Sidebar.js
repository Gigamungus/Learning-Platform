import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";
import Option from "./../Option/Option";

class Sidebar extends Component {
  render() {
    if (this.props.sidebarVisible) {
      let options;
      if (this.props.userSignedIn) {
        options = (
          <div>
            <Option text="home" link="/" />
            <Option text="create new course" link="/createnewcourse" />
          </div>
        );
      } else {
      }
      return <div className="Sidebar">{options}</div>;
    } else return <div style={{ display: "none" }} />;
  }
}

Sidebar.propTypes = {
  sidebarVisible: PropTypes.bool.isRequired,
  userSignedIn: PropTypes.bool.isRequired
};

export default Sidebar;
