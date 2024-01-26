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
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartNum, setCartNum] = useState(0);
  const localCart = JSON.parse(localStorage.getItem("cart"));
  const localUser = localStorage.getItem("username");

  // function cartQuantity() {
  //   const cartInStorage = JSON.parse(localStorage.getItem("cart"));
  //   if (cartInStorage) {
  //     let quantity = 0;
  //     for (let i = 0; i < cartInStorage.length; i++) {
  //       quantity += cartInStorage[i].quantity * cartInStorage.length;
  //     }

  //     return cartQuantity(quantity);
  //   }
  // }
  // useEffect(() => {
  //   function cartQuantity() {
  //     const cartInStorage = JSON.parse(localStorage.getItem("cart"));
  //     if (cartInStorage) {
  //       let quantity = 0;
  //       for (let i = 0; i < cartInStorage.length; i++) {
  //         quantity += cartInStorage[i].quantity;
  //       }
  //       return quantity; // Return the calculated quantity
  //     }
  //     return 0; // Return 0 if there is no cart in storage
  //   }

  //   const newQuan = cartQuantity();
  //   setCartNum(newQuan);
  //   console.log("cartNum", newQuan); // Use newQuan instead of cartNum
  // }, []); // Add dependencies if needed

  // function cartQuantity() {
  //   const cartInStorage = JSON.parse(localStorage.getItem("cart"));
  //   if (cartInStorage) {
  //     let quantity = 0;
  //     for (let i = 0; i < cartInStorage.length; i++) {
  //       quantity += cartInStorage[i].quantity;
  //     }
  //     return quantity; // Return the calculated quantity
  //   }
  //   return 0; // Return 0 if there is no cart in storage
  // }

  // // Call cartQuantity when the component renders
  // const newQuan = cartQuantity();
  // setCartNum(newQuan);
  // console.log("cartNum", newQuan);

  const cartQuantity = () => {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartInStorage) {
      let quantity = 0;
      for (let i = 0; i < cartInStorage.length; i++) {
        quantity += cartInStorage[i].quantity;
      }
      return quantity;
    }
    return 0;
  };

  useEffect(() => {
    const newQuan = cartQuantity();
    setCartNum(newQuan);
  }, []); // Add dependencies if needed

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken !== undefined) setToken(localToken);
  }, []);

  useEffect(() => {
    async function getProductData() {
      try {
        const products = await getAllProducts();
        setProducts(products);
        setProductData(products);
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
        localCart={localCart}
        cart={cart}
        cartNum={cartNum}
      />
      <Footer />
      <Routes>
        <Route path="/" element={<Products products={products} />} />
        <Route path="/products" element={<Products products={products} />} />
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
              cartQuantity={cartQuantity}
            />
          }
        />
        <Route path="*" element={<Products />} />
        <Route
          path="/products/:id"
          element={
            <SingleProduct
              user={user}
              token={token}
              setCart={setCart}
              setCartNum={setCartNum}
              cartQuantity={cartQuantity}
            />
          }
        />
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
