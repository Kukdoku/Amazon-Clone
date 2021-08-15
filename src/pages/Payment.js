import { RouterSharp } from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import CheckOutProduct from "../components/CheckOutProduct";
import { getBasketTotal } from "../Context/reducer";

import Usercontext from "../Context/user";
import { Link, useHistory } from "react-router-dom";
import "./payment.css";
import * as ROUTES from "../constants/constant";

import CurrencyFormat from "react-currency-format";

import { activeUserContext } from "../Context/activeUserContext";
import firebase from "firebase";
var uniqid = require("uniqid");

function Payment() {
  const history = useHistory();

  const user = useContext(Usercontext);
  const activeUser = useContext(activeUserContext);

  const [basket, setBaseket] = useState([]);
  const [addressForm, setAddressForm] = useState(true);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (activeUser) {
      setBaseket(activeUser[0].basket);
    }
  }, [activeUser]);

  const PlaceOrder = async () => {
    if (activeUser[0].basket.length) {
      activeUser[0].basket.map((product) => {
        firebase
          .firestore()
          .collection("orders")
          .add({
            buyer: activeUser[0].username,
            buyer_uid: activeUser[0].userId,
            seller: product.seller,
            seller_uid: product.seller_uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            address: activeUser[0].address,
            title: product.title,
            rating: product.rating,
            detials: product.details,
            image: product.image,
            price: product.price,
            category: product.category,
            productDocId: product.id,
            status: ["order is placed"],
            dilivered: false,
          })
          .then(() => {
            firebase
              .firestore()
              .collection("users")
              .doc(activeUser[0].id)
              .update({
                basket: [],
              });
          })
          .then(() => history.push(ROUTES.SALESORDER))
          .catch((error) => alert(error.message));
      });
    } else {
      alert("basket is empty add item in basket");
    }
  };

  const ChangeAddress = async (e) => {
    e.preventDefault();
    await firebase
      .firestore()
      .collection("users")
      .doc(activeUser[0].id)
      .update({
        address: address,
      });
    setAddressForm(!addressForm);
  };

  return activeUser ? (
    <div className="payment">
      <div className="payment__container">
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          {addressForm ? (
            <div className="payment__address">
              <b>{user?.displayName}</b>
              <p style={{ fontWeight: "550" }}>{user?.email}</p>
              {activeUser[0].address ? (
                <p>{activeUser[0].address}</p>
              ) : (
                <p style={{ color: "red" }}>Type an Address</p>
              )}

              <button
                style={{
                  backgroundColor: "#F0C14B",
                  border: "1px solid yellow",
                  borderRadius: "2px",
                  marginTop: "20px",
                  cursor: "pointer",
                }}
                onClick={() => setAddressForm(!addressForm)}
              >
                ChangeAddress
              </button>
            </div>
          ) : (
            <div className="payment__address">
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: "300px",
                }}
                onSubmit={ChangeAddress}
              >
                <textarea
                  type="text"
                  value={address}
                  rows="4"
                  columns="10"
                  placeholder="write your delivery Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#F0C14B",
                    border: "1px solid #7d7b41",
                    marginTop: "10px",
                    marginBottom: "10px",
                    cursor: "pointer",
                  }}
                  disabled={!address}
                >
                  submit Address
                </button>
                <button
                  style={{
                    backgroundColor: "#f29d9d",
                    border: "1px solid red",
                    cursor: "pointer",
                  }}
                  onClick={() => setAddressForm(!addressForm)}
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
        <h1>
          CheckOut (<Link to={ROUTES.CHACKOUT}>{basket?.length}</Link>) items
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckOutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
                details={item.details}
                category={item.category}
                seller={item.seller}
                key={uniqid()}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>payment Method: </h3>
          </div>
          <div className="payment__details">
            <h5 style={{ marginBottom: "20px" }}>payment details</h5>

            {activeUser ? (
              activeUser[0].address ? (
                <div>
                  <h5>Cash On Delivery</h5>
                  <p style={{ marginBottom: "30px" }}>
                    <b>Address : </b> {activeUser[0].address}
                  </p>
                </div>
              ) : (
                <p style={{ color: "red", marginBottom: "30px" }}>
                  not valid address
                </p>
              )
            ) : (
              <p> only valid customer can</p>
            )}

            <div className="payment__priceContainer">
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value} </h3>}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
              {activeUser ? (
                activeUser[0].address ? (
                  <button
                    style={{
                      backgroundColor: "#F0C14B",
                      border: "1px solid yellow",
                      borderRadius: "2px",
                      marginTop: "20px",
                      cursor: "pointer",
                      height: "20px",
                    }}
                    onClick={PlaceOrder}
                  >
                    Place Order
                  </button>
                ) : (
                  <h4 style={{ color: "red", marginTop: "20px" }}>
                    address spacify first
                  </h4>
                )
              ) : (
                <h1 style={{ color: "red" }}>You are not valid customer</h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h3>login For This page</h3>
  );
}

export default Payment;
