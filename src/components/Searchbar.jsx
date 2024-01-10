//This component is dysfunctional.

// import React, { useState, useEffect } from "react";
// import { getAllProducts } from "../api";

// export default function Searchbar() {
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function getSearchResults() {
//       try {
//         const results = await getAllProducts();
//         setData(results);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }, []);

//   return (
//     <div>
//       <div className="search-container">
//         <input
//           type="search"
//           style={{ width: "800px" }}
//           name="src"
//           placeholder="Search for Products"
//           value={search}
//           onChange={(e) => {
//             setSearch(e.target.value);
//           }}
//         />
//         <button>Search</button>
//       </div>
//       {data
//         .filter((row) => {
//           if (search == "") {
//             return row;
//           } else if (row.title.toLowerCase().incudes(search.toLowerCase())) {
//             return row;
//           }
//         })
//         .map((row, i) => {
//           return (
//             <div className="product-link" key={i}>
//               <h3>{row.title.substring(0, 20)}</h3>
//               <img
//                 className="productImage"
//                 src={row.image}
//                 alt={row.title}
//                 width="200"
//               ></img>
//               <h2>${row.price}</h2>
//             </div>
//           );
//         })}
//     </div>
//   );
// }
