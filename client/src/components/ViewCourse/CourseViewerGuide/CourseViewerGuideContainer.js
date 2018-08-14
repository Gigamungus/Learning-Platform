import { connect } from "react-redux";
import CourseViewerGuide from "./CourseViewerGuide.js";
import { getSectionsToView } from "./../../../redux/actionCreators/sectionCreators";

const mapStateToProps = (state, ownProps) => {
  let courseId = ownProps.courseId;
  return {
    courseId,
    JWT: state.user.authJWT,
    loadingSectionsToView: state.course.loadingSectionToView,
    loadedSectionsToView: state.course.loadedSectionToView,
    sectionsToView: state.course.sectionsToView
  };
};

const mapDispatchToProps = dispatch => ({
  getSections: (courseId, JWT) => dispatch(getSectionsToView(courseId, JWT))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CourseViewerGuide);
