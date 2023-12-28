import React from "react";
import { getAllProducts } from "../api";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";

export default function Products({ item }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getProductData() {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (err) {
        console.log(err);
      }
    }
    getProductData();
  }, []);
  return (
    <div className="products-list">
      {products.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
