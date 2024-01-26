import React from "react";
import { useState, useEffect } from "react";
import { getProductById, getUserCart } from "../api";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart({
  user,
  token,
  cart,
  setCart,
  cartQuantity,
  setCartNum,
}) {
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
          setCart(cartWithQuantities);
        } else {
          setCart(JSON.parse(localCart));
          const updatedQuantity = cartQuantity();
          setCartNum(updatedQuantity);
        }
      } catch (err) {
        console.log(err);
      }
    }
    loadUserCart();
  }, [user, cartQuantity]);

  function handleCheckout() {
    navigate("/checkout");
  }

  const formatPrice = (price) => {
    const roundedPrice = price.toFixed(2);
    return roundedPrice;
  };

  function totalProductPrice(product) {
    const total = product.quantity * product.price;
    return formatPrice(total);
  }
  function totalCartPrice() {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartInStorage) {
      let totalPrice = 0;
      for (let i = 0; i < cartInStorage.length; i++) {
        totalPrice += cartInStorage[i].price * cartInStorage[i].quantity;
      }

      return formatPrice(totalPrice);
    }
  }

  function removeItemFromCart(product) {
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartInStorage.filter((item) => {
      return item.id !== product.id;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
    const updatedQuantity = cartQuantity();
    setCartNum(updatedQuantity);
  }

  function increaseProductCount(product) {
    console.log("product", product);
    const id = product.id;
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    // check if item is in cart
    const result = cartInStorage.find((item) => item.id == id);

    if (!result) {
      cartInStorage.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
    } else {
      const updatedCart = cartInStorage.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const updatedQuantity = cartQuantity();
    setCartNum(updatedQuantity);
  }

  function decreaseProductCount(product) {
    console.log("product", product);
    const id = product.id;
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    // check if item is in cart
    const result = cartInStorage.find((item) => item.id == id);

    if (!result) {
      cartInStorage.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
    } else {
      let updatedCart = cartInStorage.map((item) => {
        if (item.id === product.id) {
          item.quantity -= 1;
        }
        return item;
      });
      updatedCart = updatedCart.filter((item) => item.quantity > 0);

      console.log(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const updatedQuantity = cartQuantity();
    setCartNum(updatedQuantity);
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
          <div className="banana">
            <table>
              <tbody>
                <tr>
                  <td className="secret">SECRET</td>
                  <td>Item Name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </tbody>
            </table>
          </div>
          {cart.map((product, index) => {
            return (
              <div className="cart-container" key={index}>
                <img
                  className="productImage2"
                  src={product.image}
                  alt={product.title}
                  width="100"
                ></img>
                <h3>{product.title}</h3>

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
                <div>
                  <span>${formatPrice(product.price)}</span>
                </div>
                <div>
                  <span>${totalProductPrice(product)}</span>
                  <button onClick={() => removeItemFromCart(product)}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="total">
            <span>Total Price of your Cart:</span>
            <span>$ {totalCartPrice()}</span>
          </div>

          {totalCartPrice() != 0 && (
            <button className="big-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
