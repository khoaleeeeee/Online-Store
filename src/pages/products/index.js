import React, { useEffect, useState } from "react";
import CardComp from "../../Components/card/card";
import axios from "axios";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Components/header";
import SlidePhotos from "../../Components/slidePhotos";
import Footer from "../../Components/footer";
import { capitalize } from "lodash";

export default function Product() {
  const navigate = useNavigate();
  const [itemList, setItemList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const category = useParams().category;
  const brand = useParams().brand;

  const getByCategory = async (cat) => {
    try {
      const temp_cat = [];
      const temp_brand = [];
      const { data } = await axios.post(
        `https://khoaperfumeonline.herokuapp.com/products/${category}/${brand}`,
        {
          category: cat,
        }
      );
      setItemList(data);

      data.map((item, index) => {
        temp_brand.push(item.brand);
        temp_cat.push(item.category);
        setBrands(temp_brand);
        setCategories(temp_cat);
      });
    } catch (error) {
      console.log("fail at get category");
    }
  };

  if (itemList.length === 0) {
    getByCategory();
  }

  const cat_count = {};
  const brand_count = {};
  categories.forEach((item) => (cat_count[item] = (cat_count[item] || 0) + 1));
  brands.forEach((item) => (brand_count[item] = (brand_count[item] || 0) + 1));

  return (
    <div className="card_wappper">
      <Header />
      <SlidePhotos />

      <div className="product_container">
        <div className="filter_boxes">
          <div className="category_box">
            <div className="category_content">
              <span style={{ fontSize: "22px", fontWeight: 600 }}>
                Categories
              </span>
              <div
                className="category_item"
                onClick={() => {
                  navigate(`../products/all/all`);
                  window.location.reload();
                }}
              >
                <span>View All</span>
              </div>
              {[...new Set(categories)].map((item, index) => (
                <div
                  className="category_item"
                  onClick={() => {
                    navigate(`../products/${item}/${brand}`);
                    window.location.reload();
                  }}
                >
                  <span>
                    {capitalize(item)} <span>({cat_count[item]})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="brand_box">
            <div className="brand_content">
              <span style={{ fontSize: "22px", fontWeight: 600 }}>Brands</span>
              <select
                name="brand"
                id="brand"
                onChange={(e) => {
                  navigate(`../products/${category}/${e.target.value}`);
                  window.location.reload();
                }}
              >
                <option value="all">All</option>
                {[...new Set(brands)].map((brand, index) => (
                  <option value={brand}>{brand}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="product_cards">
          {itemList.map((item, index) => (
            <div
              className="card"
              onClick={() => {
                navigate(`../items/${item.title}`);
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

      <Footer marginTop="20vh" />
    </div>
  );
}
