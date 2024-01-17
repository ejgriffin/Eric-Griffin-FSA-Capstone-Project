import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import Searchbar from "./Searchbar";

export default function Navbar({
  token,
  setToken,
  user,
  setUser,
  setProducts,
  productData,
}) {
  return (
    <div>
      <div className="navbar">
        <Link to={"/"} onClick={() => window.location.reload()}>
          <img id="logo-image" src={bananLogo} />
        </Link>
        <Searchbar setProducts={setProducts} productData={productData} />

        {!token && <Link to="/login">Login</Link>}
        {token && (
          <Link
            to="/login"
            onClick={() => {
              setUser(null);
              localStorage.clear();
              setToken(null);
            }}
          >
            Logout
          </Link>
        )}

        <Link to={"/cart"}>
          <img id="cart-image" src={cartLogo} />
        </Link>
      </div>
      <div className="categories">
        <Link to={"/products/electronics"}>Electronics</Link>
        <Link to={"/products/jewelry"}>Jewelry</Link>
        <Link to={"/products/mensclothing"}>Men's Clothing</Link>
        <Link to={"/products/womensclothing"}>Women's Clothing</Link>
      </div>
    </div>
  );
}
