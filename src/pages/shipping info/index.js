import React, { useState } from "react";
import Confirmation from "../../Components/confirmation";
import Footer from "../../Components/footer";
import HeaderCheckout from "../../Components/header_checkout";
import Payment from "../../Components/payment";
import PersonalInfo from "../../Components/personal info";
import ProcessBarCustom from "../../Components/processbar";
import "./style.css";

export default function ShippingInfo() {
  const userInfo = {
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    address_1: "",
    address_2: "",
    country: "",
    region: "",
    city: "",
    zip: "",
    phone: "",
    fax: "",
    shipping_method: "",
    payment_method: null,
  };

  const [percent, setPercent] = useState("0");
  const [pageChange, setPageChange] = useState(1);
  const [userEnter, setUserEnter] = useState(userInfo);
  const [orderNumber, setOrderNumber] = useState(
    Math.floor(100000 + Math.random() * 900000)
  );

  return (
    <div className="shipping_info">
      <HeaderCheckout />
      <div className="progress" style={{ position: "relative", top: "120px" }}>
        <ProcessBarCustom
          percent={percent}
          item_1={"Shipping"}
          item_2={"Payment"}
          item_3={"Confirmation"}
        />
      </div>
      {pageChange === 1 && (
        <PersonalInfo
          setPercent={setPercent}
          setUserEnter={setUserEnter}
          userEnter={userEnter}
          setPageChange={setPageChange}
        />
      )}
      {pageChange === 2 && (
        <Payment
          userEnter={userEnter}
          setUserEnter={setUserEnter}
          setPageChange={setPageChange}
          setPercent={setPercent}
          orderNumber={orderNumber}
        />
      )}

      {pageChange === 3 && (
        <Confirmation
          userEnter={userEnter}
          orderNumber={orderNumber}
          setPercent={setPercent}
        />
      )}
      <Footer marginTop="30vh" />
    </div>
  );
}
