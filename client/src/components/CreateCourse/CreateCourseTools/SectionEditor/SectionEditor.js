import React, { Component } from "react";
import Input from "./../../../Input/Input";
import "./SectionEditor.css";

class SectionEditor extends Component {
  addNewCourseSectionHelper(e) {
    e.preventDefault();
    this.props.addNewCourseSection(e.target[0].value);
  }
  render() {
    let sections = this.props.sections;
    if (sections.length === 0) {
      sections = "your course has no content, go ahead and add some!";
    } else {
      console.log(sections);
    }
    return (
      <div className="SectionEditor">
        {sections}
        <form action="" onSubmit={this.addNewCourseSectionHelper.bind(this)}>
          <Input placeholder="add course section" />
        </form>
      </div>
    );
  }
}

export default SectionEditor;
