import React from "react";
import "./product.css";

import { useStateValue } from "../Context/StateProvider";

function ProductAdd({ title, image, description, id, url, price }) {
  const [{ basket }, dispatch] = useStateValue();
  // console.log("this is basket", basket);

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          <p style={{ fontSize: "12px" }}>{description}</p>
        </div>
      </div>
      <img src={image} alt="product Image" />

      <a href={url} target="_blank">
        <button
          style={{
            backgroundColor: "#F0C14B",
            borderRadius: "2px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          go to website
        </button>
      </a>
    </div>
  );
}

export default ProductAdd;
