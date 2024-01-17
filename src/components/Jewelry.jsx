import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllJewelry } from "../api";

export default function Jewelry() {
  const [jewelry, setJewelry] = useState([]);
  useEffect(() => {
    async function getJewelryData() {
      try {
        const products = await getAllJewelry();
        setJewelry(products);
      } catch (err) {
        console.log(err);
      }
    }
    getJewelryData();
  }, []);
  return (
    <div className="products-list">
      {jewelry.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
