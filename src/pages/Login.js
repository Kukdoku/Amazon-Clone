import React, { useState, useContext } from "react";

import "./login.css";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/constant";
import firebase from "firebase";
import Usercontext from "../Context/user";
import openshop from "../images/openshop.jfif";

function Login() {
  const user = useContext(Usercontext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      history.push(ROUTES.HOME);
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message);
    }
    // window.location.reload();
  };
  return (
    <div className="login">
      {/* <h1>KukDoKo Shop</h1> */}
      <Link to={ROUTES.HOME}>
        <img className="login__logo" src={openshop} />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        {error ? <p style={{ color: "red" }}>{error}</p> : null}
        <form>
          <h5>Email</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {user ? (
            <button className="login__signInButton" disabled={true}>
              Logged In User can not SignIn
            </button>
          ) : (
            <button
              className="login__signInButton"
              type="submit"
              onClick={login}
              disabled={!email && !password}
            >
              Sign In
            </button>
          )}
        </form>
        <p>
          By signing-in you agree to the KUKDOKU condition of use & sales.Don't
          Worry We donot have any policy so You are Free to use{" "}
          <b>for Guest User : Email: user@gmail.com & password: 654321</b>
        </p>
        <Link to={ROUTES.SIGN_UP}>
          <button className="login__registerButton">Create Your Account</button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
