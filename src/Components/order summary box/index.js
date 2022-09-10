import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCartItems, titleFormat } from "../../functions/functions";
import "./style.css";

export default function OrderSummaryBox({
  includeShipTo,
  userEnter,
  setTotal,
  total,
}) {
  const [itemList, setItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const { user } = useSelector((user) => ({ ...user }));
  const shipping = () => {
    if (userEnter.shipping_method == "Economy") {
      return 0;
    } else if (userEnter.shipping_method == "Standard") {
      return 5;
    } else if (userEnter.shipping_method == "Priority") {
      return 10;
    } else {
      return 20;
    }
  };
  const getItemList = async () => {
    const data = await getCartItems(user._id);
    var tmp_subtotal = 0;

    if (itemList.length === 0) {
      setItemList(data);
      data.map((item, index) => {
        tmp_subtotal += item.quantity * item.price;
      });
      setSubtotal(tmp_subtotal);
      setTax(Math.round(tmp_subtotal * 0.075 * 100) / 100);
      if (total === 0) {
        const tmp_total =
          tmp_subtotal +
          shipping() +
          Math.round(tmp_subtotal * 0.075 * 100) / 100;
        setTotal(tmp_total);
      }
    }
  };
  useEffect(() => {
    if (itemList.length === 0) {
      getItemList();
    }
  }, []);

  return (
    <div className="summary_box">
      <div className="summary_content">
        <span>Order Summary</span>
        <div className="line" style={{ opacity: 0.5 }}></div>
        <div className="summany_line">
          <span style={{ fontSize: "16px", fontWeight: 600 }}>Subtotal: </span>
          <span style={{ fontSize: "16px" }}>${subtotal}</span>
        </div>
        <div className="summany_line">
          <span style={{ fontSize: "16px", fontWeight: 600 }}>
            Shipping: ({userEnter.shipping_method})
          </span>
          <span style={{ fontSize: "16px" }}>${shipping()}</span>
        </div>
        <div className="summany_line">
          <span style={{ fontSize: "16px", fontWeight: 600 }}>Tax: </span>
          <span style={{ fontSize: "16px" }}>${tax}</span>
        </div>
        <div className="line" style={{ opacity: 0.5 }}></div>
        <div className="summany_line">
          <span style={{ fontSize: "16px", fontWeight: 600 }}>Total: </span>
          <span style={{ fontSize: "16px" }}>
            ${tax + shipping() + subtotal}
          </span>
        </div>
        <div className="line" style={{ opacity: 0.5 }}></div>

        <div className="item_summary">
          {itemList.map((item, index) => (
            <div className="each_item_summary">
              <img
                style={{ width: "30px", borderRadius: "0px" }}
                src={item.img}
                alt="img"
              />
              <span style={{ fontSize: "16px", fontWeight: 600 }}>
                {titleFormat(item.title)} -{" "}
                <span style={{ fontSize: "16px", fontWeight: 500 }}>
                  {item.ml !== 0 && <span>{item.ml} ml</span>}
                </span>
              </span>
              <span style={{ fontSize: "16px" }}>${item.price}</span>
            </div>
          ))}
        </div>
      </div>

      {includeShipTo && (
        <div className="ship_to">
          <span style={{ fontSize: "20px" }}>Ship To:</span>
          <div className="line" style={{ opacity: "0.5" }}></div>

          <span>
            {userEnter.first_name} {userEnter.last_name}
          </span>
          <span>{userEnter.address_1} </span>
          <span>{userEnter.address_2} </span>
          <span>
            {userEnter.city}, {userEnter.region} {userEnter.zip}
          </span>
          <span>{userEnter.country}</span>
          <span style={{ color: "red", cursor: "pointer" }}>
            {userEnter.phone}
          </span>
        </div>
      )}
    </div>
  );
}
