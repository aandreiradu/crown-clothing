import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
// import UserAuthProvider from "./contexts/user";
// import CategoriesProvider from "./contexts/categories";
// import CartContextProvider from "./contexts/cart";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.util";

// redux
import { Provider } from "react-redux";
import { store, persistor } from "./store/store";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          {/* <UserAuthProvider> */}
          {/* <CategoriesProvider> */}
          {/* <CartContextProvider> */}
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
          {/* </CartContextProvider> */}
          {/* </CategoriesProvider> */}
          {/* </UserAuthProvider> */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
