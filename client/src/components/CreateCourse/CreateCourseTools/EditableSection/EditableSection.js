import React, { Component } from "react";
import "./EditableSection.css";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";

class EditableSection extends Component {
  toggleSelfExpandedHelper() {
    this.props.toggleSelfExpanded(this.props.position);
  }
  componentWillUnmount() {
    clearInterval(this.persistentLoadSectionContent);
  }
  componentWillReceiveProps(props) {
    if (props.expanded === false || props.loadedSectionContent === true) {
      clearInterval(this.persistentLoadSectionContent);
    } else if (
      props.expanded === true &&
      props.loadedSectionContent === false &&
      props.loadingSectionContent === false
    ) {
      this.props.loadSectionContent(
        this.props.sectionId,
        this.props.position,
        this.props.JWT
      );
      this.persistentLoadSectionContent = setInterval(() => {
        this.props.loadSectionContent(
          this.props.sectionId,
          this.props.position,
          this.props.JWT
        );
      }, 1000);
    }
  }
  render() {
    let sectionContent;
    if (this.props.expanded) {
      if (this.props.loadingSectionContent) {
        sectionContent = <LoadSpinner />;
      } else if (this.props.loadedSectionContent) {
        //do stuff with section content here
        //write code above here
      } else {
        sectionContent = <LoadSpinner />;
      }
    }
    return (
      <div className="EditableSection">
        <div
          className="EditableSectionTitle"
          onClick={this.toggleSelfExpandedHelper.bind(this)}
        >
          {this.props.sectionTitle}
        </div>
        <div className="sectionContentEditor">{sectionContent}</div>
      </div>
    );
  }
}

export default EditableSection;
