import "./TextArea.css";
import React from "react";

const TextArea = ({
  name = "",
  title,
  id,
  columns,
  rows,
  maxlength,
  errorMessage = "",
  placeholder,
  onchange,
  defaultvalue
}) => {
  return (
    <div className="TextArea">
      <label className="AreaName" style={{ display: title ? "block" : "none" }}>
        {title}
      </label>
      <textarea
        className="Area"
        name={name}
        id={id}
        cols={columns}
        rows={rows}
        maxLength={maxlength}
        placeholder={placeholder}
        onChange={onchange}
        defaultValue={defaultvalue}
      />
      <p className="AreaError">{errorMessage}</p>
    </div>
  );
};

export default TextArea;
