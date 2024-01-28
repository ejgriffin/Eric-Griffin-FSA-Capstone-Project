import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../api";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if any of the required fields are empty
    if (
      !username ||
      !password ||
      !email ||
      !phone ||
      !firstname ||
      !lastname ||
      !city ||
      !street ||
      !number ||
      !zipcode ||
      !lat ||
      !long
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const userObj = {
      email,
      username,
      password,
      name: {
        firstname,
        lastname,
      },
      address: {
        city,
        street,
        number,
        zipcode,
        geolocation: {
          lat,
          long,
        },
      },
      phone,
    };

    try {
      const nextToken = await registerUser(userObj);
      navigate("/success");
      return nextToken;
    } catch (error) {
      console.error(error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-page">
      <h1>Register a New Account</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="userreg">
          Username:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="userreg">
          Password:
          <input
            minLength="1"
            style={{ width: "300px" }}
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

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
            minLength="1"
            style={{ width: "300px" }}
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
          />
        </label>
        <h2>Address:</h2>
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
          Zipcode:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
          />
        </label>
        <h3>Geolocation:</h3>
        <label>
          Lat:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={lat}
            onChange={(event) => setLat(event.target.value)}
          />
        </label>

        <label>
          Long:
          <input
            minLength="1"
            style={{ width: "300px" }}
            value={long}
            onChange={(event) => setLong(event.target.value)}
          />
        </label>

        <button className="big-button">Register</button>
      </form>
    </div>
  );
}
