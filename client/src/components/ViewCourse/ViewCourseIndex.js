import React, { Component } from "react";
import { Route } from "react-router-dom";
import CourseViewerGuideContainer from "./CourseViewerGuide/CourseViewerGuideContainer";
import "./ViewCourseIndex.css";
import PageViewerContainer from "./PageViewer/PageViewerContainer";

class ViewCourseIndex extends Component {
  render() {
    return (
      <div className="ViewCourseIndex">
        <div className="PageContent">
          {
            <Route
              exact
              path="/courses/:courseId/page/:pageId"
              component={PageViewerContainer}
            />
          }
        </div>
        <div className="CourseViewerGuideContainer">
          <CourseViewerGuideContainer
            courseId={this.props.match.params.courseId}
          />
        </div>
      </div>
    );
  }
}

export default ViewCourseIndex;
