import React, { Component } from "react";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import "./PageEditor.css";
import { Link } from "react-router-dom";

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
  render() {
    if (
      this.props.loadingPageContent ||
      (!this.props.loadingPageContent && !this.props.loadedPageContent)
    ) {
      return <LoadSpinner />;
    } else {
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
            {this.props.pageContent.pageTitle}
          </div>
          <div>{this.props.pageContent.pageDescription}</div>
        </div>
      );
    }
  }
}

export default PageEditor;
