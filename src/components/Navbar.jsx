import React from "react";
import bananLogo from "./assets/bananazon.png";
import cartLogo from "./assets/cart.png";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({
  token,
  setToken,
  setUser,
  setProducts,
  productData,
  localUser,
  cart,
  cartNum,
  setCart,
  setCartNum,
}) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navigations">
      <div className="navbar">
        <Link
          className="store-link"
          to={"/"}
          onClick={() => {
            setProducts(productData);
            setSearch("");
          }}
        >
          <img id="logo-image" src={bananLogo} />
        </Link>
        <div className="searchd">
          <Searchbar
            setProducts={setProducts}
            search={search}
            setSearch={setSearch}
            productData={productData}
          />
        </div>
        {!token && <Link to="/login">Login</Link>}
        {token && (
          <div className="logout">
            <h4>Hello, {localUser}</h4>
            <span></span>
            <button
              to="/login"
              onClick={() => {
                navigate("/");
                localStorage.clear();

                setCart(null);
                setUser(null);
                setToken(null);
                setCartNum(0);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        )}

        <Link to={"/cart"} className="cart-link">
          <img id="cart-image" src={cartLogo} />
          {cart && cartNum != 0 && <span className="cart-num">{cartNum} </span>}
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
