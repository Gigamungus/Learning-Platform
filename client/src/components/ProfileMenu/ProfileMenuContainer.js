import { connect } from "react-redux";
import ProfileMenu from "./ProfileMenu";
import { toggleProfileOptions } from "./../../redux/actionCreators/profileMenuCreators";

const mapStateToProps = state => {
//   console.log(state);
  return {
    userLoggedIn: state.user.userLoggedIn,
    displayProfileMenu: state.profile.displayProfileMenu
  };
};

const mapDispatchToProps = dispatch => ({
  toggleProfileOptions: () => dispatch(toggleProfileOptions())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileMenu);
