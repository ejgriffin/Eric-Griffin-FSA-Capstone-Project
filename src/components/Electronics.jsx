import React from "react";
import { useState, useEffect } from "react";
import { getAllElectronics } from "../api";
import ProductLink from "./ProductLink";
// this is a component

export default function Electronics() {
  const [electronics, setElectronics] = useState([]);
  useEffect(() => {
    async function getElectronicsData() {
      try {
        const products = await getAllElectronics();
        setElectronics(products);
      } catch (err) {
        console.log(err);
      }
    }
    getElectronicsData();
  }, []);
  return (
    <div className="products-list">
      {electronics.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
