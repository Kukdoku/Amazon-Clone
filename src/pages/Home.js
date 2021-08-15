import React, { useContext, useEffect, useState } from "react";
import "./Home.css";

import Product from "../components/Product";

import netflexclone from "../images/netflixclone.png";
import netflexclon from "../images/netflixclon.png";
import photogram from "../images/photogram.png";
import ProductAdd from "../components/ProductAdd";
import Usercontext from "../Context/user";

import firebase from "firebase";

function Home() {
  const [allProducts, setAllProducts] = useState(null);

  const user = useContext(Usercontext);
  useEffect(() => {
    const extractAllProjects = async () => {
      const response = await firebase.firestore().collection("products").get();

      setAllProducts(
        await response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    extractAllProjects();
  }, []);

  return (
    <div className="home">
      <div className="home__container">
        <img src={netflexclon} alt="Prime Banner" className="home__image" />
      </div>

      <div className="home__row">
        <ProductAdd
          id="1"
          title="My Another Project Instagram Clone"
          description="This website I have tried to make all basic functionality of Instagram "
          price=" It is free to use"
          image={photogram}
          url="https://photo-gallary-20dd4.web.app/universal"
        />
        <ProductAdd
          id="2"
          title="This is NetFlix Clone"
          rating={5}
          description="This website I have tried to make netflix look and field "
          price=" It is free to use"
          image={netflexclone}
          url="https://neflix-3c58a.web.app/"
        />
      </div>
      <h2
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}
      >
        Shop Here
      </h2>
      <div className="home__row">
        {allProducts ? (
          allProducts.map((product) => (
            <Product
              title={product.productName}
              image={product.image}
              price={product.price}
              rating={Number(product.rating)}
              details={product.details}
              seller={product.seller}
              category={product.category}
              id={product.id}
              key={product.id}
              seller_uid={product.seller_uid}
            />
          ))
        ) : (
          <h3 style={{ textAlign: "center" }}>loading...</h3>
        )}
      </div>
    </div>
  );
}

export default Home;
