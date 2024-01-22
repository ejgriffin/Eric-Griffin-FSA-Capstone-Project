import React from "react";
import { useState, useEffect } from "react";
import { getProductById, getUserCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({ user, token }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUserCart() {
      try {
        const results = await getUserCart(user?.id);
        const localCart = localStorage.getItem("cart");
        if (!localCart) {
          const cartItems = await Promise.all(
            results[0].products.map((item) => getProductById(item.productId))
          );
          const products = results[0].products;
          console.log(products[0]);
          const cartWithQuantities = cartItems.map((item, index) => ({
            ...item,
            quantity: products[index].quantity,
          }));
          localStorage.setItem("cart", JSON.stringify(cartWithQuantities));
          setCart(cartItems);
        } else {
          setCart(JSON.parse(localCart));
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadUserCart();
  }, [user]);

  function handleCheckout() {
    navigate("/checkout");
  }

  function formatPrice(price) {
    const roundedPrice = price.toFixed(2);
    return roundedPrice;
  }

  function totalProductPrice(product) {
    //product quantity * product price
    const total = product.quantity * product.price;
    return formatPrice(total);
  }
  function totalCartPrice() {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    let totalPrice = 0;
    for (let i = 0; i < cartInStorage.length; i++) {
      totalPrice += cartInStorage[i].price * cartInStorage[i].quantity;
    }

    return formatPrice(totalPrice);
  }

  function removeItemFromCart(product) {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartInStorage.filter((item) => {
      return item.id !== product.id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  function increaseProductCount(product) {
    console.log("product", product);
    const id = product.id;
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    // check if item is in cart
    const result = cartInStorage.find((item) => item.id == id);
    console.log("result", result);
    if (!result) {
      cartInStorage.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
    } else {
      result.quantity += 1;
      const updatedCart = cartInStorage.filter((item) => item.id != id);
      updatedCart.push(result);
      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
  }

  function decreaseProductCount(product) {
    console.log("product", product);
    const id = product.id;
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    // check if item is in cart
    const result = cartInStorage.find((item) => item.id == id);
    console.log("result", result);
    if (!result) {
      cartInStorage.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
    } else {
      result.quantity -= 1;
      if (result.quantity == 0) {
        removeItemFromCart(result);
      } else {
        const updatedCart = cartInStorage.filter((item) => item.id != id);
        updatedCart.push(result);
        console.log(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
      }
    }
  }

  return (
    <div className="cart-list">
      {!token && (
        <div className="cart-login-msg">
          <h1>Please Log in to view Shopping Cart!</h1>
        </div>
      )}
      {token && (
        <div>
          {cart.map((product, index) => (
            <div className="cart-container" key={index}>
              <img
                className="productImage2"
                src={product.image}
                alt={product.title}
                width="100"
              ></img>
              <p>{product.title}</p>

              <div>
                <button onClick={() => increaseProductCount(product)}>
                  {" "}
                  +{" "}
                </button>
                <button>{product.quantity}</button>
                <button onClick={() => decreaseProductCount(product)}>
                  {" "}
                  -{" "}
                </button>
              </div>
              {/* <div>
                <span>${totalProductPrice(product)}</span>
              </div> */}
              <div>
                <span>${totalProductPrice(product)}</span>
                <button onClick={() => removeItemFromCart(product)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <span>Total Price of your Cart</span>
            <span>$ {totalCartPrice()}</span>
          </div>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}
