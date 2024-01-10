import React from "react";
import { useState } from "react";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObj = {
      username,
      password,
    };

    const nextToken = await loginUser(userObj);

    console.log(nextToken);
    setToken(nextToken);
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
