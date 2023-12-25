import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <Link to={"/"}>
        <img id="logo-image" src={bananLogo} />
      </Link>

      <label>
        Search Products:
        <input type="text" />
      </label>
      <Link to={"/login"}>Login</Link>
      <Link to={"/cart"}>
        <img id="cart-image" src={cartLogo} />
      </Link>
    </div>
  );
}
