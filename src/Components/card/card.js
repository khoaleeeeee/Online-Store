import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { titleFormat } from "../../functions/functions";
import "./style.css";

export default function CardComp({ title, image_1, image_2, price, name }) {
  const [changeImg, setChangeImg] = useState(image_1);
  return (
    <div className="single_card">
      <Card border="dark" style={{ width: "15rem" }}>
        <div className="thumbnail">
          <Card.Img
            variant="top"
            src={changeImg}
            onMouseOver={() => setChangeImg(image_2)}
            onMouseLeave={() => setChangeImg(image_1)}
          />
        </div>

        <Card.Body>
          <Card.Title>
            <span className="title">{titleFormat(title)}</span>
          </Card.Title>
          <Card.Text>
            <div className="price_tag">
              <span>{name !== 0 && <span>{name} ml</span>}</span>
              <span>${price}</span>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
