import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar({ setProducts, productData }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    console.log(productData);
    const results = productData.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    console.log(results);
    setProducts(results);
    navigate("/");
  }

  return (
    <div className="search-container">
      <input
        type="search"
        style={{ width: "800px" }}
        name="src"
        placeholder="Search for Products"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
