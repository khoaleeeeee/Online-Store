import React, { useRef, useState } from "react";
import "./style.css";
import Search from "../../svg/Search";
import Cart from "../../svg/Cart";
import PopUp from "../cartPopup";
import useClickOutside from "../helper/useClickOutside";
import axios from "axios";
import SearchComp from "../search";
import Logo from "../../svg/Logo";
import { useSelector } from "react-redux";

export default function Header({ numberOfItems }) {
  const [cartVisible, setCartVisible] = useState(false);
  const cartPopup = useRef(null);
  const [totalQuan, setTotalQuan] = useState(0);

  useClickOutside(cartPopup, () => {
    setCartVisible(false);
  });
  const { user } = useSelector((user) => ({ ...user }));

  const getItems = async () => {
    try {
      const { data } = await axios.post("http://localhost:8001/getCartItems", {
        user_id: user._id,
      });
      var updateQuan = 0;
      if (data) {
        data.map((item, index) => {
          updateQuan += item.quantity;
        });
        setTotalQuan(updateQuan);
      }
    } catch (error) {
      console.log("header fail");
    }
  };
  if (user) {
    getItems();
  }

  return (
    <div className="header_wapper">
      <SearchComp />
      <div className="header">
        <div className="header_items">
          <a href="/" className="logo" style={{ marginLeft: "0%" }}>
            <Logo />
          </a>

          <a href="/" className="item hover2">
            Home
          </a>
          <a className="item hover2" href="/products/all/all">
            Products
          </a>
          <a className="item hover2" href="/">
            About
          </a>
          <a className="item hover2" href="/order">
            My Orders
          </a>
          {user ? (
            <a className="item hover2" href="/account">
              Hi {user.personal_info.first_name}
            </a>
          ) : (
            <a className="item hover2" href="/signin">
              Sign In
            </a>
          )}
          <div className="cart" ref={cartPopup}>
            <a
              className="item hover2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                if (cartVisible) {
                  setCartVisible(false);
                } else {
                  setCartVisible(true);
                }
              }}
            >
              <div className="numberOfItems">{totalQuan}</div>
              <Cart />
            </a>
            {cartVisible && <PopUp setCartVisible={setCartVisible} />}
          </div>
        </div>
      </div>
    </div>
  );
}
