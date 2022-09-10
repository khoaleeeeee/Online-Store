import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/footer";
import HeaderCheckout from "../../Components/header_checkout";
import Spinner from "../../Components/spinner";
import { getCartItems, titleFormat } from "../../functions/functions";
import "./style.css";

export default function Checkout() {
  const { user } = useSelector((user) => ({ ...user }));

  const [itemList, setItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const getItemList = async () => {
    setLoading(true);
    const data = await getCartItems(user._id);
    var tmp_subtotal = 0;

    if (itemList.length === 0) {
      setItemList(data);
      data.map((item, index) => {
        tmp_subtotal += item.quantity * item.price;
      });
      setSubtotal(tmp_subtotal);
      setTax(Math.round(tmp_subtotal * 0.075 * 100) / 100);
    }
    setLoading(false);
  };
  useEffect(() => {
    getItemList();
  }, []);

  return (
    <div className="checkout">
      <HeaderCheckout />
      <div className="content_wrapper">
        <div className="content_row_1">
          <div className="cart_label">Order Summary</div>
          <div className="line"></div>
          {loading && (
            <div
              style={{
                height: "20vh",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Spinner loading={true} />
            </div>
          )}
          {!loading && (
            <div className="item_field">
              {itemList.map((item, index) => (
                <div className="item_display_wrapper">
                  <div className="item_display" key={index}>
                    <div className="checkout_col_1">
                      <img src={item.img} alt="item_display" />
                      <div className="item_info">
                        <span className="item_title item_span">
                          {titleFormat(item.title)}
                        </span>
                        <span className="item_span">
                          {item.ml !== 0 && <span>{item.ml} ml</span>}
                        </span>
                        <span className="item_span">${item.price}</span>
                      </div>
                    </div>
                    <div
                      className="checkout_col_2"
                      style={{ fontWeight: "600" }}
                    >
                      Quantity:
                      <div
                        className="quantity"
                        style={{ paddingLeft: "5px", fontWeight: "500" }}
                      >
                        {item.quantity}
                      </div>
                    </div>
                    <div
                      className="checkout_col_3"
                      style={{ fontWeight: "600" }}
                    >
                      <div
                        className="total_price"
                        style={{ paddingLeft: "5px" }}
                      >
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                  <div className="line_item"></div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="content_row_2">
          <div className="col_1_row_2">
            <div className="additional_wrapper" style={{ display: "flex" }}>
              <span>Have questions? Call +1 (408)-455-3380</span>
              <span
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                  color: "blue",
                }}
              >
                Shipping policy
              </span>
            </div>
          </div>
          <div className="col_2_row_2">
            <div className="total_price_wrapper">
              <div className="total_price" style={{ padding: "1rem" }}>
                <div
                  className="subtotal_wrapper"
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Subtotal:
                  <span style={{ fontWeight: "500" }}>${subtotal}</span>
                </div>
                <div
                  className="shipping_wrapper"
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Shipping:
                  <span style={{ fontWeight: "500" }}>Free</span>
                </div>

                <div
                  className="tax_wrapper"
                  style={{
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Estimated tax:
                  <span style={{ fontWeight: "500" }}>${tax}</span>
                </div>
                <div className="line"></div>
                <div
                  className="total_wrapper"
                  style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  Total:
                  <span style={{ fontWeight: "600" }}>${tax + subtotal}</span>
                </div>
              </div>
            </div>
            <button
              className="continue"
              onClick={() => {
                navigate("/shipping-info");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      <Footer marginTop="10vh" />
    </div>
  );
}
