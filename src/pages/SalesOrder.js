import React, { useState, useEffect, useContext } from "react";
import { activeUserContext } from "../Context/activeUserContext";
import Usercontext from "../Context/user";
import { getMyOrder, getMySalesOrder } from "../loadData/extract";
import "./salesOrder.css";
import OrderProducts from "../components/OrderProducts";
var uniqid = require('uniqid')


function SalesOrder() {
  const activeUser = useContext(activeUserContext);
  const user = useContext(Usercontext);
  const [Item, setItem] = useState([]);

  const [products, setProduct] = useState("order");

  useEffect(() => {
    const setAllItems = async (userId) => {
      if (products === "order") {
        const response = await getMyOrder(userId);
        response.onSnapshot((snapshot) => {
          setItem(snapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
          })))
        })
        
      } else {
        const response = await getMySalesOrder(userId);
        response.onSnapshot((snapshot) => {
          setItem(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });
      }
    };
    if (user && activeUser) {
      setAllItems(activeUser[0].userId);
    }
  }, [products]);

  return (
    <div className="salesOrder">
      {activeUser && user ? (
        <div className="salesOrder__items">
          <div className="salesOrder__button">
            <button onClick={() => setProduct("order")}>My Order</button>
            <button onClick={() => setProduct("sales")}>
              My Product Sales
            </button>
          </div>
          {products === "order" ? (
            <div className="salesOrder__products">
              <h2>My Order</h2>
              <hr />
              {Item.map((item) =>
                !item.dilivered ? (
                  <OrderProducts
                    seller_uid={item.seller_uid}
                    sellerName={item.seller}
                    buyer_uid={item.buyer_uid}
                    buyerName={item.buyer}
                    address={item.address}
                    time={item.timestamp}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    category={item.category}
                    details={item.detials}
                    image={item.image}
                    key={uniqid()}
                    status={item.status}
                    dilivered={item.dilivered}
                    type="order"
                    id={item.id}
                  />
                ) : null
              )}
              <div className="salesHistory">
                <h2>My Order History </h2>
                <hr />
                {Item.map((item) =>
                  item.dilivered ? (
                    <OrderProducts
                      seller_uid={item.seller_uid}
                      sellerName={item.seller}
                      buyer_uid={item.buyer_uid}
                      buyerName={item.buyer}
                      address={item.address}
                      time={item.timestamp}
                      title={item.title}
                      price={item.price}
                      rating={item.rating}
                      category={item.category}
                      details={item.detials}
                      image={item.image}
                      key={uniqid()}
                      status={item.status}
                      dilivered={item.dilivered}
                      id={item.id}
                    />
                  ) : null
                )}
              </div>
            </div>
          ) : (
            <div className="salesOrder__products">
              <h2>My Sales </h2>
              <hr />
              {Item.map((item) =>
                !item.dilivered ? (
                  <OrderProducts
                    seller_uid={item.seller_uid}
                    sellerName={item.seller}
                    buyer_uid={item.buyer_uid}
                    buyerName={item.buyer}
                    address={item.address}
                    time={item.timestamp}
                    title={item.title}
                    price={item.price}
                    rating={item.rating}
                    category={item.category}
                    details={item.detials}
                    image={item.image}
                    key={uniqid()}
                    status={item.status}
                    dilivered={item.dilivered}
                    type="sales"
                    id={item.id}
                  />
                ) : null
              )}
              <div className="salesHistory">
                <h2>My Sales History </h2>
                <hr />
                {Item.map((item) =>
                  item.dilivered ? (
                    <OrderProducts
                      seller_uid={item.seller_uid}
                      sellerName={item.seller}
                      buyer_uid={item.buyer_uid}
                      buyerName={item.buyer}
                      address={item.address}
                      time={item.timestamp}
                      title={item.title}
                      price={item.price}
                      rating={item.rating}
                      category={item.category}
                      details={item.detials}
                      image={item.image}
                      key={uniqid()}
                      status={item.status}
                      dilivered={item.dilivered}
                      id={item.id}
                    />
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            Please Login to use this service
          </h3>
        </div>
      )}
    </div>
  );
}

export default SalesOrder;
