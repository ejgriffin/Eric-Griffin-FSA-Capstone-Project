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
