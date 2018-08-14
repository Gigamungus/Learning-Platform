import React, { Component } from "react";
import "./PageViewerIndex.css";
import LoadSpinner from "../../LoadSpinner/LoadSpinner";
import { Link } from "react-router-dom";

class PageViewerIndex extends Component {
  componentDidMount() {
    if (!this.props.loadedPages) {
      this.props.loadPages(
        this.props.position,
        this.props.sectionId,
        this.props.JWT
      );
      this.persistentLoadPages = setInterval(() => {
        this.props.loadPages(
          this.props.position,
          this.props.sectionId,
          this.props.JWT
        );
      }, 500);
    }
  }
  componentWillReceiveProps(props) {
    if (props.loadedPages) {
      clearInterval(this.persistentLoadPages);
    }
  }
  render() {
    return (
      <div className="PageViewerIndex">
        {this.props.loadedPages ? (
          this.props.pages.map((page, index) => {
            return (
              <div key={index} className="PageTitle">
                <Link to={`/courses/${this.props.courseId}/page/${page._id}`}>
                  {page.pageTitle}
                </Link>
              </div>
            );
          })
        ) : (
          <LoadSpinner />
        )}
      </div>
    );
  }
}
export default PageViewerIndex;
