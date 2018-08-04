import React, { Component } from "react";

class CourseCreatorDashboard extends Component {
  componentDidMount() {
    this.courseId = this.props.match.params.courseId;
    this.persistentLoadCourse = setInterval(() => {
      this.props.loadCourse();
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.persistentLoadCourse);
  }
  render() {
    if (this.props.loadedCourse) {
      clearInterval(this.persistentLoadCourse);
      return <div>loaded</div>;
    } else if (this.props.userMayNotViewCourse) {
      clearInterval(this.persistentLoadCourse);
      return <div>this course has been made private.</div>;
    } else {
      this.props.loadCourse(this.courseId, this.props.JWT);
      return <div>loading</div>;
    }
  }
}

export default CourseCreatorDashboard;
