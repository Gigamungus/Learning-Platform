import React, { Component } from "react";
import "./SectionViewer.css";
import PageViewerIndexContainer from "./../PageViewerIndex/PageViewerIndexContainer";

class SectionViewer extends Component {
  toggleSelfExpandedHelper() {
    this.props.toggleSelfExpanded(this.props.position);
  }
  render() {
    return (
      <div className="SectionViewer">
        <div
          className="SectionHeader"
          onClick={this.toggleSelfExpandedHelper.bind(this)}
        >
          <div>{this.props.sectionTitle}</div>
          <i
            className={`fas ${
              this.props.expanded ? "fa-caret-down" : "fa-caret-left"
            }`}
          />
        </div>
        <div>
          {this.props.expanded ? (
            <PageViewerIndexContainer
              sectionId={this.props.sectionId}
              courseId={this.props.courseId}
              position={this.props.position}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default SectionViewer;
