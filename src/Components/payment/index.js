import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems } from "../../functions/functions";
import OrderSummaryBox from "../order summary box";
import PolicyBox from "../policy_box";
import "./style.css";

export default function Payment({
  setPageChange,
  setPercent,
  userEnter,
  setUserEnter,
  orderNumber,
}) {
  setPercent(50);
  const [visible, setVisible] = useState(0);
  const [total, setTotal] = useState(0);
  const { user } = useSelector((user) => ({ ...user }));

  const handleInput = (e) => {
    if (e.target.value === "card") {
      setVisible(1);
      setUserEnter({ ...userEnter, payment_method: "Credit Card" });
    } else if (e.target.value === "paypal") {
      setVisible(2);
      setUserEnter({ ...userEnter, payment_method: "PayPal" });
    }
  };
  const receiveOrder = async () => {
    const data = await getCartItems(user._id);
    var today = new Date();
    try {
      await axios.post("http://localhost:8001/addOrder", {
        order_total: total,
        user_id: user._id,
        order_date: today,
        order_number: orderNumber,
        items: data,
        user: userEnter,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment_wrapper">
      <div className="payment_box">
        <div className="payment_row_1">
          <span className="title_label">Payment</span>
          <div className="content_cols">
            <div className="col_1">
              <div className="line"></div>
              <div className="credit_payment">
                <label className="payment_input">
                  <div className="payment_input_items">
                    <input
                      type="radio"
                      name="method"
                      value="card"
                      onChange={handleInput}
                    />
                    Credit Card
                    <img
                      src="https://www.kindpng.com/picc/m/399-3995736_credit-card-payment-options-visa-mastercard-discover-logos.png"
                      alt="payment cards"
                    />
                  </div>
                </label>
              </div>
              {visible === 1 && (
                <div className="credit_payment_expand">
                  <div className="payment_form">
                    <div className="input_field">
                      <span className="input_label">Credit Card Number *</span>
                      <input
                        type="text"
                        className="payment_input_field"
                        placeholder="1111 1111 1111 1111"
                      />
                    </div>
                    <div className="input_field">
                      <span className="input_label">Expiration Date *</span>
                      <input
                        type="text"
                        className="payment_input_field"
                        style={{ width: "100px" }}
                        placeholder={"MM/YY"}
                      />
                    </div>
                    <div className="input_field">
                      <span className="input_label">Validation Code *</span>
                      <div className="validation">
                        <input
                          type="text"
                          className="payment_input_field"
                          style={{ width: "70px", marginRight: "10px" }}
                          placeholder="123"
                        />
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Icon-round-Question_mark.svg"
                          alt="question mark"
                          style={{
                            width: "25px",
                            height: "25px",
                            opacity: "0.5",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <PolicyBox />

                  <button
                    className="black_long_btn"
                    onClick={() => {
                      receiveOrder();
                      setPageChange(3);
                    }}
                  >
                    Place Order
                  </button>
                </div>
              )}

              <div className="line" style={{ opacity: "0.5" }}></div>
              <div className="paypal_payment">
                <label className="payment_input">
                  <div className="payment_input_items">
                    <input
                      type="radio"
                      name="method"
                      value="paypal"
                      onChange={handleInput}
                    />
                    PayPal
                    <img
                      src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                      alt="paypal logo"
                    />
                  </div>
                </label>
              </div>

              {visible === 2 && (
                <div className="paypal_expand">
                  <div className="policy" style={{ marginTop: "1rem" }}>
                    {" "}
                    <input type="checkbox" />
                    <label>
                      I have read and accept the{" "}
                      <span style={{ color: "red", cursor: "pointer" }}>
                        privacy policy
                      </span>
                    </label>
                  </div>

                  <button className="black_long_btn paypal">
                    <img
                      className="btn_img"
                      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                      alt="paypal button"
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="col_2">
              <OrderSummaryBox
                userEnter={userEnter}
                includeShipTo={true}
                setTotal={setTotal}
                total={total}
              />
            </div>
          </div>
        </div>
        <button
          className="previous_btn black_long_btn"
          onClick={() => {
            setPageChange(1);
          }}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
