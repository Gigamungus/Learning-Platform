import React, { Component } from "react";
import "./ProfileMenu.css";
import PropTypes from "prop-types";
import Button from "./../Button/Button";
import img from "./../../images/no-image-user.jpg";
import Option from "./../Option/Option";
import SigninFormContainer from "./../SigninForm/SigninFormContainer";
import SignupFormContainer from "./../SignupForm/SignupFormContainer";

class ProfileMenu extends Component {
  render() {
    const profileMenuClass = this.props.displayProfileMenu
      ? "profileDropdown"
      : "hidden";

    let profileMenuDropdown;

    if (this.props.userLoggedIn) {
      profileMenuDropdown = (
        <div className="ProfileMenu">
          <img
            src={img}
            alt="profile"
            onClick={this.props.toggleProfileOptions}
          />
          <div className={profileMenuClass}>
            <Option text="view profile" />
            <Option text="logout" onClick={this.props.logoutUser.bind(this)} />
          </div>
        </div>
      );
    } else if (this.props.creatingAccount) {
      //rewrite this
      profileMenuDropdown = (
        <div className="ProfileMenu">
          <Button text="sign in" onClick={this.props.toggleProfileOptions} />
          <div className={profileMenuClass}>
            <SignupFormContainer />
            <p
              className="toggleCreateAccountLink"
              onClick={this.props.toggleCreatingAccount}
            >
              already have an account? login
            </p>
          </div>
        </div>
      );
    } else {
      profileMenuDropdown = (
        <div className="ProfileMenu">
          <Button text="sign in" onClick={this.props.toggleProfileOptions} />
          <div className={profileMenuClass}>
            <SigninFormContainer />
            <p
              className="toggleCreateAccountLink"
              onClick={this.props.toggleCreatingAccount}
            >
              create account
            </p>
          </div>
        </div>
      );
    }

    return profileMenuDropdown;
  }
}

ProfileMenu.propTypes = {
  userLoggedIn: PropTypes.bool.isRequired,
  toggleProfileOptions: PropTypes.func.isRequired,
  displayProfileMenu: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  creatingAccount: PropTypes.bool.isRequired,
  toggleCreatingAccount: PropTypes.func.isRequired
};

export default ProfileMenu;
