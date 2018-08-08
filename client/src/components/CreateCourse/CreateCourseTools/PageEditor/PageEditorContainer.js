import { connect } from "react-redux";
import PageEditor from "./PageEditor";
import {
  getPageContent,
  editPage
} from "./../../../../redux/actionCreators/pageCreators";

const mapStateToProps = state => ({
  JWT: state.user.authJWT,
  loadingPageContent: state.page.loadingPageContent,
  loadedPageContent: state.page.loadedPageContent,
  pageContent: state.page.pageContent,
  editingTitle: state.page.editingTitle,
  editingDescription: state.page.editingDescription,
  addingElement: state.page.addingElement
});

const mapDispatchToProps = dispatch => ({
  getPageContent: (pageId, JWT) => dispatch(getPageContent(pageId, JWT)),
  changePageTitle: (pageId, JWT, newTitle) =>
    dispatch(editPage(pageId, JWT, newTitle, undefined, undefined)),
  changePageDescription: (pageId, JWT, newDescription) =>
    dispatch(editPage(pageId, JWT, undefined, newDescription, undefined)),
  addPageSection: (pageId, JWT, newSection) =>
    dispatch(editPage(pageId, JWT, undefined, undefined, newSection))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageEditor);
