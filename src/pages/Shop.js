import React, { useState, useContext } from "react";
import Usercontext from "../Context/user";
import "./shop.css";
import firebase from "firebase";
import { db, storage } from "../firebase";
import { getMyShopProduct } from "../loadData/extract";

import CheckOutProduct from "../components/CheckOutProduct";

function Shop() {
  const user = useContext(Usercontext);
  const [shopProduct, setShopProduct] = useState([]);
  const [productName, setProductName] = useState("");
  const [rating, setRating] = useState(1);
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [category, setCategory] = useState("");

  useState(() => {
    const getAllMyShopProduct = async () => {
      const response = await getMyShopProduct(user.uid);
      await response.onSnapshot((snapshot) => {
        setShopProduct(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    if (user) {
      getAllMyShopProduct();
    }
  }, []);

  const setFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  

  const createProduct = (e) => {
    e.preventDefault();
    if (productName && rating && details && price && image) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // console.log(error.message);
          alert(error.message);
          setError(error.message);
        },
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              db.collection("products").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                productName: productName,
                seller: user.displayName,
                seller_uid: user.uid,
                image: url,
                details: details,
                rating: rating,
                price: price,
                category: category,
              });
              setProductName("");
              setDetails("");
              setRating(1);
              setPrice('');
              setImage(null);
              setProgress(0);
              setCategory("");

              // history.push(`/profile/${uid}`);
              // window.location.reload();
            });
        }
      );
    } else {
      setError("all Fields are mendetory");
    }
  };

  return user ? (
    <div className="shop">
      <div className="shop__create">
        <h3>Create New Product</h3>
        <form onSubmit={createProduct} className="shop__form">
          {progress ? (
            <progress
              id="file"
              value={progress}
              max="100"
              style={{ width: "100%" }}
            />
          ) : null}
          {error ? (
            <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
          ) : null}
          <h6>Product Name:</h6>

          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="product name"
            required
          />
          <h6>Price:</h6>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="product price in $"
            required
          />
          <h6>Category:</h6>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="category of product"
            required
          />
          <h6>Detals:</h6>
          <textarea
            rows="4"
            cols="50"
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="product details"
            required
          />
          <h6>Rating:</h6>
          <input
            type="number"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
            required
          ></input>

          <h6>Picture of Product</h6>
          <input
            type="file"
            accept="image/*"
            onChange={setFileChange}
            required
          />
          <button type="submit">Create Product</button>
        </form>
      </div>

      <div className="shop__product">
        <h3>My Shop Products</h3>
        {shopProduct.map((product) => (
          <CheckOutProduct
            title={product.productName}
            image={product.image}
            price={product.price}
            rating={Number(product.rating)}
            id={product.id}
            key={product.id}
            show="show"
            category={product.category}
            details={product.details}
            deleteitem="canbe"
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="shop" style={{textAlign:'center',height:'100vh',marginTop:'40px'}}>
      <h3>login before Create New Product</h3>
    </div>
  );
}

export default Shop;
