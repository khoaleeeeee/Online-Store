import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../functions/functions";
import OrderSummaryBox from "../order summary box";
import "./style.css";

export default function Confirmation({ userEnter, orderNumber, setPercent }) {
  const { user } = useSelector((user) => ({ ...user }));

  const navigate = useNavigate();
  setPercent(100);
  return (
    <div className="confirm_wrapper">
      <div className="confirm_label">
        <img
          style={{ width: "70px" }}
          src="https://upload.wikimedia.org/wikipedia/commons/5/50/Yes_Check_Circle.svg"
          alt="green check"
        />

        <div className="text_confirm">
          <span style={{ fontSize: "30px", marginLeft: "20px" }}>
            Thank you! Your Order Number is #{orderNumber}
          </span>
          <span style={{ marginLeft: "20px" }}>
            A confimation email has been sent to {userEnter.email}. Please check
            your email box.
          </span>
        </div>
      </div>
      <div className="confirm_and_summary">
        <div className="confirm_box">
          <div className="info_confirm">
            <div className="info_confirm_col1">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Customer Infomation
              </span>
              <div className="customer_information">
                <span className="confirm_cusInfo">
                  {userEnter.first_name} {userEnter.last_name}
                </span>
                <span className="confirm_cusInfo">{userEnter.email}</span>
                <span className="confirm_cusInfo">{userEnter.phone}</span>
              </div>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginTop: "2.5rem",
                }}
              >
                Payment Method
              </span>
              <div className="customer_information">
                <span className="confirm_cusInfo">
                  {userEnter.payment_method}
                </span>
              </div>
            </div>
            <div className="info_confirm_col2">
              <span style={{ fontSize: "18px", fontWeight: "600" }}>
                Delivery
              </span>
              <div className="customer_information">
                <span className="confirm_cusInfo_2">
                  {userEnter.first_name} {userEnter.last_name}
                </span>
                <span className="confirm_cusInfo_2">
                  {userEnter.address_1} {userEnter.address_2}
                </span>
                <span className="confirm_cusInfo_2">
                  {userEnter.city}, {userEnter.region} {userEnter.zip}{" "}
                  {userEnter.country}
                </span>
                <span className="confirm_cusInfo_2">{userEnter.phone}</span>
              </div>

              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginTop: "2rem",
                }}
              >
                Shipping Method
              </span>
              <div className="customer_information">
                <span className="confirm_cusInfo">
                  {userEnter.shipping_method}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="sum_box">
          <OrderSummaryBox userEnter={userEnter} />
        </div>
      </div>
      <button
        className="black_long_btn finish_btn"
        onClick={() => {
          navigate("/");
          emptyCart(user._id);
        }}
      >
        Continue Shopping
      </button>
    </div>
  );
}
