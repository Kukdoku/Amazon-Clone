import React, { useContext, useState, useEffect } from "react";
import Subtotal from "../components/Subtotal";

import chackoutnew from "../images/chackoutnew.jpg";
import "./chackout.css";
import CheckOutProduct from "../components/CheckOutProduct";
import { activeUserContext } from "../Context/activeUserContext";
var uniqid = require("uniqid");

function Chackout() {
  // const [{ basket }, dispatch] = useStateValue();
  const [basket, setBasket] = useState([]);
  const activeUser = useContext(activeUserContext);

  useEffect(() => {
    if (activeUser) {
      setBasket(activeUser[0].basket);
    }
  }, [activeUser]);

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src={chackoutnew}
          alt="This website Add"
        />
        <div>
          <h2 className="checkout__title">My Shoping Basket</h2>
          <div className="checkout__product">
            {basket.map((product) => (
              <CheckOutProduct
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                rating={product.rating}
                key={uniqid()}
                details={product.details}
                seller={product.seller}
                category={product.category}
                show="details"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Chackout;
