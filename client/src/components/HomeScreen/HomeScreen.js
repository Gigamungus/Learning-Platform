import React, { Component } from "react";
import CourseThumbNail from "./../CourseThumbNail/CourseThumbNail";
import LoadSpinner from "./../LoadSpinner/LoadSpinner";
import PropTypes from "prop-types";
import "./HomeScreen.css";

class HomeScreen extends Component {
  componentWillUnmount() {
    this.props.resetSelf;
  }
  render() {
    if (this.props.loadedCourses) {
      clearInterval(this.fetchingCoursesTimer);
      let courseThumbnails = this.props.courses.map((course, index) => (
        <CourseThumbNail
          uploader={course.author}
          title={course.title}
          pageSrc={course._id}
          views={course.views}
          img={course.thumbnailImg}
          dateCreated={course.created}
          key={index}
        />
      ));
      return <div className="HomeScreen">{courseThumbnails}</div>;
    } else if (this.props.loadingCourses) {
      return <LoadSpinner />;
    } else {
      this.props.fetchRelevantCourses();
      this.fetchingCoursesTimer = setInterval(() => {
        this.props.fetchRelevantCourses();
      }, 2000);
      return <LoadSpinner />;
    }
  }
}

HomeScreen.propTypes = {
  loadedCourses: PropTypes.bool.isRequired,
  loadingCourses: PropTypes.bool.isRequired,
  fetchRelevantCourses: PropTypes.func.isRequired,
  courses: PropTypes.array
};

export default HomeScreen;
