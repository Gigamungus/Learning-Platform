import React, { Component } from "react";
import Input from "./../Input/Input";
import PropTypes from "prop-types";
import "./SigninForm.css";

class SigninForm extends Component {
  signinHelper(e) {
    e.preventDefault();
    this.props.signinUser(e.target[0].value, e.target[1].value);
  }
  render() {
    return (
      <form className="SigninForm" onSubmit={this.signinHelper.bind(this)}>
        <Input placeholder="username" />
        <Input placeholder="password" />
        <button type="submit" style={{ display: "none" }} />
      </form>
    );
  }
}

SigninForm.propTypes = {
  signinUser: PropTypes.func.isRequired
};

export default SigninForm;
