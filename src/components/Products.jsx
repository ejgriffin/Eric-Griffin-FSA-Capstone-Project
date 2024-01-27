import React from "react";
import { ThreeDots } from "react-loader-spinner";
import ProductLink from "./ProductLink";

export default function Products({ products, loading }) {
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
      {products.map((item) => (
        <ProductLink key={item.id} product={item} />
      ))}
    </div>
  );
}
