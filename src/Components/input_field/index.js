import React from "react";
import "./style.css";

export default function InputField({
  label,
  value,
  name,
  onChange,
  require,
  type,
}) {
  return (
    <div>
      <div className="input_field_wrapper">
        <span className="input_label">
          {label} {require && <span style={{ color: "red" }}>*</span>}
        </span>
        <input
          type={type ? type : "text"}
          className="ship_input"
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
