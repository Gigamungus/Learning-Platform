import { connect } from "react-redux";
import PageViewerIndex from "./PageViewerIndex";
import { loadPagesToView } from "./../../../redux/actionCreators/sectionCreators";

const mapStateToProps = (state, ownProps) => {
  let sectionId = ownProps.sectionId;
  let position = ownProps.position;
  let courseId = ownProps.courseId;

  return {
    sectionId,
    courseId,
    position,
    loadingPages: state.course.sectionsToView[position].loadingPages,
    loadedPages: state.course.sectionsToView[position].loadedPages,
    pages: state.course.sectionsToView[position].pages
  };
};

const mapDispatchToProps = dispatch => ({
  loadPages: (position, sectionId, JWT) =>
    dispatch(loadPagesToView(position, sectionId, JWT))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageViewerIndex);
