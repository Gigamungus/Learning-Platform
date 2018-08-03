import React, { Component } from "react";
import "./CreateCourse.css";
import { Route } from "react-router-dom";
import CreateDashboard from "./"

class CreateCourse extends Component {
  render() {
    return (
      <div>
        <Route path="/createnewcourse" component={CreateDashboard} />
      </div>
    );
  }
}

export default CreateCourse;
