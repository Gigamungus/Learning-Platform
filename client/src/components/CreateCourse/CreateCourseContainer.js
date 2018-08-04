import { connect } from "react-redux";
import CreateCourse from "./CreateCourse";
import {
  createCourseSkeleton,
  resetCourseSkeletonCreator,
  loadCourseToEdit
} from "./../../redux/actionCreators/courseCreators";

const mapStateToProps = state => ({
  creatingCourseSkeleton: state.course.creatingCourseSkeleton,
  createdCourseSkeleton: state.course.createdCourseSkeleton,
  courseId: state.course.editingCourseId,
  userLoggedIn: state.user.userLoggedIn,
  JWT: state.user.authJWT,
  loadedCourseToEdit: state.course.loadedCourseToEdit,
  loadingCourseToEdit: state.course.loadingCourseToEdit,
  courseToEditTopLevel: state.course.courseToEditTopLevel
});

const mapDispatchToProps = dispatch => ({
  createCourseSkeleton: jwt => dispatch(createCourseSkeleton(jwt)),
  resetCourseSkeletonCreator: () => dispatch(resetCourseSkeletonCreator()),
  loadCourseToEdit: (courseId, JWT) => dispatch(loadCourseToEdit(courseId, JWT))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCourse);
