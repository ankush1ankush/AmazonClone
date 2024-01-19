import React, { useEffect } from "react";
import "./App.css";
import Checkout from "./Checkout/Checkout";
import Header from "./Header/Header";
import Home from "./Home/Home";
import { Routes, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider/StateProvider";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./FirebaseConsole/firebase";
import Login from "./Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import Payment from "./Payment/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Orders from "./Orders/Orders";

const promise = loadStripe(
  "pk_test_51OTQyrSFStKgCt6a0HrGXbPA0hD4m6dtBsWQ3g9Wja1oJbc1Nu9JYTekB6ENLqWxsN8hdBkucnifLNJJmmagHI7500RwKh8wsG"
);
function App() {
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      // this will get the recenlty authenticated user from firebase as authUser
      // setting an observer on the auth object

      if (authUser) {
        //console.log("THE USER IS >>> ", authUser);
        dispatch({ type: "SET_USER", user: authUser });
      } else {
        dispatch({ type: "SET_USER", user: null });
      }
    });
  }, []);
  // console.log(state.basket);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />
          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <div>
                <Login />
              </div>
            }
          />
          <Route
            path="/payment"
            element={
              <div>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </div>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
