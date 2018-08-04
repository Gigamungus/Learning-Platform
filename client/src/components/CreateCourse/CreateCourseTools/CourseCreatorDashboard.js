import React, { Component } from "react";

class CourseCreatorDashboard extends Component {
  componentDidMount() {
    this.courseId = this.props.match.params.courseId;
  }
  render() {
    return <div>{5}</div>;
  }
}

export default CourseCreatorDashboard;
