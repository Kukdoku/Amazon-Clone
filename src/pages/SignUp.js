import React, { useState, useContext } from "react";

import "./login.css";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../constants/constant";
import firebase from "firebase";
import Usercontext from "../Context/user";
import openshop from "../images/openshop.jfif";

function SignUp() {
  const user = useContext(Usercontext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        await firebase.firestore().collection("users").add({
          userId: createdUserResult.user.uid,
          profile_photo: "",

          username: username.toLowerCase(),

          emailAddress: email.toLowerCase(),
          basket: [],

          dateCreated: Date.now(),
        });
        history.push(ROUTES.HOME);  
        window.location.reload();
        
        
      } catch (error) {
        setError(error.message);
        setUsername("");

        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } else {
      setError("password and confirm password did not match");
    }
  };
  return (
    <div className="login">
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
          <h5>Username</h5>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h5>Confirm Password:</h5>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {user ? (
            <button className="login__signInButton" disabled={true}>
              Logged In user can't create account
            </button>
          ) : (
            <button
              className="login__signInButton"
              type="submit"
              onClick={register}
              disabled={!username && !email && !password}
            >
              Sign Up
            </button>
          )}
        </form>
        <p>
          By signing-in you agree to the KUKDOKU condition of use & sales.Don't
          Worry We donot have any policy so You are Free to use
        </p>
        <Link to={ROUTES.LOGIN}>
          <button className="login__registerButton">SignIn Your Account</button>
        </Link>
      </div>
    </div>
  );
}

export default SignUp;
