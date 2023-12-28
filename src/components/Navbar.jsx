import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img id="logo-image" src={bananLogo} />
        </Link>

        <label>
          <input type="text" style={{ width: "500px" }} />
          <button>Search</button>
        </label>
        <Link to={"/login"}>Login</Link>
        <Link to={"/cart"}>
          <img id="cart-image" src={cartLogo} />
        </Link>
      </div>
      <div className="categories">
        <Link to={"*"}>Electronics</Link>
        <Link to={"*"}>Jewelry</Link>
        <Link to={"*"}>Men's Clothing</Link>
        <Link to={"*"}>Women's Clothing</Link>
      </div>
    </>
  );
}