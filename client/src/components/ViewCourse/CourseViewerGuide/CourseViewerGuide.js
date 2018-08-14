import React, { Component } from "react";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import SectionViewerContainer from "./../SectionViewer/SectionViewerContainer";
import "./CourseViewerGuide.css";

class CourseViewerGuide extends Component {
  componentDidMount() {
    this.props.getSections(this.props.courseId, this.props.JWT);
    this.persistentGetSections = setInterval(() => {
      this.props.getSections(this.props.courseId, this.props.JWT);
    }, 1000);
  }
  componentWillReceiveProps(props) {
    if (props.loadedSectionsToView) {
      clearInterval(this.persistentGetSections);
    }
  }
  componentWillUnmount() {
    clearImmediate(this.persistentGetSections);
  }
  render() {
    let view = this.props.loadedSectionsToView ? (
      this.props.sectionsToView.map((section, index) => (
        <SectionViewerContainer
          sectionId={section._id}
          courseId={this.props.courseId}
          sectionTitle={section.sectionTitle}
          position={index}
          key={index}
        />
      ))
    ) : (
      <LoadSpinner />
    );
    return <div className="CourseViewerGuide">{view}</div>;
  }
}

export default CourseViewerGuide;
