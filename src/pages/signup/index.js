import axios from "axios";
import React, { useState } from "react";
import CountrySelector from "../../Components/country dropdown";
import Footer from "../../Components/footer";
import Header from "../../Components/header";
import InputField from "../../Components/input_field";
import PolicyBox from "../../Components/policy_box";
import PopupAlert from "../../Components/popupAlert";
import "./style.css";

export default function SignUp() {
  const signin_info = {
    email: "",
    password: "",
  };
  const personalInfo = {
    first_name: "",
    last_name: "",
    email: "",
    address_1: "",
    address_2: "",
    country: "",
    region: "",
    city: "",
    zip: "",
    phone: "",
    company: "",
    shipping_method: "",
    payment_method: null,
  };

  const [userEnter, setUserEnter] = useState(personalInfo);
  const [signinInfo, setSigninInfo] = useState(signin_info);
  const [error, setError] = useState(false);
  const [popup, setPopup] = useState(false);
  const [exist, setExist] = useState(false);

  function onChangePersonalInfo(e) {
    const { name, value } = e.target;

    setUserEnter({ ...userEnter, [name]: value });
  }
  function onChangeSigninInfo(e) {
    const { name, value } = e.target;
    if (name === "email") {
      setUserEnter({ ...userEnter, [name]: value });
    }
    setSigninInfo({ ...signinInfo, [name]: value });
  }
  const accountExist = async () => {
    try {
      const { data } = await axios.post(
        "hhttps://khoaperfumeonline.herokuapp.com/account-exist",
        {
          email: signinInfo.email,
        }
      );
      return data;
    } catch (error) {
      console.log("fail sign up/ account exist ");
    }
  };

  function onSubmitHandler() {
    try {
      axios.post("https://khoaperfumeonline.herokuapp.com/signup", {
        signin_info: signinInfo,
        personal_info: userEnter,
      });
    } catch (error) {
      console.log("fail at sign up");
    }
  }

  function checkError() {
    if (
      signinInfo.email === "" ||
      signinInfo.password === "" ||
      userEnter.first_name === "" ||
      userEnter.last_name === "" ||
      userEnter.email === "" ||
      userEnter.address_1 === "" ||
      userEnter.country === "" ||
      userEnter.region === "" ||
      userEnter.city === "" ||
      userEnter.zip === "" ||
      userEnter.phone === ""
    ) {
      setError(true);
      window.scrollTo(0, 0);
    } else if (accountExist()) {
      setExist(true);
    } else {
      setPopup(true);
      onSubmitHandler();
      setError(false);
    }
    window.scrollTo(0, 0);
  }

  return (
    <div>
      <Header />
      {popup && (
        <PopupAlert
          toSignIn={true}
          message_1="Account has been created successfully."
          message_2="Please Sign In."
          success={true}
        />
      )}
      {exist && (
        <PopupAlert
          toSignIn={false}
          message_1="Your email already exists."
          message_2="Try another email OR go to Sign In"
          success={false}
          setCannotFind={setExist}
        />
      )}
      <div className="signup_wrapper">
        <span className="signup_title">Create New Account</span>

        <div style={{ marginBottom: "2rem" }} className="line"></div>
        {error && (
          <span style={{ color: "red", marginBottom: "1rem" }}>
            * Fields are required
          </span>
        )}
        <span className="signup_subtitle">Sign In Info</span>
        <InputField
          label="Email"
          name="email"
          require={true}
          onChange={onChangeSigninInfo}
        />
        <InputField
          label="Password"
          name="password"
          require={true}
          type="password"
          onChange={onChangeSigninInfo}
        />
        <span style={{ marginTop: "3rem" }} className="signup_subtitle">
          Shipping Info
        </span>
        <div style={{ display: "flex" }}>
          <InputField
            label="First Name"
            name="first_name"
            require={true}
            onChange={onChangePersonalInfo}
          />
          <InputField
            label="Last Name"
            name="last_name"
            require={true}
            onChange={onChangePersonalInfo}
          />
        </div>
        <InputField label="Company" name="company" require={false} />
        <div style={{ display: "flex" }}>
          <InputField
            label="Address 1"
            name="address_1"
            require={true}
            onChange={onChangePersonalInfo}
          />
          <InputField
            label="Address 2"
            name="address_2"
            require={false}
            onChange={onChangePersonalInfo}
          />
        </div>

        <div style={{ marginTop: "1.5rem" }}>
          <CountrySelector setUserEnter={setUserEnter} userEnter={userEnter} />
        </div>
        <InputField
          label="City"
          name="city"
          require={true}
          onChange={onChangePersonalInfo}
        />
        <InputField
          label="Zip"
          name="zip"
          require={true}
          onChange={onChangePersonalInfo}
        />
        <InputField
          label="Phone Number"
          name="phone"
          require={true}
          onChange={onChangePersonalInfo}
        />

        <PolicyBox />
        <button
          style={{ width: "15%" }}
          className="black_long_btn"
          onClick={checkError}
        >
          Sign Up
        </button>
      </div>
      <Footer marginTop="10vh" />
    </div>
  );
}
