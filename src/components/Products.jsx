import React from "react";

import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";

export default function Products({ products }) {
  return (
    <div className="products-list">
      {products.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
