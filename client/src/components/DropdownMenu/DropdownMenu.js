import "./DropdownMenu.css";
import React, { Component } from "react";

class DropdownMenu extends Component {
  render() {
    return (
      <div className="DropdownMenu">
        <label className="DropdownTitle">{this.props.title}</label>
        <select
          className="DropdownSelect"
          name={this.props.name}
          id={this.props.id}
          multiple={this.props.multiple}
          required={this.props.required}
          size={this.props.size}
          onChange={this.props.onchange}
        >
          {this.props.options
            ? this.props.options.map((option, index) => (
                <option key={index} value={option.toLowerCase()}>
                  {option}
                </option>
              ))
            : ""}
        </select>
      </div>
    );
  }
}

export default DropdownMenu;
