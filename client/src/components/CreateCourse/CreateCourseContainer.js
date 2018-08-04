import { connect } from "react-redux";
import CreateCourse from "./CreateCourse";
import {
  createCourseSkeleton,
  resetCourseSkeletonCreator
} from "./../../redux/actionCreators/courseCreators";

const mapStateToProps = state => ({
  creatingCourseSkeleton: state.course.creatingCourseSkeleton,
  createdCourseSkeleton: state.course.createdCourseSkeleton,
  courseId: state.course.editingCourseId,
  userLoggedIn: state.user.userLoggedIn,
  JWT: state.user.authJWT
});

const mapDispatchToProps = dispatch => ({
  createCourseSkeleton: jwt => dispatch(createCourseSkeleton(jwt)),
  resetCourseSkeletonCreator: () => dispatch(resetCourseSkeletonCreator())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCourse);
