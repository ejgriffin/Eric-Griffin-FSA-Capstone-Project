import "./App.css";
import bananLogo from "./assets/bananazon.png";
import Homepage from "./components/Homepage";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import ShoppingCart from "./components/ShoppingCart";
import SingleProduct from "./components/SingleProduct";

function App() {
  return (
    <BrowserRouter>
      <div>
        <img id="logo-image" src={bananLogo} />
        <h1>HELLO WORLD!</h1>
      </div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
