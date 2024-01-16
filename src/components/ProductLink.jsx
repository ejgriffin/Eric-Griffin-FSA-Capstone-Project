import React from "react";
import { Link } from "react-router-dom";

export default function ProductLink({ product }) {
  const { title, image, price, id, category } = product;
  return (
    <Link to={`/products/${id}`}>
      <div className="product-link">
        <h3>{title}</h3>
        <img className="productImage" src={image} alt={title} width="70%"></img>
        <h3>{category}</h3>
        <h2>${price}</h2>
      </div>
    </Link>
  );
}
