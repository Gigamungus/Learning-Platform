import React, { Component } from "react";
import "./EditableSection.css";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import Input from "./../../../Input/Input";
import { Link } from "react-router-dom";

class EditableSection extends Component {
  toggleSelfExpandedHelper() {
    this.props.toggleSelfExpanded(this.props.position);
  }

  updateDescriptionHelper(e) {
    e.preventDefault();
    this.props.updateDescription(
      this.props.position,
      e.target[0].value,
      this.props.sectionId,
      this.props.JWT
    );
  }

  createPageHelper(e) {
    e.preventDefault();
    this.props.createNewPage(
      this.props.position,
      e.target[0].value,
      this.props.sectionId,
      this.props.JWT
    );
    e.target[0].value = "";
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
        /////////////////////////
        //write code below here//
        /////////////////////////

        //description stuff

        let description;

        if (this.props.loadingSectionDescription) {
          description = <LoadSpinner />;
        } else {
          if (this.props.sectionContent.description === "") {
            description =
              "this course does not have a description, add one below";
          } else {
            description = this.props.sectionContent.description;
          }
        }

        //content stuff

        let pages;

        if (this.props.sectionContent.pages.length === 0) {
          pages = "this section does not have any page content, add some below";
        } else {
          pages = this.props.sectionContent.pages.map((page, index) => (
            <div key={index} className="EditableSectionPage">
              <Link to={`/courseeditor/${page._id}/pageeditor`}>
                {page.pageTitle}
              </Link>
            </div>
          ));
        }

        //tie it all together

        sectionContent = (
          <div className="EditableSectionContent">
            <div className="EditableSectionDescription">
              <div>{description}</div>
              <form onSubmit={this.updateDescriptionHelper.bind(this)}>
                <Input
                  placeholder="edit description"
                  defaultValue={this.props.sectionContent.description}
                  title="Edit description"
                />
              </form>
            </div>
            <div className="EditableSectionPages">
              <div>
                {pages}
                {this.props.creatingPage ? <LoadSpinner /> : ""}
              </div>
              <form
                className="createPageForm"
                onSubmit={this.createPageHelper.bind(this)}
              >
                <Input title="Create new page" placeholder="page title" />
              </form>
            </div>
          </div>
        );
        ///////////////////////////////////
        //to actually edit course content//
        ///////////////////////////////////
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
          <div className="truncate">{this.props.sectionTitle}</div>
          <div>
            {" "}
            <i
              className={`fas ${
                this.props.expanded ? "fa-caret-down" : "fa-caret-left"
              }`}
            />{" "}
          </div>
        </div>
        <div
          className={`sectionContentEditorContainer ${
            this.props.expanded ? "" : "hidden"
          }`}
        >
          {sectionContent}
        </div>
      </div>
    );
  }
}

export default EditableSection;
