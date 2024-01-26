import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const checkoutInfo = {
      name: {
        firstname,
        lastname,
      },
      billinginfo: {
        cardNumber,
        expDate,
        cvv,
      },
      contactinfo: {
        email,
        phone,
      },
      shippingaddress: {
        street,
        number,
        city,
        state,
        country,
        zipcode,
      },
    };
    console.log("checkout", checkoutInfo);
    navigate("/confirmation");
  };

  return (
    <div className="checkout-page">
      <h1>Enter Payment Information</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Name:</h2>
        <label>
          First Name:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            minLength="0"
            style={{ width: "300px" }}
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
        <hr></hr>
        <h2>Billing Info:</h2>
        <label>
          Credit Card Number:
          <input
            minLength="16"
            maxLength="16"
            style={{ width: "300px" }}
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
          />
        </label>
        <label>
          Expiration Date:
          <input
            minLength="5"
            maxLength="5"
            style={{ width: "300px" }}
            type="text"
            value={expDate}
            onChange={(event) => setExpDate(event.target.value)}
          />
        </label>

        <label>
          CVV:
          <input
            minLength="3"
            maxLength="3"
            style={{ width: "300px" }}
            value={cvv}
            onChange={(event) => setCvv(event.target.value)}
          />
        </label>
        <hr></hr>
        <h2>Contact Info:</h2>
        <label>
          Email:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Phone:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </label>
        <hr></hr>
        <h2>Shipping Address:</h2>
        <label>
          Street:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={street}
            onChange={(event) => setStreet(event.target.value)}
          />
        </label>
        <label>
          Number:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
        </label>
        <label>
          City:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </label>
        <label>
          State/Province:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
        </label>
        <label>
          Country:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </label>
        <label>
          Zipcode:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </label>

        <button className="big-button">Submit Payment</button>
      </form>
    </div>
  );
}
