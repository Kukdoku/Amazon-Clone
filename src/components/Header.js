import { Search, ShoppingBasket } from "@material-ui/icons";
import React, { useState, useContext } from "react";

import "./header.css";
import * as ROUTES from "../constants/constant";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "../Context/StateProvider";
import Usercontext from "../Context/user";

import firebase from "firebase";
import { activeUserContext } from "../Context/activeUserContext";
import openshop from "../images/openshop.jfif";

function Header() {
  const history = useHistory();
 
  const user = useContext(Usercontext);
  const activeUser = useContext(activeUserContext);
  const [productName, setProductName] = useState("");

  const SignOut = async (e) => {
    await firebase.auth().signOut();
    history.push(ROUTES.LOGIN);
  };

  
  return (
    <div className="header">
      <Link to={ROUTES.HOME}>
        <img src={openshop} alt="amazon Logo" className="headder__logo" />
      </Link>
      <div className="header__search">
        <input
          className="header__searchInput"
          type="text"
          onChange={(e) => setProductName(e.target.value)}
          placeholder="search by product category..."
        />
        <Link to={`/search-item/${productName}`}>
          <Search className="header__searchIcon" />
        </Link>
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">
            Hello {user ? user.displayName : "Guest"}
          </span>
          {user ? (
            <span className="header__optionLineTwoSignOut" onClick={SignOut}>
              Logout
            </span>
          ) : (
            <Link
              to={ROUTES.LOGIN}
              style={{ color: "white", textDecoration: "none" }}
            >
              <span className="header__optionLineTwo">Sign In</span>
            </Link>
          )}
        </div>
        <Link to={ROUTES.SALESORDER} style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionLineOne">Sales </span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <Link to={ROUTES.SHOP} style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Shop</span>
          </div>
        </Link>

        <Link to={ROUTES.CHACKOUT}>
          <div className="header__optionBasket">
            <ShoppingBasket />
            <span className="header__optionLineTwo header__basketCount">
              {activeUser ? activeUser[0].basket.length : 0}
              {/* {basket?.length} */}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
