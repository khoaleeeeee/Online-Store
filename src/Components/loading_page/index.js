import React from "react";
import Spinner2 from "../spinner_2";
import "./style.css";

export default function LoadingPage() {
  return (
    <div>
      <div className="error_page_background">
        <div className="loading_spinner_center">
          <Spinner2 />
        </div>
      </div>
    </div>
  );
}
