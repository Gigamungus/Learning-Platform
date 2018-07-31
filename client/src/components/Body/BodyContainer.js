import { connect } from "react-redux";
import Body from "./Body";

const mapStateToProps = state => ({
  sidebarVisible: state.sidebar.sidebarVisible
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);
