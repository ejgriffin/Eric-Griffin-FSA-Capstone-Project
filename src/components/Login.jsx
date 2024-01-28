import React from "react";
import { useState } from "react";
// import { loginUser, getAllUsers } from "../api";
import { Link, useNavigate } from "react-router-dom";
const APIURL = "https://fakestoreapi.com";

export default function Login({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const loginUser = async (userObj) => {
  //   try {
  //     const rsp = await fetch(`${APIURL}/auth/login`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         username: userObj.username,
  //         password: userObj.password,
  //       }),
  //     });

  //     const json = await rsp.json();
  //     console.log(json);
  //     return json.token;
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const loginUser = async (userObj) => {
    try {
      const rsp = await fetch(`${APIURL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userObj.username,
          password: userObj.password,
        }),
      });

      const json = await rsp.json();

      // Check for error response from the server
      if (!rsp.ok) {
        throw new Error(json.message || "Login failed");
      }

      return json.token;
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during login");
      throw err; // Rethrow the error to propagate it to the calling code
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(`${APIURL}/users`);
      const json = await response.json();

      return json;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const userObj = {
      username,
      password,
    };
    try {
      const nextToken = await loginUser(userObj);

      const users = await getAllUsers();
      const user = await users.filter((_user) => {
        return _user.username === username;
      })[0];
      setUser(user);
      setToken(nextToken);

      localStorage.setItem("username", userObj.username);
      localStorage.setItem("user", JSON.stringify(userObj));
      localStorage.setItem("token", nextToken);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <form name="login" className="login-form" onSubmit={handleSubmit}>
        <label>
          {" "}
          Username:{" "}
          <input
            value={username}
            style={{ width: "300px" }}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          {" "}
          Password:{" "}
          <input
            type="password"
            value={password}
            style={{ width: "300px" }}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button className="login-button">Login</button>
      </form>
      <p>-or-</p>
      <div className="register-link">
        <Link to={"/register"}>Register a New Account</Link>
      </div>
      {error && (
        <p className="error-message">
          INVALID USERNAME AND PASSWORD! TRY AGAIN!
        </p>
      )}
    </div>
  );
}
