import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllMens } from "../api";
import { ThreeDots } from "react-loader-spinner";

export default function MensClothing({ loading, setLoading }) {
  const [mens, setMens] = useState([]);
  useEffect(() => {
    async function getMensData() {
      try {
        const products = await getAllMens();
        setMens(products);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getMensData();
  }, []);
  return (
    <div className="products-list">
      {loading && (
        <div className="is-loading">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {mens.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
