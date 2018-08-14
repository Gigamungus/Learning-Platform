import React from "react";
import "./PageTextElementEditor.css";

const PageTextElementEditor = ({ text, updateFunction }) => {
  return (
    <div className="PageTextElementEditor">
      <form onSubmit={updateFunction}>
        <p>{text}</p>
      </form>
    </div>
  );
};

export default PageTextElementEditor;
