import React from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../svg/Logo";
import "./style.css";

export default function HeaderCheckout() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div
        style={{
          width: "35px",
          height: "35px",
          marginRight: "92%",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate(-1);
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/54/54476.png"
          alt="back_button"
        />
      </div>

      <div
        style={{
          position: "absolute",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Logo />
      </div>
    </div>
  );
}
