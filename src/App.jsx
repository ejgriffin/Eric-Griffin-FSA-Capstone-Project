import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ShoppingCart from "./components/ShoppingCart";
import SingleProduct from "./components/SingleProduct";
import Products from "./components/Products";
import { loginUser } from "./api";
import { getUser } from "./api";
import Success from "./components/Success";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken !== undefined) setToken(localToken);
  }, []);

  // useEffect(() => {
  //   if (token !== null && token !== undefined) {
  //     console.log(token);
  //     async function fetchUser(token) {
  //       try {
  //         const nextUser = await getUser(token);
  //         setUser(nextUser);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }

  //     fetchUser(token);
  //   }
  // }, [token]);

  return (
    <BrowserRouter>
      <Navbar token={token} user={user} setToken={setToken} setUser={setUser} />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="*" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
