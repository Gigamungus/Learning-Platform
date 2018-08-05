import { connect } from "react-redux";
import SectionEditor from "./SectionEditor";
import { addNewCourseSection } from "./../../../../redux/actionCreators/courseCreators";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addNewCourseSection: title => dispatch(addNewCourseSection(title))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionEditor);
