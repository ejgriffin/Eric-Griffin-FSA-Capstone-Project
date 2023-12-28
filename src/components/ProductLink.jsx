import React from "react";

export default function ProductLink({ product }) {
  const { title, image } = product;
  return (
    <div>
      <img className="productImage" src={image} alt={title} width="200"></img>
      <h2>{title}</h2>
    </div>
  );
}
