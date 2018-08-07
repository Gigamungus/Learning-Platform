import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CreateCourse.css";
import { Route } from "react-router-dom";
import CourseCreatorDashboard from "./CreateCourseTools/CourseCreatorDashboard";
import MakeCourseSkeleton from "./CreateCourseTools/MakeCourseSkeleton";

class CreateCourse extends Component {
  render() {
    return (
      <div className="CreateCourse">
        <Route
          exact
          path="/courseeditor"
          render={props => (
            <MakeCourseSkeleton
              {...props}
              creatingCourseSkeleton={this.props.creatingCourseSkeleton}
              createdCourseSkeleton={this.props.createdCourseSkeleton}
              createCourseSkeleton={this.props.createCourseSkeleton}
              courseId={this.props.courseId}
              JWT={this.props.JWT}
              resetSelf={this.props.resetCourseSkeletonCreator}
            />
          )}
        />

        <Route
          exact
          path="/courseeditor/:courseId/dashboard"
          render={props => (
            <CourseCreatorDashboard
              {...props}
              loadingCourse={this.props.loadingCourseToEdit}
              loadedCourse={this.props.loadedCourseToEdit}
              loadCourse={this.props.loadCourseToEdit}
              course={this.props.courseToEditTopLevel}
              JWT={this.props.JWT || undefined}
              userMayNotViewCourse={this.props.userMayNotViewCourse}
              resetSelf={this.props.resetDashboard}
              editCourseTitle={this.props.editCourseTitle}
              editCourseDescription={this.props.editCourseDescription}
              toggleCoursePrivacy={this.props.toggleCoursePrivacy}
              editCourseImage={this.props.editCourseImage}
              saveCourseChanges={this.props.saveCourseChanges}
            />
          )}
        />
      </div>
    );
  }
}

CreateCourse.propTypes = {
  creatingCourseSkeleton: PropTypes.bool.isRequired,
  createdCourseSkeleton: PropTypes.bool.isRequired,
  createCourseSkeleton: PropTypes.func.isRequired
};

export default CreateCourse;
