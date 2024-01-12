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
      {cart.map((products, index) => {
        return (
          <div className="cart-container" key={index}>
            <img
              className="productImage2"
              src={products.image}
              alt={products.title}
              width="100"
            ></img>
            <h3>{products.title}</h3>

            <h2>${products.price}</h2>
            <button>Delete from Cart</button>
          </div>
        );
      })}
    </div>
  );
}

// array of products <---- from the cart API call <-- e.g. stored in a variable cartArr
// create a function that makes an api call for a single product, e.g. getProduct
// Promise.all(cartArr.map(item=>getProduct(item.productId))
// .then(res=>// you have your array here)
// .catch(err);
// cartArr = [{"productId":1,"quantity":2},{"productId":9,"quantity":1}]
// [getProduct(1), getProduct(9)]
// [{name:"jacket", price:99.99}, {name:"book", price:10.00}]
