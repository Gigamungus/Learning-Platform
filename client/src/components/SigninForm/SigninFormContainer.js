import { connect } from "react-redux";
import SigninForm from "./SigninForm";
import { signinUser } from "./../../redux/actionCreators/userCreators";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  signinUser: (username, password) => dispatch(signinUser(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SigninForm);
