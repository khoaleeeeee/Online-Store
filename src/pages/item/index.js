import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/header";
import useClickOutside from "../../Components/helper/useClickOutside";
import "./style.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { titleFormat } from "../../functions/functions";
import PopupAlert from "../../Components/popupAlert";
import LoadingPage from "../../Components/loading_page";

export default function Item() {
  const itemName = useParams().item;
  const [item, setItem] = useState(null);
  const { user } = useSelector((user) => ({ ...user }));

  const getItems = async () => {
    try {
      const { data } = await axios.get(
        `https://khoaperfumeonline.herokuapp.com/items/${itemName}`
      );
      setItem(data);
    } catch (error) {
      console.log("failed at item index");
    }
  };

  const navItems = [
    "DESCRIPTION",
    "OLDFACTORY NOTES",
    "PERFUMER'S WORD",
    "OLDFACTORY DESCRIPTION",
    "KNOW HOW",
  ];
  const [mainImg, setMainImg] = useState(null);
  const [optionVisible, setOptionVisible] = useState(false);
  const [navOption, setNavOption] = useState(0);
  const [inputVal, setInputVal] = useState(1);

  const [mainPrice, setMainPrice] = useState(null);
  const [subPrice, setSubPrice] = useState(null);
  const dropOption = useRef(null);
  const [cannotFind, setCannotFind] = useState(false);
  const [loading, setLoading] = useState(false);

  useClickOutside(dropOption, () => {
    setOptionVisible(false);
  });

  if (item === null) {
    getItems();
  }

  const updateStates = async () => {
    const mainImg = await item.options.images[0];
    const mainPrice_ = await item.options.prices[0];
    const subPrices_ = await item.options.prices.slice(
      1,
      item.options.prices.length
    );
    setMainImg(mainImg);
    setMainPrice(mainPrice_);
    setSubPrice(subPrices_);
  };

  if (mainImg === null || mainPrice === null) {
    updateStates();
  }

  const addToCartSubmit = async () => {
    try {
      if (!user) {
        setCannotFind(true);
      } else {
        setLoading(true);
        axios.post("http://localhost:8001/addToCart", {
          user_id: user._id,
          title: item.title,
          img: mainImg,
          ml: mainPrice.ml,
          price: mainPrice.price,
          quantity: inputVal,
        });
        setLoading(false);
        window.location.reload();
      }
    } catch (error) {
      setLoading(false);
      console.log("fail");
    }
  };

  return (
    <div>
      {loading && <LoadingPage />}
      <Header />
      {cannotFind && (
        <PopupAlert
          message_1="Please Sign In or Create Account to continue"
          setCannotFind={setCannotFind}
          toSignIn={true}
        />
      )}
      {item !== null && (
        <div className="row">
          <div className="col_md">
            <div className="product_images">
              <img
                className="product_image  product-single__thumbnail-image"
                src={mainImg}
                alt="main"
              />
            </div>

            <div className="other_images">
              {item.options.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setMainImg(img);
                  }}
                />
              ))}
            </div>
          </div>

          <div className="col_md" style={{ paddingTop: "2em" }}>
            <div className="product_header">
              <h1>{titleFormat(item.title)}</h1>
              <h2>{item.subtitle}</h2>
            </div>
            <div className="form" ref={dropOption}>
              <div className="form_row1">
                <div className="option_box hover1">
                  <button
                    onClick={() =>
                      !optionVisible
                        ? setOptionVisible(true)
                        : setOptionVisible(false)
                    }
                  >
                    <div style={{ width: "100%" }}>
                      <span style={{ float: "left" }}>
                        {mainPrice?.ml !== 0 && <span>{mainPrice?.ml} ml</span>}
                      </span>
                      <span style={{ float: "right" }}>
                        ${mainPrice?.price}
                      </span>
                    </div>
                  </button>
                </div>
                {optionVisible && (
                  <div className="other_option_wrapper">
                    <div className="other_option_box">
                      {subPrice.map((item, i) => (
                        <div
                          className="option hover1"
                          style={{ width: "100%", padding: "10px" }}
                          onClick={() => {
                            const tmp = mainPrice;
                            setMainPrice(item);
                            setOptionVisible(false);
                            subPrice[i] = tmp;
                            setSubPrice(subPrice.sort());
                          }}
                        >
                          <span style={{ float: "left" }}> {item.ml}ml</span>
                          <span style={{ float: "right" }}>${item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="form_row2">
                <div className="input_control">
                  <button
                    className="control_btn"
                    onClick={() => {
                      if (inputVal > 1) {
                        setInputVal(inputVal - 1);
                      }
                    }}
                  >
                    -
                  </button>
                  <input
                    className="control"
                    type="text"
                    min="1"
                    max="5"
                    value={inputVal}
                  />
                  <button
                    className="control_btn"
                    onClick={() => {
                      if (inputVal < 99) {
                        setInputVal(inputVal + 1);
                      }
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="add_to_cart"
                  onClick={() => {
                    addToCartSubmit();
                  }}
                >
                  <span>Add to Cart</span>
                </button>
              </div>
              <div className="delivery">
                <a href="/">DELIVERY & RETURNS</a>
              </div>
            </div>
          </div>
          <div className="description_box">
            <div className="description nav_tab">
              {navItems.map((item, i) => (
                <div
                  key={i}
                  className="nav_items"
                  style={
                    navOption === i ? { borderBottom: "1.5px solid black" } : {}
                  }
                  onClick={() => setNavOption(i)}
                >
                  <h3>{item}</h3>
                </div>
              ))}
            </div>
            <div className="description_content">
              {navOption === 0 && (
                <p className={navOption === 0 ? "fadeIn" : ""}>
                  Sauvage is an act of creation inspired by wide-open spaces. An
                  ozone blue sky that dominates a white-hot rocky landscape. A
                  bold composition for a true-to-himself man.
                  <br />
                  <br />
                  "To create Sauvage, I used man as my starting point. A strong
                  and unmistakable masculinity. Like the image of a man who
                  transcends time and fashion."
                  <br />
                  <br />
                  François Demachy, Dior Perfumer-Creator
                </p>
              )}

              {navOption === 1 && (
                <p className={navOption === 1 ? "fadeIn" : ""}>
                  BERGAMOT FROM REGGIO DI CALABRIA:
                  <br />
                  For the house of Dior, François Demachy chose an exclusive
                  bergamot that he shaped with local producers to obtain a
                  "custom" signature. His bergamot is like a whirlwind of juicy
                  freshness that sweeps everything up in its path. Drenched in
                  the Calabrian sun, it is fruitier and develops unique,
                  slightly peppery and zesty facets.
                  <br />
                  <br />
                  AMBROXAN®: An ingredient of natural origin derived from
                  precious ambergris, it unfurls its marine woody notes, as
                  vivifying as the ocean spray. With the subtle attraction of
                  sun-bleached driftwood, it plays and driftwood, it leaves a
                  distinguished trail that never fades.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
