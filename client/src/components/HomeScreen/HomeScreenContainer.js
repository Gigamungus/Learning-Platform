import { connect } from "react-redux";
import HomeScreen from "./HomeScreen";
import { fetchRelevantCourses } from "../../redux/actionCreators/courseCreators";
import { resetHomeScreen } from "../../redux/actionCreators/sidebarCreators";

const mapStateToProps = state => ({
  loadedCourses: state.course.loadedCourses,
  loadingCourses: state.course.loadingCourses,
  courses: state.course.courses
});

const mapDispatchToProps = dispatch => ({
  fetchRelevantCourses: (numberOfCourses = 10) =>
    dispatch(fetchRelevantCourses(numberOfCourses)),
  resetSelf: () => dispatch(resetHomeScreen())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
