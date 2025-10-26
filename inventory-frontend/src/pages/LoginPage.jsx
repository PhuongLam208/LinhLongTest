import React, { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import "../services/api.js"
import { login } from "../services/api.js";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    let hasError = false;

    setUsernameError("");
    setPasswordError("");

    if (!username.trim()) {
      setUsernameError("Username is required");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
      hasError = true;
    }

    if (hasError) return;

    try {
      const res = await login(username, password);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("isLoggedIn", "true");

      navigate("/inventory");
    } catch (err) {
      if (err?.response?.status === 401) {
        setLoginFailed(true);
        setTimeout(() => {
          setLoginFailed(false);
        }, 2000)
      }
      console.log(err);
    }
  };

  return (
    <div>
      <div class="login-container">
        <div class="login-form">
          <h2>
            Login
          </h2>
          <form onSubmit={handleLogin}>
            <div class="input-container">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
              {usernameError && <span style={{color:"red"}}>{usernameError}</span>}
            </div>

            <div class="input-container">
              <label>Password </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
              {passwordError && <span style={{color:"red"}}>{passwordError}</span>}
            </div>
            <button
              class="login-btn"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      {loginFailed && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p>
              Incorrect Username Or Password
            </p>
            <div>
              <img src="../../public/fail.png" alt="fail" style={{ width: "5vw" }} />
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default LoginPage;
