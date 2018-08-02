import React, { Component } from "react";
import Input from "./../Input/Input";
import "./SignupForm.css";
import PropTypes from "prop-types";

class SignupForm extends Component {
  signupUserHelper(e) {
    e.preventDefault();
    this.props.signupUser(
      e.target[0].value,
      e.target[1].value,
      e.target[2].value
    );
  }
  render() {
    let usernameError =
      this.props.error === "invalid username"
        ? "username must be between 2 and 16 characters"
        : "";
    usernameError =
      this.props.error === "username taken" ? "username taken" : "";
    let passwordError =
      this.props.error === "password missmatch" ? "passwords must match" : "";
    return (
      <form className="SignupForm" onSubmit={this.signupUserHelper.bind(this)}>
        <Input placeholder="username" errorMessage={usernameError} />
        <Input
          placeholder="password"
          type="password"
          errorMessage={passwordError}
        />
        <Input placeholder="retype password" type="password" />
        <button type="submit" style={{ display: "none" }} />{" "}
      </form>
    );
  }
}

SignupForm.propTypes = {
  signupUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired
};

export default SignupForm;
