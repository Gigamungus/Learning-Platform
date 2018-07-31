import { connect } from "react-redux";
import Sidebar from "./Sidebar";

const mapStateToProps = state => ({
  sidebarVisible: state.sidebar.sidebarVisible
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
