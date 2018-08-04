import React, { Component } from "react";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import { Redirect } from "react-router-dom";

class MakeCourseSkeleton extends Component {
  componentDidMount() {
    this.props.createCourseSkeleton(this.props.JWT);
  }
  componentWillDismount() {
    this.props.resetSelf();
  }
  render() {
    if (this.props.createdCourseSkeleton) {
      return (
        <Redirect to={`/createnewcourse/${this.props.courseId}/dashboard`} />
      );
    } else if (this.props.creatingCourseSkeleton) {
      return (
        <div className="CreatingCourseSkeleton">
          <p>please wait while we create a template</p>
          <LoadSpinner />
        </div>
      );
    } else {
      return (
        <div className="CreatingCourseSkeleton">
          <p>please wait while we create a template</p>
          <LoadSpinner />
        </div>
      );
    }
  }
}

export default MakeCourseSkeleton;
