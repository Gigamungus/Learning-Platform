import { connect } from "react-redux";
import PageEditor from "./PageEditor";
import { getPageContent } from "./../../../../redux/actionCreators/pageCreators";

const mapStateToProps = state => ({
  JWT: state.user.authJWT,
  loadingPageContent: state.page.loadingPageContent,
  loadedPageContent: state.page.loadedPageContent,
  pageContent: state.page.pageContent
});

const mapDispatchToProps = dispatch => ({
  getPageContent: (pageId, JWT) => dispatch(getPageContent(pageId, JWT))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEditor);
