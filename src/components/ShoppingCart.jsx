import React from "react";
import { useState, useEffect } from "react";
import { getProductById, getUserCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({ user }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserCart() {
      try {
        const results = await getUserCart(user?.id);
        const localCart = localStorage.getItem("cart");
        if (!localCart) {
          const cartItems = await Promise.all(
            results[0].products.map((item) => getProductById(item.productId))
          );
          const products = results[0].products;
          console.log(products[0]);
          const cartWithQuantities = cartItems.map((item, index) => ({
            ...item,
            quantity: products[index].quantity,
          }));
          localStorage.setItem("cart", JSON.stringify(cartWithQuantities));
          setCart(cartItems);
        } else {
          setCart(JSON.parse(localCart));
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadUserCart();
  }, [user]);

  function handleCheckout() {
    navigate("/checkout");
  }

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
            <button>{products.quantity}</button>
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
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
