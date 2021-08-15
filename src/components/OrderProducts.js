import React, { useState } from "react";
import "./checkoutproduct.css";
import firebase from "firebase";

function OrderProducts({
  title,
  price,
  rating,
  category,
  details,
  image,
  seller_uid,
  sellerName,
  buyer_uid,
  buyerName,
  address,
  time,
  dilivered,
  status,
  type,
  id,
}) {
  const [updateStatus, setUpdateStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [checkStatus, setCheckStatus] = useState(false);

  const Delivered = async () => {
    await firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .update({
        dilivered: true,
      })

      .catch((error) => alert(error.message));
  };

  const updateOrderStatus = async (e) => {
    await firebase
      .firestore()
      .collection("orders")
      .doc(id)
      .update({
        status: [...status, updateStatus.trim()],
      })

      .catch((error) => alert(error.message));
    setOpen(false);
  };

  return (
    <div className="checkoutproduct">
      <img className="checkoutproduct__image" src={image} />
      <div className="orderProduct">
        <div className="checkoutproduct__info">
          <p className="checkoutProduct__title">
            {" "}
            {title}{" "}
            {dilivered ? (
              <span style={{ color: "red", fontWeight: "500" }}>Delivered</span>
            ) : (
              <span style={{ color: "green", fontWeight: "500" }}>
                In process...
              </span>
            )}
          </p>
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

          <p style={{ fontSize: "13px", marginBottom: "8px" }}>
            <b style={{ fontSize: "14px" }}>seller : </b>
            {sellerName}
          </p>
          <p style={{ fontSize: "13px", marginBottom: "8px" }}>
            <b style={{ fontSize: "14px" }}>buyer : </b>
            {buyerName}
          </p>
          <p style={{ fontSize: "13px", marginBottom: "8px" }}>
            <b style={{ fontSize: "14px" }}>Category : </b>
            {category}
          </p>
          <p style={{ fontSize: "13px", marginBottom: "8px" }}>
            <b style={{ fontSize: "14px" }}>Details : </b>
            {details}
          </p>
          <p style={{ fontSize: "13px" }}>
            <b style={{ fontSize: "14px" }}>Address : </b>
            {address}
          </p>
          {type === "order" ? (
            <div>
              {" "}
              <button
                className="button__design"
                style={{
                  backgroundColor: "#CD9042",
                  borderRadius: "2px",
                  border: "1px solid yellow",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={() => setCheckStatus(!checkStatus)}
              >
                Check Status
              </button>
              <button
                className="button__design"
                style={{
                  backgroundColor: "#CD9042",
                  borderRadius: "2px",
                  border: "1px solid yellow",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={Delivered}
              >
                Delivered
              </button>
              {checkStatus ? (
                <div style={{ marginLeft: "40px ", marginTop: "20px" }}>
                  <b>Status of My order:</b>
                  {status.map((state) => (
                    <p>{state}</p>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
          {type === "sales" ? (
            <div>
              {" "}
              {open ? (
                <div>
                  <textarea
                    type="text"
                    value={updateStatus}
                    rows={4}
                    cols={25}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                  />
                  <button
                    style={{
                      backgroundColor: "#CD9042",
                      borderRadius: "2px",
                      border: "1px solid yellow",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                    disabled={!updateStatus.trim()}
                    onClick={updateOrderStatus}
                  >
                    update
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    style={{
                      backgroundColor: "red",
                      borderRadius: "2px",
                      border: "1px solid #a81832",
                      marginLeft: "10px",
                      cursor: "pointer",
                    }}
                  >
                    cancel
                  </button>
                </div>
              ) : (
                <button
                  className="button__design"
                  style={{
                    backgroundColor: "#CD9042",
                    borderRadius: "2px",
                    border: "1px solid yellow",
                    marginRight: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpen(!open)}
                >
                  Update Status
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default OrderProducts;
