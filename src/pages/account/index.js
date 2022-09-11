import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer";
import Header from "../../Components/header";
import LoadingPage from "../../Components/loading_page";
import "./style.css";

export default function Account() {
  const [pickedOption, setPickedOption] = useState(0);
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      const { data } = await axios.post(
        "https://khoaperfumeonline.herokuapp.com/getAllOrders",
        {
          user_id: user._id,
        }
      );
      if (orders.length === 0) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  function getFormattedDate(date) {
    const newDate = new Date(date);
    return (
      newDate.getMonth() +
      1 +
      "/" +
      newDate.getDate() +
      "/" +
      newDate.getFullYear()
    );
  }

  getAllOrders();

  const account_options = [
    "My Account",
    "Order History",
    "Membership",
    "Rewards",
  ];
  return (
    <div className="account_wrapper">
      <Header />
      <div className="account_content">
        <div className="account_col1">
          <div className="account_col1_content">
            {account_options.map((option, index) => (
              <div
                className="account_option_wrapper"
                onClick={() => setPickedOption(index)}
              >
                {pickedOption === index && <div className="red_mark"></div>}
                <span
                  style={{
                    margin: "0.5rem",
                    marginLeft: "1.5rem",
                    fontWeight: `${pickedOption === index ? 600 : 500}`,
                  }}
                >
                  {option}
                </span>
              </div>
            ))}
            <div
              className="account_option_wrapper"
              onClick={() => {
                setPickedOption(account_options.length);
                Cookies.remove("user");
                navigate("/");
                window.location.reload();
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  margin: "0.5rem",
                  marginLeft: "1.5rem",
                  fontWeight: `${
                    pickedOption === account_options.length ? 600 : 500
                  }`,
                }}
              >
                Sign Out
              </span>
            </div>
          </div>
        </div>

        <div className="account_col2">
          {pickedOption === 0 && (
            <div className="account_col2_content_manage">
              <span style={{ fontWeight: 600, fontSize: "35px" }}>
                My Account
              </span>
              <span
                style={{ fontWeight: 600, fontSize: "20px", marginTop: "3rem" }}
              >
                Account Information
              </span>
              <div className="line" style={{ opacity: "0.5" }}></div>
              <span style={{ fontWeight: 600, fontSize: "16px" }}>
                Contact Information
              </span>
              <span className="margin_span">
                {user.personal_info.first_name} {user.personal_info.last_name}
              </span>
              <span className="margin_span">{user.personal_info.email}</span>

              <span
                style={{ fontWeight: 600, fontSize: "20px", marginTop: "3rem" }}
              >
                Address{" "}
                <span
                  style={{
                    color: "red",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: "15px",
                    marginLeft: "1rem",
                  }}
                >
                  Manage Address
                </span>
              </span>
              <div className="line" style={{ opacity: "0.5" }}></div>
              <span style={{ fontWeight: 600, fontSize: "16px" }}>
                Default Shipping Address
              </span>
              <span className="margin_span">
                {user.personal_info.first_name} {user.personal_info.last_name}
              </span>
              <span className="margin_span">
                {user.personal_info.address_1} {user.personal_info.address_2}
              </span>
              <span className="margin_span">
                {user.personal_info.city}, {user.personal_info.region}{" "}
                {user.personal_info.zip}
              </span>
              <span className="margin_span">{user.personal_info.country}</span>
              <span
                className="margin_span"
                style={{ color: "red", cursor: "pointer" }}
              >
                {user.personal_info.phone}
              </span>
              <div className="line" style={{ opacity: "0.5" }}></div>
            </div>
          )}

          {pickedOption === 1 && (
            <div className="account_col2_content_orders">
              <span style={{ fontWeight: 600, fontSize: "35px" }}>Orders</span>

              <table>
                <tr style={{ fontSize: "17px", fontWeight: 600 }}>
                  <td>Order #</td>
                  <td>Date</td>
                  <td>Ship To</td>
                  <td>Order Total</td>
                  <td>Action</td>
                </tr>

                {orders.map((order, index) => (
                  <tr>
                    <td>#{order.order_number}</td>
                    <td>{getFormattedDate(order.order_date)}</td>
                    <td>
                      {order.user.first_name} {order.user.last_name}
                    </td>
                    <td>${order.order_total}</td>
                    <td>
                      <span
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `/order-tracking/${order.user_id}/${order.order_number}`
                          );
                        }}
                      >
                        View Order
                      </span>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer marginTop="10vh" />
    </div>
  );
}
