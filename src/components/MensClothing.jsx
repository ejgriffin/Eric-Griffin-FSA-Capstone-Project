import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllMens } from "../api";

export default function MensClothing() {
  const [mens, setMens] = useState([]);
  useEffect(() => {
    async function getMensData() {
      try {
        const products = await getAllMens();
        setMens(products);
      } catch (err) {
        console.log(err);
      }
    }
    getMensData();
  }, []);
  return (
    <div className="products-list">
      {mens.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
