import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";

export default function Navbar({ token, setToken, user, setUser }) {
  return (
    user ?? (
      <div>
        <div className="navbar">
          <Link to={"/"}>
            <img id="logo-image" src={bananLogo} />
          </Link>
          <div className="search-container">
            <input
              type="search"
              style={{ width: "800px" }}
              name="src"
              placeholder="Search for Products"
            />
            <button>Search</button>
          </div>
          {!token && <Link to="/login">Login</Link>}
          {token && (
            <Link
              to="/login"
              onClick={() => {
                setUser(null);
                localStorage.removeItem("token");
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
          <Link to={"*"}>Electronics</Link>
          <Link to={"*"}>Jewelry</Link>
          <Link to={"*"}>Men's Clothing</Link>
          <Link to={"*"}>Women's Clothing</Link>
        </div>
      </div>
    )
  );
}
