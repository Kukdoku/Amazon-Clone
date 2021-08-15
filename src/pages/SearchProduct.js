import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Product from "../components/Product";

function SearchProduct() {
  let productName = window.location.href.split("/search-item/")[1];
  const [products, setProduct] = useState([]);
  productName = productName.replace(/%20/g, " ");

  useEffect(() => {
    const getSearchProduct = async () => {
      const products = await firebase
        .firestore()
        .collection("products")
        .where("category", "==", productName)
        .get();

      await products.docs.map((item) =>
        setProduct([{ id: item.id, ...item.data() }])
      );
    };
    getSearchProduct();
  }, [productName]);
  
  return (
    <div className="searchProduct" style={{ marginTop: "20px" }}>
      <h3 style={{ color: "gray", textAlign: "center" }}>
        You Search For <span style={{ color: "black" }}>{productName}</span>
      </h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap:'wrap'
        }}
      >
        {products ? (
          products.map((item) => (
            <Product
              key={item.id}
              title={item.productName}
              image={item.image}
              price={item.price}
              rating={Number(item.rating)}
              id={item.id}
              details={item.details}
              category={item.category}
              seller={item.seller}
              seller_uid={item.seller_uid}
            />
          ))
        ) : (
          <h3>No such item is aveliable for sales </h3>
        )}
      </div>
    </div>
  );
}

export default SearchProduct;
