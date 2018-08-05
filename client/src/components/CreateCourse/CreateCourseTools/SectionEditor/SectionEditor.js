import React, { Component } from "react";
import Input from "./../../../Input/Input";
import "./SectionEditor.css";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";

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
        console.log(sections);
        sections = sections.map((section, index) => (
          <div key={index}>{section.sectionTitle}</div>
        ));
      }
      return (
        <div className="SectionEditor">
          <div>{this.props.courseName}</div>
          {sections}
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
