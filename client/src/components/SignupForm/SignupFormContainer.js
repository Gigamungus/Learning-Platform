import { connect } from "react-redux";
import SignupForm from "./SignupForm";
import { signupUser } from "./../../redux/actionCreators/userCreators";

const mapStateToProps = state => ({
  error: state.user.signupError
});

const mapDispatchToProps = dispatch => ({
  signupUser: (username, password, password2) =>
    dispatch(signupUser(username, password, password2))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
