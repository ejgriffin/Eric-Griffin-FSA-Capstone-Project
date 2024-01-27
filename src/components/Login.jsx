import React from "react";
import { useState, useEffect } from "react";
import { loginUser, getAllUsers } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setError("");
    setPassword("");
    setUsername("");
    event.preventDefault();
    const userObj = {
      username,
      password,
    };

    const nextToken = await loginUser(userObj);

    const users = await getAllUsers();
    const user = await users.filter((_user) => {
      return _user.username === username;
    })[0];
    setUser(user);
    setToken(nextToken);

    localStorage.setItem("username", userObj.username);
    localStorage.setItem("token", nextToken);
    navigate("/");
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
    </div>
  );
}
