import React, { Component } from "react";
import LoadSpinner from "../../../LoadSpinner/LoadSpinner";
import "./PageEditor.css";
import { Link } from "react-router-dom";
import TextArea from "./../../../TextArea/TextArea";
import Input from "./../../../Input/Input";
import Button from "../../../Button/Button";
import DropdownMenu from "./../../../DropdownMenu/DropdownMenu";
import PageTextElementEditor from "./../PageElementEditor/PageTextElementEditor/PageTextElementEditor";
import PageImageElementEditor from "./../PageElementEditor/PageImageElementEditor/PageImageElementEditor";
import PageYoutubeVideoElementEditor from "./../PageElementEditor/PageYoutubeVideoElementEditor/PageYoutubeVideoElementEditor";

class PageEditor extends Component {
  constructor(props) {
    super(props);
    this.pageContent = React.createRef();
    this.contentTypeRef = React.createRef();
  }
  componentDidMount() {
    this.props.getPageContent(this.props.match.params.pageId, this.props.JWT);
    this.persistentGetPageContent = setInterval(() => {
      this.props.getPageContent(this.props.match.params.pageId, this.props.JWT);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.persistentGetPageContent);
    this.props.changeContentToAddType("text");
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

  changeContentTypeHelper(e) {
    this.props.changeContentToAddType(e.target.value);
  }

  updateTextHelper(e) {
    e.preventDefault();
    console.log(e.target.children[0].innerHTML);
  }
  render() {
    if (
      this.props.loadingPageContent ||
      (!this.props.loadingPageContent && !this.props.loadedPageContent)
    ) {
      return <LoadSpinner />;
    } else {
      let pageContent = this.props.pageContent.elements.map(
        (element, index) => {
          switch (element.sectionType.toLowerCase()) {
            case "text":
              return (
                <PageTextElementEditor
                  key={index}
                  text={element.sectionContent}
                  updateFunction={this.updateTextHelper.bind(this)}
                />
              );
            case "image":
              return (
                <PageImageElementEditor
                  key={index}
                  imageURL={element.sectionContent}
                />
              );
            case "youtube-video":
              return (
                <PageYoutubeVideoElementEditor
                  key={index}
                  videoURL={element.sectionContent}
                />
              );
            default:
              return "unsupported content-type";
          }
        }
      );

      let contentInputOptions = {
        text: <TextArea placeholder="enter text content here" rows="5" />,
        image: <Input placeholder="enter image URL here" />,
        "youtube-video": <Input placeholder="enter youtube video link here" />
      };

      let contentInput = contentInputOptions[this.props.contentToAddType];

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

          <div className="titleAndDescriptionEditors">
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
          </div>

          <div className="pageContentEditor">
            <div ref={this.pageContent}>{pageContent}</div>
            <form onSubmit={this.addSectionHelper.bind(this)}>
              <DropdownMenu
                ref={this.contentTypeRef}
                title="content-type"
                options={["text", "image", "youtube-video"]}
                onchange={this.changeContentTypeHelper.bind(this)}
              />

              <div>{contentInput}</div>

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
