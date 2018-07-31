import React, { Component } from "react";
import "./Navbar.css";
import InputContainer from "./../Input/InputContainer";
import ProfileMenuContainer from "./../ProfileMenu/ProfileMenuContainer";
import PropTypes from "prop-types";

class Navbar extends Component {
  render() {
    return (
      <div className="Navbar">
        <i className="fas fa-bars" onClick={this.props.toggleSidebar} />
        <InputContainer />
        <ProfileMenuContainer />
      </div>
    );
  }
}

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired
};

export default Navbar;
