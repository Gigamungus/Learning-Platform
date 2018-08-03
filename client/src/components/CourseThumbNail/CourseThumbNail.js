import React, { Component } from "react";
import "./CourseThumbNail.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MSToDateString from "./../../functions/MSToDateString";

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
          <div className="dateCreated">
            {MSToDateString(this.props.dateCreated)}
          </div>
        </Link>
      </div>
    );
  }
}

CourseThumbNail.propTypes = {
  pageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  uploader: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  dateCreated: PropTypes.string.isRequired
};

export default CourseThumbNail;
