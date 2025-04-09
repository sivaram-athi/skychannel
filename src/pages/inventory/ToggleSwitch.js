import React from "react";
import "./ToggleSwitch.css"; // Create a CSS file for styling the toggle switch

const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;