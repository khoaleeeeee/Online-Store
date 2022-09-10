import React from "react";
import Logo from "../../svg/Logo";
import "./style.css";

export default function Footer({ marginTop }) {
  return (
    <div className="foot_wrapper" style={{ marginTop: `${marginTop}` }}>
      <div className="footer_container_1">
        <div className="footer_content_1">
          <div style={{ width: "20%" }}>
            <span style={{ fontSize: "40px", fontWeight: 500 }}>
              Sign Up Today and Get 10% Off
            </span>
          </div>

          <div style={{ display: "grid", marginLeft: "3rem" }}>
            <span style={{ fontSize: "15px", width: "50%" }}>
              Get 10% Off Be among the first to receive exclusive updates and
              earn early access to product releases. You can unsubscribe at any
              time. Read our{" "}
              <span style={{ color: "red" }}>Privacy Policy</span> for more
              information. Enter your e-mail address and you’ll receive an email
              with a one-time 10% off coupon upon signup.
            </span>
            <div className="subscribe_input">
              <input
                type="text"
                placeholder="Enter your email address"
                className="subscribe_text"
              />
              <button
                style={{ width: "50px", height: "60%" }}
                className="subscribe"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/561/561127.png"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer_container_2">
        <div className="footer_content_2">
          <div className="footer_logo">
            <Logo color={"#FFFFFF"} />
            <span style={{ fontSize: "11px" }}>
              Copyright © 2022 KHOA PERFUME. All rights reserved.
            </span>
          </div>
          <div
            className="footer_product"
            style={{ display: "grid", width: "fit-content" }}
          >
            <span style={{ fontWeight: 600 }}>PRODUCTS</span>
            <span className="footer_item">Perfumes</span>
            <span className="footer_item">Accessories</span>
            <span className="footer_item">Bags</span>
            <span className="footer_item">Promotions</span>
            <span className="footer_item">Feedback</span>
          </div>

          <div className="footer_product" style={{ display: "grid" }}>
            <span style={{ fontWeight: 600 }}>CUSTUMER SERVICE</span>
            <span className="footer_item">Membership</span>
            <span className="footer_item">Privacy Policy</span>
            <span className="footer_item">Terms and Conditions</span>
            <span className="footer_item">Accessibility</span>
          </div>
        </div>
        <div className="social_medias">
          <span>STAY CONNECTED</span>
          <img
            className="sm_icon"
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt=""
          />

          <img
            className="sm_icon"
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt=""
          />
          <img
            className="sm_icon"
            src="https://cdn-icons-png.flaticon.com/512/3256/3256013.png"
            alt=""
          />
          <img
            className="sm_icon"
            src="https://cdn-icons-png.flaticon.com/512/3938/3938026.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
