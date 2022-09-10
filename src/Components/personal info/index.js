import React, { useState } from "react";
import { useSelector } from "react-redux";
import CountrySelector from "../country dropdown";
import InputField from "../input_field";
import "./style.css";

export default function PersonalInfo({
  setPercent,
  setUserEnter,
  userEnter,
  setPageChange,
}) {
  setPercent(0);
  const { user } = useSelector((user) => ({ ...user }));
  const {
    first_name,
    last_name,
    email,
    company,
    address_1,
    address_2,
    country,
    region,
    city,
    zip,
    phone,
    fax,
    shipping_method,
  } = userEnter;

  const [error, setError] = useState(false);
  const [inputsVisible, setInputsVisible] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserEnter({ ...userEnter, [name]: value });
  };

  const errorHandler = () => {
    if (user && !inputsVisible) {
      setUserEnter({ ...user.personal_info, shipping_method });
    }

    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      address_1 === "" ||
      country === "" ||
      region === "" ||
      city === "" ||
      zip === "" ||
      phone === "" ||
      shipping_method === ""
    ) {
      setError(true);
      window.scrollTo(0, 0);
    } else {
      setError(false);
      setPercent("50");
      setPageChange(2);
    }
  };

  return (
    <div className="per_info_wrapper">
      <div className="personal_box">
        <div className="per_row_1">
          {!inputsVisible && (
            <div className="logged_in_info">
              <span className="ship_label">Shipping Details</span>
              <span
                style={{
                  width: "fit-content",
                  marginTop: "2rem",
                  color: "red",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setInputsVisible(true);
                }}
              >
                Edit
              </span>
              <span style={{ marginTop: "1rem" }}>
                {user.personal_info.first_name} {user.personal_info.last_name}
              </span>
              <span style={{ marginTop: "1rem" }}>
                {user.personal_info.email}
              </span>
              <span style={{ marginTop: "1rem" }}>
                {user.personal_info.address_1} {user.personal_info.address_2}
              </span>
              <span style={{ marginTop: "1rem" }}>
                {user.personal_info.city}, {user.personal_info.region}{" "}
                {user.personal_info.zip}
              </span>
              <span style={{ marginTop: "1rem" }}>
                {user.personal_info.phone}
              </span>
            </div>
          )}

          {inputsVisible && (
            <div className="guest_inputs">
              <span className="ship_label">Shipping Details</span>
              {error && (
                <span style={{ color: "red", margin: "1rem", marginLeft: "0" }}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
                    alt=""
                    style={{
                      width: "20px",
                      height: "20px",
                      transform: `translate(${-3}px, ${3}px)`,
                    }}
                  />
                  Fields with * are required.
                </span>
              )}
              <div className="flex_wrapper">
                <InputField
                  label="First Name"
                  name="first_name"
                  onChange={handleRegisterChange}
                  require={true}
                />

                <InputField
                  label="Last Name"
                  name="last_name"
                  onChange={handleRegisterChange}
                  require={true}
                />
              </div>

              <InputField
                label="Email"
                name="email"
                onChange={handleRegisterChange}
                require={true}
              />

              <InputField
                label="Company"
                name="company"
                onChange={handleRegisterChange}
                require={false}
              />

              <div
                className="line"
                style={{ marginTop: "5%", opacity: "0.5" }}
              ></div>

              <div className="flex_wrapper">
                <InputField
                  label="Street Address: Line 1"
                  name="address_1"
                  onChange={handleRegisterChange}
                  require={true}
                />

                <InputField
                  label="Address Line 2"
                  name="address_2"
                  onChange={handleRegisterChange}
                  require={false}
                />
              </div>
              <div className="input_field_wrapper">
                <CountrySelector
                  setUserEnter={setUserEnter}
                  userEnter={userEnter}
                />
              </div>

              <div className="flex_wrapper">
                <InputField
                  label="City"
                  name="city"
                  onChange={handleRegisterChange}
                  require={true}
                />

                <InputField
                  label="Zip/Postal Code"
                  name="zip"
                  onChange={handleRegisterChange}
                  require={true}
                />
              </div>

              <InputField
                label="Phone Number"
                name="phone"
                onChange={handleRegisterChange}
                require={true}
              />

              <InputField
                label="Fax"
                name="fax"
                onChange={handleRegisterChange}
                require={false}
              />
            </div>
          )}

          <div
            className="line"
            style={{ marginTop: "5%", opacity: "0.5" }}
          ></div>

          <span style={{ marginTop: "3%", marginBottom: "3%" }}>
            Shipping Methods *
          </span>

          <label className="picker">
            <input
              type="radio"
              style={{ marginRight: "20px" }}
              name="shipping_method"
              onChange={handleRegisterChange}
              value="Economy"
            />
            $0.00 Economy - (5-15 days)
          </label>
          <label className="picker">
            <input
              type="radio"
              style={{ marginRight: "20px" }}
              name="shipping_method"
              value="Standard"
              onChange={handleRegisterChange}
            />
            $5.00 Standard - (3-5 days)
          </label>
          <label className="picker">
            <input
              type="radio"
              style={{ marginRight: "20px" }}
              onChange={handleRegisterChange}
              value="Priority"
              name="shipping_method"
            />
            $10.00 Priority - (1-2 days)
          </label>
          <label className="picker">
            <input
              type="radio"
              style={{ marginRight: "20px" }}
              name="shipping_method"
              value="Overnight"
              onChange={handleRegisterChange}
            />
            $20.00 Overnight
          </label>
        </div>
        <button
          className="black_long_btn continue_btn"
          onClick={() => {
            errorHandler();
          }}
        >
          Continue to payment
        </button>
      </div>
    </div>
  );
}
