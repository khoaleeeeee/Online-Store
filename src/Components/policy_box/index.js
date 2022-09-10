import React from "react";
import "./style.css";

export default function PolicyBox() {
  return (
    <div>
      <div className="policy_box">
        <input type="checkbox" />
        <label>
          I have read and accept the{" "}
          <span style={{ color: "red", cursor: "pointer" }}>
            privacy policy
          </span>
        </label>
      </div>
    </div>
  );
}
