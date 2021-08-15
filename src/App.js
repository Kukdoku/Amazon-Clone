import "./App.css";
import Header from "./components/Header.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { lazy, Suspense, useEffect, useState } from "react";

import * as ROUTES from "./constants/constant";
import useAuthListener from "./hooks/useAuthListener";
import Usercontext from "./Context/user";
import { activeUserContext } from "./Context/activeUserContext";

import { getActiveUser, getUserBasket } from "./loadData/extract";

const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Home = lazy(() => import("./pages/Home"));
const Chackout = lazy(() => import("./pages/Chackout"));
const Payment = lazy(() => import("./pages/Payment"));
const SalesOrder = lazy(() => import("./pages/SalesOrder"));
const Shop = lazy(() => import("./pages/Shop"));
const SearchItem = lazy(() => import("./pages/SearchProduct"));

function App() {
  const { user } = useAuthListener();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    const getActive = async (userId) => {
      let response = await getActiveUser(userId);
      await response.onSnapshot((snapshot) => {
        setActiveUser(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });

      // const response = await getUserBasket(userId);
    };
    if (user) {
      getActive(user.uid);
    } else {
      setActiveUser(null);
    }
  }, [user]);

  return (
    <Usercontext.Provider value={user}>
      <activeUserContext.Provider value={activeUser}>
        <div className="app">
          <Router>
            <Header />
            <Suspense fallback={<p>Loading..........</p>}>
              <Switch>
                <Route path={ROUTES.LOGIN} component={Login} exact />
                <Route path={ROUTES.SIGN_UP} component={SignUp} exact />
                <Route path={ROUTES.HOME} component={Home} exact />
                <Route path={ROUTES.CHACKOUT} component={Chackout} exact />
                <Route path={ROUTES.SHOP} component={Shop} exact />
                <Route path={ROUTES.SALESORDER} component={SalesOrder} exact />
                <Route path={ROUTES.PAYMENT} component={Payment} />
                <Route path={ROUTES.SEARCHITEM} component={SearchItem} />

                <Route component={NotFound} />
              </Switch>
            </Suspense>
          </Router>
        </div>
      </activeUserContext.Provider>
    </Usercontext.Provider>
  );
}

export default App;
