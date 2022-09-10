import React, { useState } from "react";
import CardComp from "../card/card";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Cards() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);

  const getItems = async () => {
    axios
      .get(`https://aqueous-basin-40901.herokuapp.com/getItemList`)
      .then((res) => {
        console.log(res.data);
        setItemList(res.data);
      });
  };
  if (itemList.length === 0) {
    getItems();
  }

  return (
    <div className="card_wappper">
      <div className="cards">
        {itemList.map((item, index) => (
          <div
            className="card"
            onClick={() => {
              navigate(`items/${item.title}`);
            }}
          >
            <CardComp
              title={item.title}
              image_1={item.options.images[0]}
              image_2={item.options.images[1]}
              price={item.options.prices[0].price}
              name={item.options.prices[0].ml}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
