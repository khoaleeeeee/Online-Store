import React, { useState } from "react";
import Footer from "../../Components/footer";
import Header from "../../Components/header";
import OrderTrackingInput from "../../Components/orderTrackingInput";
import OrderTrackingOutput from "../../Components/orderTrackingOutput";
import "./style.css";

export default function Order() {
  const [switchPage, setSwitchPage] = useState(1);
  const [order, setOrder] = useState(null);
  const banner_url =
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.216/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw290ae529/images/banners/order-status-banner-asset_d.svg?yocs=s_";

  return (
    <div className="order_page">
      <Header />

      {switchPage === 1 && (
        <OrderTrackingInput
          banner_url={banner_url}
          setSwitchPage={setSwitchPage}
          order={order}
          setOrder={setOrder}
        />
      )}
      {switchPage === 2 && (
        <OrderTrackingOutput
          setSwitchPage={setSwitchPage}
          order={order}
          setOrder={setOrder}
        />
      )}

      <Footer />
    </div>
  );
}
