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
      let pageContent = this.props.pageContent.elements.map(element => {
        console.log(element);
        return element.sectionContent;
      });
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
            <form onSubmit={this.changeTitleHelper.bind(this)}>
              <Input
                placeholder="change page name"
                defaultValue={this.props.pageContent.pageTitle}
                title="page title"
              />

              {this.props.editingTitle ? (
                <LoadSpinner />
              ) : (
                <Button type="submit" text="update title" />
              )}
            </form>
          </div>

          <div className="pageDescriptionEditor">
            <form onSubmit={this.changeDescriptionHelper.bind(this)}>
              <TextArea
                rows="4"
                placeholder="change page description"
                title="change description"
                defaultvalue={this.props.pageContent.pageDescription}
              />
              {this.props.editingDescription ? (
                <LoadSpinner />
              ) : (
                <Button type="submit" text="update description" />
              )}
            </form>
          </div>

          <div className="pageContentEditor">
            <div>{pageContent}</div>
            <form onSubmit={this.addSectionHelper.bind(this)}>
              <Input title="content" placeholder="content type" />
              <TextArea placeholder="content" rows="5" />

              {this.props.addingElement ? (
                <LoadSpinner />
              ) : (
                <Button type="submit" text="create new element" />
              )}
            </form>
          </div>
        </div>
      );
    }
  }
}

export default PageEditor;
