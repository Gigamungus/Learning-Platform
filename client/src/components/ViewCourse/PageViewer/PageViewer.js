import React, { Component } from "react";
import LoadSpinner from "./../../LoadSpinner/LoadSpinner";
import "./PageViewer.css";
import PageTextElementViewer from "./PageElementViewer/PageTextElementViewer/PageTextElementViewer";
import PageImageElementViewer from "./PageElementViewer/PageImageElementViewer/PageImageElementViewer";
import PageYoutubeVideoElementViewer from "./PageElementViewer/PageYoutubeVideoElementViewer/PageYoutubeVideoElementViewer";

class PageViewer extends Component {
  componentDidMount() {
    console.log(this.props);
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
      let pageContent = this.props.pageContent.elements.map(
        (element, index) => {
          switch (element.sectionType.toLowerCase()) {
            case "text":
              return (
                <PageTextElementViewer
                  key={index}
                  text={element.sectionContent}
                />
              );
            case "image":
              return (
                <PageImageElementViewer
                  key={index}
                  imageURL={element.sectionContent}
                />
              );
            case "youtube-video":
              return (
                <PageYoutubeVideoElementViewer
                  key={index}
                  videoURL={element.sectionContent}
                />
              );
            default:
              return "unsupported content-type";
          }
        }
      );

      return (
        <div className="PageViewer">
          <div className="titleAndDescriptionViewer">
            <div className="pageTitleViewer">
              {this.props.pageContent.pageTitle}
            </div>

            <div className="pageDescriptionViewer">
              {this.props.pageContent.pageDescription}
            </div>
          </div>

          <div className="pageContentViewer">
            <div>{pageContent}</div>
          </div>
        </div>
      );
    }
  }
}

export default PageViewer;
