import React, { Component } from "react";
import Input from "./../../../Input/Input";
import "./SectionEditor.css";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import EditableSectionContainer from "./../EditableSection/EditableSectionContainer";
import { Link } from "react-router-dom";

class SectionEditor extends Component {
  addNewCourseSectionHelper(e) {
    e.preventDefault();
    this.props.addNewCourseSection(
      e.target[0].value,
      this.props.match.params.courseId,
      this.props.JWT
    );
    e.target[0].value = "";
  }
  componentDidMount() {
    this.props.getCourseSections(
      this.props.match.params.courseId,
      this.props.JWT
    );
    this.persistentGetCourseSections = setInterval(() => {
      this.props.getCourseSections(
        this.props.match.params.courseId,
        this.props.JWT
      );
    }, 1500);
  }
  componentWillUnmount() {
    clearInterval(this.persistentGetCourseSections);
  }
  render() {
    if (this.props.loadingSections) {
      return <LoadSpinner />;
    } else if (this.props.loadedSections) {
      //write code here

      clearInterval(this.persistentGetCourseSections);
      let sections = this.props.sections;
      if (sections.length === 0) {
        sections = "your course has no content, go ahead and add some!";
      } else {
        sections = sections.map((section, index) => (
          <EditableSectionContainer
            key={index}
            sectionPosition={section.position}
          />
        ));
      }
      return (
        <div className="SectionEditor">
          <Link
            to={`/courseeditor/${this.props.match.params.courseId}/dashboard`}
            className="dashboardLink"
          >
            go back to dashboard
          </Link>
          <div className="SectionEditorTitle">{this.props.courseName}</div>
          <div className="editableSectionsContainer">{sections}</div>
          <form action="" onSubmit={this.addNewCourseSectionHelper.bind(this)}>
            <Input placeholder="add course section" />
          </form>
        </div>
      );

      //write code above here
    } else {
      return <LoadSpinner />;
    }
  }
}

export default SectionEditor;
