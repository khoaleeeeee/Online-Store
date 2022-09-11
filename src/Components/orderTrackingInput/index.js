import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopupAlert from "../popupAlert";
import Spinner from "../spinner";
import "./style.css";

export default function OrderTrackingInput({
  banner_url,
  setSwitchPage,
  order,
  setOrder,
}) {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [cannotFind, setCannotFind] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();
  const findOrder = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://khoaperfumeonline.herokuapp.com/findOrder",
        {
          email: email,
          order_number: orderNumber,
          user_id: user._id,
        }
      );
      if (!order) {
        setOrder(data);
      }
      setLoading(false);
      //setSwitchPage(2);
      navigate(`/order-tracking/${user._id}/${orderNumber}`);
    } catch (error) {
      setLoading(false);
      setErrorVisible(false);
      console.log(error.response.data.message);
      setCannotFind(error.response.data.message);
    }
  };

  const onSubmitCheck = () => {
    if (orderNumber === "" || email === "") {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      findOrder();
    }
  };

  return (
    <div>
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
          setCannotFind={setCannotFind}
          message_1={cannotFind}
          message_2={"Please double check your infomation."}
        />
      )}

      <img style={{ marginTop: "60px" }} src={banner_url} alt="" />
      <div className="order_wrapper">
        <span style={{ fontSize: "30px" }}>Order Tracking</span>
        <div className="order_line"></div>
        <span style={{ fontSize: "14px", color: "red" }}>* Required</span>

        <div className="order_box">
          {errorVisible && (
            <span style={{ color: "red", fontSize: "17px" }}>
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
          <div className="order_inputs_container">
            <div className="order_input">
              <span className="input_label">Order Number *</span>
              <input
                type="text"
                className="payment_input_field"
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </div>
            <div className="order_input">
              <span className="input_label">Email *</span>
              <input
                type="text"
                className="payment_input_field"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <span
            style={{
              fontSize: "13px",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Privacy Policy
          </span>

          <button
            style={{ width: "30%" }}
            className="black_long_btn"
            onClick={onSubmitCheck}
          >
            Check Status
          </button>
          <span style={{ fontSize: "14px", padding: "2rem" }}>
            After your order ships, tracking information may take 48 hours to
            appear. But don’t worry! It’s on the way.
          </span>
        </div>
      </div>
    </div>
  );
}
