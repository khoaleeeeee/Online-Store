import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { titleFormat } from "../../functions/functions";
import "./style.css";

export default function PopUp({ setCartVisible }) {
  const { user } = useSelector((user) => ({ ...user }));
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState(0);
  const [test, setTest] = useState(1);
  const navigate = useNavigate();

  const getItems = async () => {
    try {
      const { data } = await axios.post(
        "hhttps://khoaperfumeonline.herokuapp.com/getCartItems",
        {
          user_id: user._id,
        }
      );
      setItemList(data);
    } catch (error) {
      console.log(error.reponse.data.message);
    }
  };

  var cumulative = 0;
  if (itemList.length !== 0 && total === 0) {
    itemList.map((item, index) => {
      cumulative += item.quantity * item.price;
    });
    setTotal(cumulative);
  }

  const [quanList, setQuanList] = useState([]);
  const tmp_quanList = [];
  if (itemList.length !== 0 && quanList.length === 0) {
    itemList.map((item, index) => {
      tmp_quanList.push(item.quantity);
    });
    setQuanList(tmp_quanList);
  }

  const onUpdateSubmit = async () => {
    try {
      itemList.map((item, index) => {
        if (itemList.length !== 0 && quanList.length !== 0) {
          axios.post("https://khoaperfumeonline.herokuapp.com/updateCart", {
            user_id: user._id,
            title: item.title,
            newQuan: quanList[index],
            ml: item.ml,
          });
        }
      });
    } catch (error) {
      console.log("fail at onUpdateSubmit");
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="popup_wrapper">
      <span className="cart_title">Cart</span>
      {itemList.length === 0 && (
        <div className="empty_cart">
          <span>Your shopping cart is empty</span>

          <button onClick={() => setCartVisible(false)}>
            Continue Shopping
          </button>
        </div>
      )}

      {itemList.length !== 0 && (
        <div className="popup">
          <div className="content">
            {itemList.map((item, index) => (
              <div className="cart_item_wrap">
                <div className="cart_item">
                  <img src={item.img} alt="cart item's image" />
                  <div className="title_and_option">
                    <span
                      style={{
                        fontWeight: "600",
                        width: "7rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(`/items/${item.title}`);
                        window.location.reload();
                      }}
                    >
                      {titleFormat(item.title)}
                    </span>
                    <span>{item.ml !== 0 && <span>{item.ml} ml</span>}</span>
                  </div>
                  <span>Qty: </span>

                  <input
                    id={`quan_control_${index}`}
                    type="text"
                    className="quan_control"
                    value={quanList[index]}
                  />
                  <div className="add_minus">
                    <button
                      className="add_minus_btn"
                      onClick={() => {
                        quanList[index] += 1;
                        setQuanList(quanList);
                        setTest(test + 1);
                      }}
                    >
                      +
                    </button>
                    <button
                      className="add_minus_btn"
                      onClick={() => {
                        if (quanList[index] > 0) {
                          quanList[index] -= 1;
                          setQuanList(quanList);
                          setTest(test - 1);
                        }
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div
                  className="remove"
                  onClick={() => {
                    quanList[index] = 0;
                    setQuanList(quanList);
                    onUpdateSubmit();
                    window.location.reload();
                  }}
                >
                  remove
                </div>
                <div className="line"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {itemList.length !== 0 && (
        <div className="total_amount">
          <span style={{ fontWeight: "600" }}>Total: </span>
          <span>${total}</span>
        </div>
      )}

      {itemList.length !== 0 && (
        <div className="btn_wrap">
          <button
            className="update btn"
            onClick={() => {
              onUpdateSubmit();
              window.location.reload();
            }}
          >
            Update
          </button>
          <button
            className="checkout btn"
            onClick={() => navigate("/checkout")}
          >
            Check Out
          </button>
        </div>
      )}
    </div>
  );
}
