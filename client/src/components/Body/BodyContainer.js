import { connect } from "react-redux";
import Body from "./Body";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({
  sidebarVisible: state.sidebar.sidebarVisible
});

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Body)
);
