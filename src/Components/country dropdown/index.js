import React, { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import "./style.css";
export default function CountrySelector({ userEnter, setUserEnter }) {
  const country_style = {
    background: "#f1f1f1",
    border: "1px solid #c4c6ca",
    height: "2.3rem",
    width: "255px",
    marginRight: "5rem",
  };

  const region_style = {
    background: "#f1f1f1",
    border: "1px solid #c4c6ca",
    height: "2.3rem",
    width: "257px",
    marginRight: "5rem",
  };

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  return (
    <div className="country_region">
      <div className="input_field">
        <span className="input_label">
          Country <span style={{ color: "red" }}>*</span>
        </span>
        <CountryDropdown
          style={country_style}
          value={country}
          onChange={(val) => {
            setCountry(val);
            setUserEnter({ ...userEnter, country: val });
          }}
        />
      </div>
      <div className="input_field">
        <span className="input_label">
          Region, State or Province <span style={{ color: "red" }}>*</span>
        </span>
        <RegionDropdown
          style={region_style}
          value={region}
          country={country}
          onChange={(val) => {
            setRegion(val);
            setUserEnter({ ...userEnter, region: val });
          }}
        />
      </div>
    </div>
  );
}
