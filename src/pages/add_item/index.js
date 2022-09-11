import { React, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function AddItem() {
  const itemInfo = {
    title: "",
    subtitle: "",
    brand: "",
    category: "",
    describtion: "",
    options: {
      prices: [],
      images: [],
    },
  };
  const [item, setItem] = useState(itemInfo);

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  }

  function onChangeHandlerPrices() {
    for (var i = 0; i < 5; i++) {
      if (
        document.getElementsByName(`price${i}`)[0].value !== "" &&
        document.getElementsByName(`ml${i}`)[0].value !== ""
      ) {
        var objPrices = {
          price: parseInt(document.getElementsByName(`price${i}`)[0].value),
          ml: parseInt(document.getElementsByName(`ml${i}`)[0].value),
        };
        item.options.prices.push(objPrices);
      }
      if (document.getElementsByName(`img${i}`)[0].value !== "") {
        item.options.images.push(
          document.getElementsByName(`img${i}`)[0].value
        );
      }
      setItem(item);
    }
    addItem();
    window.location.reload();
  }

  const addItem = async () => {
    try {
      axios.post("https://khoaperfumeonline.herokuapp.com/addItem", {
        title: item.title,
        subtitle: item.subtitle,
        category: item.category,
        brand: item.brand,
        options: item.options,
      });
    } catch (error) {
      console.log("fail to add item");
    }
  };

  return (
    <div style={{ display: "grid" }}>
      <label>
        Title:
        <input type="text" name="title" onChange={onChangeHandler}></input>
      </label>
      <label>
        Subtitle:
        <input type="text" name="subtitle" onChange={onChangeHandler}></input>
      </label>
      <label>
        Brand:
        <input type="text" name="brand" onChange={onChangeHandler}></input>
      </label>
      <label>
        Category:
        <input type="text" name="category" onChange={onChangeHandler}></input>
      </label>
      <label>
        Describtion:
        <input
          type="text"
          name="describtion"
          onChange={onChangeHandler}
        ></input>
      </label>
      <span style={{ fontWeight: 600, fontSize: "20px" }}>Options</span>
      <span style={{ fontWeight: 600 }}>Prices</span>

      <div className="additem_prices">
        <label>
          prices: <input type="text" name="price0"></input>
          ml: <input type="text" name="ml0"></input>
        </label>
      </div>
      <div className="additem_prices">
        <label>
          prices: <input type="text" name="price1"></input>
          ml: <input type="text" name="ml1"></input>
        </label>
      </div>
      <div className="additem_prices">
        <label>
          prices: <input type="text" name="price2"></input>
          ml: <input type="text" name="ml2"></input>
        </label>
      </div>
      <div className="additem_prices">
        <label>
          prices: <input type="text" name="price3"></input>
          ml: <input type="text" name="ml3" i></input>
        </label>
      </div>
      <div className="additem_prices">
        <label>
          prices: <input type="text" name="price4"></input>
          ml: <input type="text" name="ml4"></input>
        </label>
      </div>
      <span style={{ fontWeight: 600 }}>Images</span>
      <label>
        image link: <input type="text" name="img0"></input>
      </label>
      <label>
        image link: <input type="text" name="img1"></input>
      </label>
      <label>
        image link: <input type="text" name="img2"></input>
      </label>
      <label>
        image link: <input type="text" name="img3"></input>
      </label>
      <label>
        image link: <input type="text" name="img4"></input>
      </label>

      <button style={{ width: "100px" }} onClick={onChangeHandlerPrices}>
        Add Item
      </button>
    </div>
  );
}
