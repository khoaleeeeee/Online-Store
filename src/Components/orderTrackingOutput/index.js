import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { titleFormat } from "../../functions/functions";
import Header from "../header";
import LoadingPage from "../loading_page";
import "./style.css";

export default function OrderTrackingOutput() {
  const orderInfo = {
    user_id: "",
    order_number: "",
    order_date: null,
    order_total: 0,
    user: {
      shipping_method: "",
    },
    items: [],
  };
  const { userid, ordernumber } = useParams();
  const nav = useNavigate();
  const [order, setOrder] = useState(orderInfo);
  const [loading, setLoading] = useState(false);

  const banner_url =
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.216/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dwc3e4e1fa/images/banners/my-orders_d.png?yocs=s_";

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getOrderByParams = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8001/order-tracking/${userid}/${ordernumber}`
      );

      setOrder(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getOrderByParams();
  }, []);

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  var order_date = new Date(order.order_date);

  const getEstimatedDate = () => {
    if (order.user.shipping_method === "Economy") {
      return [addDays(order_date, 10), addDays(order_date, 15)];
    } else if (order.user.shipping_method === "Standard") {
      return [addDays(order_date, 5), addDays(order_date, 10)];
    } else if (order.user.shipping_method === "Priority") {
      return [addDays(order_date, 2), addDays(order_date, 3)];
    } else {
      return [addDays(order_date, 1), addDays(order_date, 2)];
    }
  };

  const estimatedDelivery = getEstimatedDate();
  const date1 = estimatedDelivery[0].getDate();
  const month1 = monthNames[estimatedDelivery[0].getMonth()];
  const year1 = estimatedDelivery[0].getFullYear();

  const date2 = estimatedDelivery[1].getDate();
  const month2 = monthNames[estimatedDelivery[1].getMonth()];
  const year2 = estimatedDelivery[1].getFullYear();

  return (
    <div className="tracking_output_page">
      {loading && <LoadingPage />}
      <Header />
      <img style={{ marginTop: "60px" }} src={banner_url} alt="" />
      <div className="order_wrapper">
        <span style={{ fontSize: "30px" }}>Order Details</span>
        <div className="order_line"></div>

        <div className="order_rows">
          <div className="gray_box">
            <div className="content_gray_box">
              <span style={{ marginTop: "1rem" }}>
                Date Placed{" "}
                <span style={{ marginLeft: "1rem", fontWeight: "600" }}>
                  {monthNames[order_date.getMonth()]} {order_date.getDate()}{" "}
                  {order_date.getFullYear()}
                </span>{" "}
              </span>

              <span style={{ marginTop: "1rem" }}>
                Estimated Delivery{" "}
                <span style={{ marginLeft: "1rem", fontWeight: "600" }}>
                  {month1} {date1} - {month2} {date2}
                </span>{" "}
              </span>
              <span style={{ marginTop: "1rem" }}>
                Order Number{" "}
                <span style={{ marginLeft: "1rem", fontWeight: "600" }}>
                  #{order.order_number}
                </span>{" "}
              </span>
            </div>
          </div>

          <div className="white_box">
            <div className="flex_container">
              <div className="track_col1">
                <span style={{ fontWeight: 600 }}>Ship To</span>
                <span style={{ marginTop: "1rem" }}>
                  {order.user.first_name} {order.user.last_name}
                </span>
                <span style={{ marginTop: "1rem" }}>
                  {order.user.address_1} {order.user.address_2}
                </span>
                <span style={{ marginTop: "1rem" }}>
                  {order.user.city}, {order.user.region} {order.user.zip}
                </span>
                <span style={{ marginTop: "1rem" }}>{order.user.country}</span>
                <span style={{ marginTop: "1rem" }}>
                  Phone: {order.user.phone}
                </span>
              </div>
              <div className="track_col2">
                <span style={{ fontWeight: 600 }}>Shipping Method</span>
                <span>{order.user.shipping_method}</span>
                <span style={{ fontWeight: 600 }}>Payment Method</span>
                <span>{order.user.payment_method}</span>
              </div>
            </div>
          </div>
        </div>

        <span style={{ fontSize: "30px", marginTop: "2rem" }}>Your Items</span>
        <div className="order_line"></div>
        <div className="shipping_banner">
          <span>
            {" "}
            <img
              style={{
                width: "50px",
                height: "50px",
              }}
              src="https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.216/on/demandware.static/Sites-BathAndBodyWorks-Site/-/default/dw50701435/images/svg-icons/ShippingTruck.svg?yocs=o_s_"
              alt=""
            />
          </span>
          <span
            style={{ marginTop: "1rem", marginLeft: "1rem", fontWeight: 600 }}
          >
            Shipping
          </span>

          <span style={{ marginTop: "1rem", marginLeft: "1rem" }}>
            via {order.user.shipping_method}
          </span>
        </div>

        <div className="item_flex_banner">
          <span style={{ fontWeight: 600 }}>ITEM</span>
          <span style={{ fontWeight: 600, marginLeft: "12rem" }}>QTY</span>
          <span style={{ fontWeight: 600 }}>PRICE</span>
        </div>
        <div className="order_line splitted_item"></div>
        {order.items.map((item, index) => (
          <div className="item_info_display">
            <div className="item_info_wrapper_display">
              <div className="img_and_info">
                <img
                  style={{ width: "100px", height: "100px", borderRadius: "0" }}
                  src={item.img}
                  alt=""
                />
                <div className="row_display_info">
                  <span style={{ fontWeight: "600", width: "7rem" }}>
                    {" "}
                    {titleFormat(item.title)}
                  </span>
                  <span>{item.ml !== 0 && <span>{item.ml} ml</span>} </span>
                </div>
              </div>

              <span className="quan_pos">{item.quantity}</span>
              <span className="price_pos">${item.price}</span>
            </div>
          </div>
        ))}
        <button
          style={{ width: "50%", marginLeft: "25%" }}
          className="black_long_btn"
          onClick={() => {
            nav("/");
          }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
