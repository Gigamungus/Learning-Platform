import { connect } from "react-redux";
import SectionEditor from "./SectionEditor";
import { addNewCourseSection } from "./../../../../redux/actionCreators/sectionCreators";
import { getCourseSections } from "./../../../../redux/actionCreators/sectionCreators";

const mapStateToProps = state => ({
  JWT: state.user.authJWT,
  courseName: state.section.courseName,
  sections: state.section.sections,
  loadingSections: state.section.loadingSections,
  loadedSections: state.section.loadedSections
});

const mapDispatchToProps = dispatch => ({
  addNewCourseSection: (title, courseId, JWT) =>
    dispatch(addNewCourseSection(title, courseId, JWT)),
  getCourseSections: (courseId, JWT) =>
    dispatch(getCourseSections(courseId, JWT))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionEditor);
