import React, { Component } from "react";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import "./PageEditor.css";
import { Link } from "react-router-dom";
import TextArea from "./../../../TextArea/TextArea";
import Input from "./../../../Input/Input";
import Button from "../../../Button/Button";

class PageEditor extends Component {
  componentDidMount() {
    this.props.getPageContent(this.props.match.params.pageId, this.props.JWT);
    this.persistentGetPageContent = setInterval(() => {
      this.props.getPageContent(this.props.match.params.pageId, this.props.JWT);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.persistentGetPageContent);
  }
  componentWillReceiveProps(props) {
    if (props.loadedPageContent) {
      clearInterval(this.persistentGetPageContent);
    }
  }
  changeTitleHelper(e) {
    e.preventDefault();
    this.props.changePageTitle(
      this.props.match.params.pageId,
      this.props.JWT,
      e.target[0].value
    );
  }
  changeDescriptionHelper(e) {
    e.preventDefault();
    this.props.changePageDescription(
      this.props.match.params.pageId,
      this.props.JWT,
      e.target[0].value
    );
  }
  addSectionHelper(e) {
    e.preventDefault();
    this.props.addPageSection(this.props.match.params.pageId, this.props.JWT, {
      sectionType: e.target[0].value,
      sectionContent: e.target[1].value
    });
  }
  render() {
    if (
      this.props.loadingPageContent ||
      (!this.props.loadingPageContent && !this.props.loadedPageContent)
    ) {
      return <LoadSpinner />;
    } else {
      let pageContent = "hello";
      return (
        <div className="PageCreator">
          <div>
            <Link
              to={`/courseeditor/${
                this.props.pageContent.parentCourse
              }/sectioneditor`}
            >
              go back to editing section
            </Link>
          </div>

          <div className="pageTitleEditor">
            <h2>
              {this.props.editingTitle ? (
                <LoadSpinner />
              ) : (
                this.props.pageContent.pageTitle
              )}
            </h2>
            <form onSubmit={this.changeTitleHelper.bind(this)}>
              <Input placeholder="change page name" />
              <Button type="submit" text="update title" />
            </form>
          </div>

          <div className="pageDescriptionEditor">
            <div>
              {this.props.editingDescription ? (
                <LoadSpinner />
              ) : (
                this.props.pageContent.pageDescription
              )}
            </div>
            <form onSubmit={this.changeDescriptionHelper.bind(this)}>
              <TextArea
                rows="4"
                placeholder="change page description"
                name="change description"
                defaultvalue={this.props.pageContent.pageDescription}
              />
              <Button type="submit" text="update description" />
            </form>
          </div>

          <div className="pageContentEditor">
            <div>
              {pageContent}
              {this.props.addingElement ? <LoadSpinner /> : ""}
            </div>
            <form onSubmit={this.addSectionHelper.bind(this)}>
              <Input placeholder="content type" />
              <TextArea name="content" placeholder="content" />
              <Button type="submit" text="create new element" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default PageEditor;
