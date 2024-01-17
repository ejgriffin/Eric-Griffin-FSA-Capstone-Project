import React from "react";
import { useState, useEffect } from "react";
import { getProductById, getUserCart } from "../api";

export default function ShoppingCart({ user }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadUserCart() {
      try {
        const results = await getUserCart(user.id);
        const cartItems = await Promise.all(
          results[0].products.map((item) => getProductById(item.productId))
        );
        setCart(cartItems);
        console.log(cartItems);
      } catch (err) {
        console.log(err);
      }
    }
    loadUserCart();
  }, [user]);

  return (
    <div className="cart-list">
      {cart.map((products, index) => (
        <div className="cart-container" key={index}>
          <img
            className="productImage2"
            src={products.image}
            alt={products.title}
            width="100"
          ></img>
          <p>{products.title}</p>

          <div>
            <button> + </button>
            <button>1</button>
            <button> - </button>
          </div>
          <div>
            <span>${products.price}</span>
            <button>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>$ - </span>
      </div>
      <button>Checkout</button>
    </div>
  );
}
