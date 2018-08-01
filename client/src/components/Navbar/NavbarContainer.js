import { connect } from "react-redux";
import Navbar from "./Navbar";
import { toggleSidebarCreator } from "./../../redux/actionCreators/sidebarCreators";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  toggleSidebar: () => dispatch(toggleSidebarCreator())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
