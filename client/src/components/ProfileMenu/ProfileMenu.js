import React, { Component } from "react";
import "./ProfileMenu.css";
import PropTypes from "prop-types";
import Button from "./../Button/Button";
import img from "./../../images/no-image-user.jpg";
import Option from "./../Option/Option";

class ProfileMenu extends Component {
  render() {
    const profileMenuClass = this.props.displayProfileMenu
      ? "profileDropdown"
      : "hidden";
    return this.props.userLoggedIn ? (
      <div className="ProfileMenu">
        <img
          src={img}
          alt="profile"
          onClick={this.props.toggleProfileOptions}
        />
        <div className={profileMenuClass}>
          <Option text="view profile" />
          <Option text="logout" />
        </div>
      </div>
    ) : (
      <Button text="sign in" />
    );
  }
}

ProfileMenu.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  toggleProfileOptions: PropTypes.func.isRequired,
  displayProfileMenu: PropTypes.bool.isRequired
};

export default ProfileMenu;
