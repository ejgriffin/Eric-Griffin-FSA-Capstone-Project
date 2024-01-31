import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../api";
import { ThreeDots } from "react-loader-spinner";

export default function SingleProduct({
  token,
  setCart,
  setCartNum,
  loading,
  setLoading,
}) {
  const [singleProduct, setSingleProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function getProductData() {
      try {
        const productObj = await getProductById(id);

        setSingleProduct(productObj);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProductData();
  }, []);

  function formatPrice(price) {
    if (singleProduct) {
      const roundedPrice = price.toFixed(2);
      return roundedPrice;
    }
  }
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

  function addToCart() {
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    const cartInStorage = JSON.parse(localStorage.getItem("cart"));
    // check if item is in cart
    const result = cartInStorage.find((item) => item.id == id);

    if (!result) {
      cartInStorage.push({ ...singleProduct, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cartInStorage));
      setCart(cartInStorage);
    } else {
      result.quantity += 1;
      const updatedCart = cartInStorage.filter((item) => item.id != id);
      updatedCart.push(result);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setCart(updatedCart);
    }
    const updatedQuantity = cartQuantity();
    setCartNum(updatedQuantity);

    alert("Item added to cart!");
  }

  useEffect(() => {
    function cartQuantity() {
      const cartInStorage = JSON.parse(localStorage.getItem("cart"));
      if (cartInStorage) {
        let quantity = 0;
        for (let i = 0; i < cartInStorage.length; i++) {
          quantity += cartInStorage[i].quantity;
        }
        return quantity;
      }
      return 0;
    }

    const newQuan = cartQuantity();
    setCartNum(newQuan);
  }, []);

  return (
    <div>
      {loading && (
        <div className="is-loading">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {!loading && (
        <div className="single-product">
          <div className="single-product-img">
            <img
              className="productImage2"
              src={singleProduct?.image}
              alt={singleProduct?.title}
              width="400"
            ></img>
          </div>
          <div className="single-product-text">
            <h1>{singleProduct?.title}</h1>
            <hr></hr>
            <h3>{singleProduct?.category}</h3>
            <hr></hr>
            <p>{singleProduct?.description}</p>
            <hr></hr>
            <h2>${formatPrice(singleProduct?.price)}</h2>
            <hr></hr>
            {!token && (
              <h3 className="login-msg">
                You must be logged in to add items to cart!
              </h3>
            )}
            {token && (
              <button className="big-button" onClick={addToCart}>
                Add to Cart
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
