import React from "react";
import { useNavigate } from "react-router-dom";

export default function Searchbar({
  setProducts,
  productData,
  search,
  setSearch,
}) {
  const navigate = useNavigate();

  function handleSearch() {
    const results = productData.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );

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
