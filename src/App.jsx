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
import Footer from "./components/Footer";
import Confirmation from "./components/Confirmation";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const localUser = localStorage.getItem("username");

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken !== undefined) setToken(localToken);
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser !== undefined) setUser(localUser);
  }, []);

  useEffect(() => {
    async function getProductData() {
      try {
        const products = await getAllProducts();
        setProducts(products);
        setProductData(products);
        setLoading(false);
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
        cart={cart}
        cartNum={cartNum}
        setCartNum={setCartNum}
        setCart={setCart}
      />
      <Footer />
      <Routes>
        <Route
          path="/"
          element={<Products products={products} loading={loading} />}
        />
        <Route
          path="/products"
          element={<Products products={products} loading={loading} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route
          path="/login"
          element={<Login setToken={setToken} setUser={setUser} />}
        />

        <Route
          path="/cart"
          element={
            <ShoppingCart
              user={user}
              token={token}
              cart={cart}
              setCart={setCart}
              setCartNum={setCartNum}
              localUser={localUser}
            />
          }
        />
        <Route
          path="*"
          element={<Products products={products} loading={loading} />}
        />
        <Route
          path="/products/:id"
          element={
            <SingleProduct
              token={token}
              setCart={setCart}
              setCartNum={setCartNum}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/products/electronics"
          element={<Electronics loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/products/jewelry"
          element={<Jewelry loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/products/mensclothing"
          element={<MensClothing loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/products/womensclothing"
          element={<WomensClothing loading={loading} setLoading={setLoading} />}
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
