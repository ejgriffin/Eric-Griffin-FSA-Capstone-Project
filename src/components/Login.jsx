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
      return _user.username === username; //will filter all users that you sent in
    })[0];
    setUser(user);
    setToken(nextToken);

    localStorage.setItem("username", userObj.username);
    localStorage.setItem("token", nextToken);
  };

  return (
    <div className="login-page">
      <form name="login" className="login-form" onSubmit={handleSubmit}>
        <label>
          {" "}
          Username:{" "}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          {" "}
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <div className="register-link">
        <Link to={"/register"}>Register a New Account</Link>
      </div>
    </div>
  );
}
