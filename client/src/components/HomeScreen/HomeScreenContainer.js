import { connect } from "react-redux";
import HomeScreen from "./HomeScreen";
import { fetchRelevantCourses } from "../../redux/actionCreators/courseCreators";
import { resetHomeScreen } from "../../redux/actionCreators/homeScreenCreators";

const mapStateToProps = state => ({
  loadedCourses: state.homeScreen.loadedCourses,
  loadingCourses: state.homeScreen.loadingCourses,
  courses: state.homeScreen.courses
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
