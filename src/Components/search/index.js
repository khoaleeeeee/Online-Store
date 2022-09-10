import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { titleFormat } from "../../functions/functions";
import Search from "../../svg/Search";
import useClickOutside from "../helper/useClickOutside";
import "./style.css";

export default function SearchComp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [hisSearchVisible, setHisSeachVisible] = useState(false);
  const searchHis = useRef(null);
  const navigate = useNavigate();
  useClickOutside(searchHis, () => {
    setHisSeachVisible(false);
  });

  const searchHandler = async () => {
    if (searchTerm === "") {
      setResult([]);
    } else {
      const res = await search(searchTerm);
      setResult(res);
    }
  };

  const search = async (searchTerm) => {
    try {
      const { data } = await axios.post(
        `http://localhost:8001/search/${searchTerm}`,
        {}
      );
      return data;
    } catch (error) {
      return error.response.data.message;
    }
  };

  return (
    <div className="search_wrapper">
      <div className="search" ref={searchHis}>
        <div
          ref={searchHis}
          className="search_field"
          onClick={() => {
            if (hisSearchVisible) {
              setHisSeachVisible(false);
            } else {
              setHisSeachVisible(true);
            }
          }}
        >
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyUp={searchHandler}
          />
        </div>

        {hisSearchVisible &&
          (searchTerm === "" ? (
            <div className="search_history">
              <span style={{ paddingLeft: "5%", marginTop: "5%" }}>
                Type something to search...
              </span>
            </div>
          ) : (
            <div className="search_history">
              {result.map((item, index) => (
                <div
                  className="item_search"
                  onClick={() => {
                    navigate(`/items/${item.title}`);
                    window.location.reload();
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src={item.options.images[0]} alt="item_search" />
                  <span>{titleFormat(item.title)}</span>
                  <div className="line"></div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
