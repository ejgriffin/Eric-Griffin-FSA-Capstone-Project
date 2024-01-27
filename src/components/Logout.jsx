import React from "react";
import { useNavigate } from "react-router-dom";
export default function Logout({ setUser, setToken, setCart, setCartNum }) {
  const navigate = useNavigate();

  return (
    <div className="login-page">
      <button
        to="/login"
        onClick={() => {
          localStorage.clear();
          setCart(null);
          setUser(null);
          setToken(null);
          setCartNum(null);
          localStorage.removeItem("cart");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
