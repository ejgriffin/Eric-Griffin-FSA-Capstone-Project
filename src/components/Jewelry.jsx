import React from "react";
import { useState, useEffect } from "react";
import ProductLink from "./ProductLink";
import { getAllJewelry } from "../api";
import { ThreeDots } from "react-loader-spinner";

export default function Jewelry({ loading, setLoading }) {
  const [jewelry, setJewelry] = useState([]);
  useEffect(() => {
    async function getJewelryData() {
      try {
        const products = await getAllJewelry();
        setJewelry(products);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getJewelryData();
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
      {jewelry.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
