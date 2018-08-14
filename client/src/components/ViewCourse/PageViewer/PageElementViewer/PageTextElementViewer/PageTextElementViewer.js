import React from "react";
import "./PageTextElementViewer.css";

const PageTextElementViewer = ({ text }) => {
  return (
    <div className="PageTextElementViewer">
      <p>{text}</p>
    </div>
  );
};

export default PageTextElementViewer;
