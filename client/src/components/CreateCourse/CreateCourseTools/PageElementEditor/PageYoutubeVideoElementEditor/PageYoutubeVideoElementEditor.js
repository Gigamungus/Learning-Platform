import React from "react";
import "./PageYoutubeVideoElementEditor.css";

const PageYoutubeVideoElementEditor = ({ videoURL }) => {
  if (videoURL.indexOf("https://www.youtube.com/") !== 0) {
    return "bad URL";
  } else if (videoURL.indexOf("https://www.youtube.com/embed/") !== 0) {
    videoURL = videoURL.split("watch?v=");
    videoURL = [videoURL[0], "embed/", videoURL[1]].join("");
  }
  return (
    <div className="PageYoutubeVideoElementEditor">
      <iframe
        title={videoURL}
        src={videoURL}
      />
    </div>
  );
};

export default PageYoutubeVideoElementEditor;
