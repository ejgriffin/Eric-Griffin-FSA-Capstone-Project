import React from "react";
import { useState, useEffect } from "react";

const dummyCart = [];

export default function ShoppingCart() {
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch("https://fakestoreapi.com/carts/5");
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCart();
  }, []);

  return (
    <div className="cart-container">
      <h1>ShoppingCart!!</h1>
      <h1>UNDER CONSTRUCTION</h1>
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
