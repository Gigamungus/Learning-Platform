import React, { Component } from "react";
import "./Navbar.css";
import Input from "./../Input/Input";
import ProfileMenuContainer from "./../ProfileMenu/ProfileMenuContainer";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <i className="fas fa-bars" onClick={this.props.toggleSidebar} />
        <Input placeholder={"search lessons"} />
        <div className="profileMenu">
          <ProfileMenuContainer />
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

export default Navbar;
