import React, { useContext } from "react";

import "./checkoutproduct.css";
import * as ROUTES from "../constants/constant";
import { Link } from "react-router-dom";

import { activeUserContext } from "../Context/activeUserContext";
import Usercontext from "../Context/user";
import firebase from "firebase";

function CheckOutProduct({
  id,
  image,
  title,
  price,
  rating,
  show,
  category,
  details,
  deleteitem,
}) {
  // const [{ basket }, dispatch] = useStateValue();
  const user = useContext(Usercontext);
  const activeUser = useContext(activeUserContext);

  const removeFromBasket = async () => {
    const index = activeUser[0].basket.findIndex(
      (basketItem) => basketItem.id === id
    );
    let newBasket = [...activeUser[0].basket];
    if (index >= 0) {
      newBasket.splice(index, 1);
      await firebase
        .firestore()
        .collection("users")
        .doc(activeUser[0].id)
        .update({
          basket: newBasket,
        });
    } else {
      console.warn(
        `cant nt remove product id: ${id} because it is not in basket`
      );
    }
  };

  const DeleteFromShop = async () => {
    await firebase.firestore().collection("products").doc(id).delete();
  };

  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct__image" src={image} />
      {user && activeUser ? (
        <div className="checkoutproduct__info">
          <p className="checkoutProduct__title"> {title}</p>
          {deleteitem === "canbe" && activeUser ? (
            <button
              style={{
                backgroundColor: "#f268a4",
                borderRadius: "2px",
                border: "1px solid red",
                cursor:'pointer'
              }}
              onClick={DeleteFromShop}
            >
              Delete from shop
            </button>
          ) : null}

          <p className="checkoutproduct__price">
            <b style={{ marginRight: "3px" }}>$</b>
            <strong>{price}</strong>
          </p>
          <div className="checkoutproduct__rating">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <p key={i}>⭐</p>
              ))}
          </div>
          {show === "show" ? (
            <Link to={ROUTES.SALESORDER}>
              <button className="busketButton">Go to Sales and order</button>
            </Link>
          ) : (
            <button
              onClick={removeFromBasket}
              className="busketButton"
              disabled={!activeUser}
            >
              Remove from Basket
            </button>
          )}
          <p style={{ fontSize: "13px", marginBottom: "10px" }}>
            <b style={{ fontSize: "14px" }}>Category : </b>
            {category}
          </p>
          <p style={{ fontSize: "13px" }}>
            <b style={{ fontSize: "14px" }}>Details : </b>
            {details}
          </p>
        </div>
      ) : (
        <h3>You are not Valid Customer</h3>
      )}
    </div>
  );
}

export default CheckOutProduct;
