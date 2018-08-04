import React, { Component } from "react";

class CourseCreatorDashboard extends Component {
  componentDidMount() {
    this.courseId = this.props.match.params.courseId;
    this.props.loadCourse(this.courseId, this.props.JWT);
  }
  render() {
    return <div>{5}</div>;
  }
}

export default CourseCreatorDashboard;
