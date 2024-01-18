import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useState } from "react";

export default function Navbar({
  token,
  setToken,
  user,
  setUser,
  setProducts,
  productData,
  localUser,
}) {
  const [search, setSearch] = useState("");
  return (
    <div>
      <div className="navbar">
        <Link
          to={"/"}
          onClick={() => {
            setProducts(productData);
            setSearch("");
          }}
        >
          <img id="logo-image" src={bananLogo} />
        </Link>
        <Searchbar
          setProducts={setProducts}
          search={search}
          setSearch={setSearch}
          productData={productData}
        />

        {!token && <Link to="/login">Login</Link>}
        {token && (
          <div className="logout">
            <h3>{localUser}</h3>
            <h3>-</h3>
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
          </div>
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
