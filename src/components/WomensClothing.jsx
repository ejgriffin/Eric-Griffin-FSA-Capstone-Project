import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllWomens } from "../api";

export default function WomensClothing() {
  const [womens, setWomens] = useState([]);
  useEffect(() => {
    async function getWomensData() {
      try {
        const products = await getAllWomens();
        setWomens(products);
      } catch (err) {
        console.log(err);
      }
    }
    getWomensData();
  }, []);
  return (
    <div className="products-list">
      {womens.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
