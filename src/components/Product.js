import React, { useContext } from "react";
import "./product.css";

import Usercontext from "../Context/user";
import { activeUserContext } from "../Context/activeUserContext";
import firebase from "firebase";

function Product({
  title,
  image,
  price,
  rating,
  id,
  details,
  category,
  seller,
  seller_uid,
}) {
  const user = useContext(Usercontext);
  const activeUser = useContext(activeUserContext);

  const addToBasket = async () => {
    if (user && activeUser) {
      let addItem = {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
        details: details,
        seller: seller,
        category: category,
        seller_uid: seller_uid,
      };

      let basketupdate = [...activeUser[0].basket, addItem];

      const response = await firebase
        .firestore()
        .collection("users")
        .doc(activeUser[0].id);

      await response.update({
        basket: basketupdate,
      });
    } else {
      alert("login First Then add item in basket");
    }
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <b style={{ fontSize: "14px" }}>price: </b>
          <strong style={{ fontSize: "14px" }}>${price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="product Image" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
