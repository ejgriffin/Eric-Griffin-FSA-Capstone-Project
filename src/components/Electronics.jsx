import React from "react";
import { useState, useEffect } from "react";
import { getAllElectronics } from "../api";
import ProductLink from "./ProductLink";
import { ThreeDots } from "react-loader-spinner";

export default function Electronics({ loading, setLoading }) {
  const [electronics, setElectronics] = useState([]);
  useEffect(() => {
    async function getElectronicsData() {
      try {
        const products = await getAllElectronics();
        setElectronics(products);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getElectronicsData();
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
      {electronics.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
