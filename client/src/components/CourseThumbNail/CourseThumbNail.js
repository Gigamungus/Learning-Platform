import React, { Component } from "react";
import "./CourseThumbNail.css";
import { Link } from "react-router-dom";

class CourseThumbNail extends Component {
  render() {
    return (
      <div className="CourseThumbNail">
        <Link to={`/courses/${this.props.pageSrc}`}>
          <div className="title">{this.props.title}</div>
          <br />
          <img src={this.props.img} alt="thumbnail" />
          <br />
          <div className="uploader">{this.props.uploader}</div>
          <br />
          <div className="views">{this.props.views} views</div>
        </Link>
      </div>
    );
  }
}

export default CourseThumbNail;
