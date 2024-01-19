import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ShoppingCart from "./components/ShoppingCart";
import SingleProduct from "./components/SingleProduct";
import Products from "./components/Products";
import Success from "./components/Success";
import Electronics from "./components/Electronics";
import Jewelry from "./components/Jewelry";
import MensClothing from "./components/MensClothing";
import WomensClothing from "./components/WomensClothing";
import Checkout from "./components/Checkout";
import { getAllProducts } from "./api";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const localToken = localStorage.getItem("token");
  const localUser = localStorage.getItem("username");

  useEffect(() => {
    async function getProductData() {
      try {
        const products = await getAllProducts();
        setProducts(products);
        setProductData(products);
        console.log("products", products);
      } catch (err) {
        console.log(err);
      }
    }
    getProductData();
  }, []);

  return (
    <BrowserRouter>
      <Navbar
        token={token}
        setProducts={setProducts}
        productData={productData}
        setToken={setToken}
        setUser={setUser}
        localUser={localUser}
      />

      <Routes>
        <Route path="/" element={<Products products={products} />} />
        <Route path="/products" element={<Products products={products} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />
        <Route path="/cart" element={<ShoppingCart user={user} />} />
        <Route path="*" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/products/electronics" element={<Electronics />} />
        <Route path="/products/jewelry" element={<Jewelry />} />
        <Route path="/products/mensclothing" element={<MensClothing />} />
        <Route path="/products/womensclothing" element={<WomensClothing />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
