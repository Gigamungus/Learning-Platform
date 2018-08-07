import "./TextArea.css";
import React from "react";

const TextArea = ({
  name = "",
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
      <p className="AreaName">{name}</p>
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
