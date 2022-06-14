import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserAuthProvider from "./contexts/user";
import CategoriesProvider from "./contexts/categories";
import CartContextProvider from "./contexts/cart";

import "./index.scss";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserAuthProvider>
        <CategoriesProvider>
          <CartContextProvider>
          <App />
          </CartContextProvider>
        </CategoriesProvider>
      </UserAuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
