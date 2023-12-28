import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";

export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function getProductData() {
      try {
        const productObj = await getProductById(id);
        console.log(productObj);
        setSingleProduct(productObj);
      } catch (err) {
        console.log(err);
      }
    }
    getProductData();
  }, []);

  return (
    <div className="single-product">
      <h1>{singleProduct.title}</h1>
      <img
        className="productImage2"
        src={singleProduct.image}
        alt={singleProduct.title}
        width="400"
      ></img>

      <p>{singleProduct.description}</p>
      <h2>${singleProduct.price}</h2>
      <button>Add to Cart</button>
    </div>
  );
}
