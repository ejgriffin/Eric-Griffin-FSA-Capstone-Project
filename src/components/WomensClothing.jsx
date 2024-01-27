import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllWomens } from "../api";
import { ThreeDots } from "react-loader-spinner";

export default function WomensClothing({ loading, setLoading }) {
  const [womens, setWomens] = useState([]);
  useEffect(() => {
    async function getWomensData() {
      try {
        const products = await getAllWomens();
        setWomens(products);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getWomensData();
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
      {womens.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
