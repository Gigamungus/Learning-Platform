import React, { Component } from "react";

class CourseCreatorDashboard extends Component {
  constructor(props) {
    super(props);
    this.courseId = this.props.match.params.courseId;
  }
  componentDidMount() {
    this.props.loadCourse(this.courseId, this.props.JWT);
    this.persistentLoadCourse = setInterval(() => {
      this.props.loadCourse(this.courseId, this.props.JWT);
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.persistentLoadCourse);
    this.props.resetSelf();
  }
  render() {
    if (this.props.userMayNotViewCourse) {
      clearInterval(this.persistentLoadCourse);
      return <div>this course has been made private.</div>;
    } else if (this.props.loadedCourse) {
      clearInterval(this.persistentLoadCourse);
      return <div>loaded</div>;
    } else {
      return <div>loading</div>;
    }
  }
}

export default CourseCreatorDashboard;
