import { connect } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import {
  toggleProfileOptions,
  toggleCreatingAccount
} from "./../../redux/actionCreators/profileMenuCreators";
import { logoutUser } from "./../../redux/actionCreators/userCreators";

const mapStateToProps = state => {
  //   console.log(state);
  return {
    userLoggedIn: state.user.userLoggedIn,
    displayProfileMenu: state.profile.displayProfileMenu,
    creatingAccount: state.profile.creatingAccount
  };
};

const mapDispatchToProps = dispatch => ({
  toggleProfileOptions: () => dispatch(toggleProfileOptions()),
  logoutUser: () => dispatch(logoutUser()),
  toggleCreatingAccount: () => dispatch(toggleCreatingAccount())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMenu);
