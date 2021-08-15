import React, { useContext } from "react";
import "./subtotal.css";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../Context/StateProvider";
import { getBasketTotal } from "../Context/reducer";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/constant";
import { activeUserContext } from "../Context/activeUserContext";
import Usercontext from "../Context/user";

// javaScript Currency fomat snippet is used
function Subtotal() {
  const history = useHistory();
  const user = useContext(Usercontext);
  // const [{ basket }, dispatch] = useStateValue();
  const activeUser = useContext(activeUserContext);
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <b>
              Subtotal ({activeUser ? activeUser[0].basket.length : 0} items):
            </b>
            <h3>Total: {value}</h3>
            <small className="subtotal__gift">
              <input type="checkbox" />
              You can be a lucky customer...Proceed..
            </small>
          </>
        )}
        decimalScale={2}
        value={activeUser ? getBasketTotal(activeUser[0].basket) : 0}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button

        onClick={() => user ? history.push(ROUTES.PAYMENT) : alert('please login first')}
        
      >
        Proceed To CheckOut
      </button>
    </div>
  );
}

export default Subtotal;
