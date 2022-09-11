import axios from "axios";
import React, { useState } from "react";
import Header from "../../Components/header";
import InputField from "../../Components/input_field";
import PolicyBox from "../../Components/policy_box";
import PopupAlert from "../../Components/popupAlert";
import Spinner from "../../Components/spinner";
import Cookies from "js-cookie";

import "./style.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer";
export default function SignIn() {
  const [error, setError] = useState(false);
  const [cannotFind, setCannotFind] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitSignIn = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://khoaperfumeonline.herokuapp.com/signin",
        {
          email: email,
          password: password,
        }
      );
      setLoading(false);
      console.log(response.data);
      dispatch({ type: "LOGIN", payload: response.data });
      Cookies.set("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setLoading(false);

      console.log(error.response.data.message);
      setCannotFind(error.response.data.message);
    }
  };

  const onSubmitHandler = () => {
    if (email === "" || password === "") {
      setError(true);
    } else {
      setError(false);
      onSubmitSignIn();
    }
  };

  return (
    <div className="signin_wrapper">
      <Header />
      {loading && (
        <div className="spinner_loader">
          <div className="cannot_find_background"></div>
          <div className="error_box">
            <div className="loader_container">
              <Spinner loading={true} />
            </div>
          </div>
        </div>
      )}
      {cannotFind && (
        <PopupAlert
          message_1={cannotFind}
          message_2={
            "Please double check your information OR create new account."
          }
          setCannotFind={setCannotFind}
        />
      )}

      <div className="signin_content">
        <div className="signin_col1">
          <span style={{ fontWeight: 600, fontSize: "30px" }}>
            Customer Sign In
          </span>
          <div className="line"></div>
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
          <span style={{ marginTop: "0.5rem" }}>
            If you have an account, sign in with your email address.
          </span>
          <InputField
            label="Email"
            require={true}
            name="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputField
            label="Password"
            type="password"
            require={true}
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <PolicyBox />
          <button
            style={{ width: "10rem" }}
            className="black_long_btn"
            onClick={() => onSubmitHandler()}
          >
            Sign In
          </button>
          <span style={{ color: "red", fontSize: "14px", marginTop: "1rem" }}>
            * Required Fields
          </span>
        </div>
        <div className="signin_col2">
          <span style={{ fontWeight: 600, fontSize: "30px" }}>
            New Customers
          </span>
          <div className="line" style={{ marginTop: "-1.1rem" }}></div>
          <span>
            Creating an account has many benefits: check out faster, keep more
            than one address, track orders and more.
          </span>
          <button
            style={{ width: "11rem", height: "2.5rem" }}
            className="black_long_btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Create An Account
          </button>
        </div>
      </div>
      <Footer marginTop="60vh" />
    </div>
  );
}
