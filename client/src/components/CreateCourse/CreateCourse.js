import React, { Component } from "react";
import "./CreateCourse.css";
import { Route } from "react-router-dom";
import CourseCreatorDashboard from "./CreateCourseTools/CourseCreatorDashboard";

class CreateCourse extends Component {
  render() {
    return (
      <div>
        <Route path="/createnewcourse" component={CourseCreatorDashboard} />
      </div>
    );
  }
}

export default CreateCourse;
