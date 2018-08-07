import React, { Component } from "react";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import "./PageEditor.css";
import { Link } from "react-router-dom";
import TextArea from "./../../../TextArea/TextArea";
import Input from "./../../../Input/Input";

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
            <h2>{this.props.pageContent.pageTitle}</h2>
            <form>
              <Input placeholder="change page name" />
            </form>
          </div>

          <div className="pageDescriptionEditor">
            <p>{this.props.pageContent.pageDescription}</p>
            <form>
              <TextArea
                rows="4"
                placeholder="change page description"
                name="change description"
                defaultvalue={this.props.pageContent.pageDescription}
              />
            </form>
          </div>

          <div className="pageContentEditor">
            <p>{pageContent}</p>
            <form>
              <Input placeholder="content type" />
              <TextArea name="content" placeholder="content" />
            </form>
          </div>
        </div>
      );
    }
  }
}

export default PageEditor;
