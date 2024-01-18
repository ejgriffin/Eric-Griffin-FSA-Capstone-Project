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
      <div className="single-product-img">
        <img
          className="productImage2"
          src={singleProduct.image}
          alt={singleProduct.title}
          width="400"
        ></img>
      </div>
      <div className="single-product-text">
        <h1>{singleProduct.title}</h1>
        <hr></hr>
        <h3>{singleProduct.category}</h3>
        <hr></hr>
        <p>{singleProduct.description}</p>
        <hr></hr>
        <h2>${singleProduct.price}</h2>
        <hr></hr>
        <button>Add to Cart</button>
      </div>
    </div>
  );
}
