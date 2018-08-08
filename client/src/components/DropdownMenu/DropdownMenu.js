import "./DropdownMenu.css";
import React from "react";

const DropdownMenu = ({
  name,
  id,
  options,
  multiple,
  required,
  size,
  title
}) => {
  return (
    <div className="DropdownMenu">
      <label className="DropdownTitle">{title}</label>
      <select
        className="DropdownSelect"
        name={name}
        id={id}
        multiple={multiple}
        required={required}
        size={size}
      >
        {options
          ? options.map((option, index) => (
              <option key={index} value={option.toLowerCase()}>
                {option}
              </option>
            ))
          : ""}
      </select>
    </div>
  );
};

export default DropdownMenu;
