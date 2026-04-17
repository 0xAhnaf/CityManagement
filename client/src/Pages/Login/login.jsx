import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   localStorage.setItem("loggedIn", "true");
  //   navigate("/");
  // };

  const { login } = useAuthContext();
  const [fields, setFields] = useState({
    "email": "",
    "password": ""
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setFields({...fields, [name]: value});
    console.log(value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login(fields.email, fields.password);
  }

  return (
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card">
        <form onSubmit={submitHandler}>
          <h2>Welcome!</h2>
          <p className="subtitle">
            Enter your credentials to access the dashboard
          </p>

          <div className="input-group">
            <label>Email address</label>
            <div className="input-box">
              <span className="icon">📧</span>
              <input
              name="email" 
              type="email" 
              placeholder="admin@cityconnect.gov"
              value={fields.email}
              onChange={inputHandler}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="password-row">
              <label>Password</label>
              <span className="forgot">FORGOT PASSWORD?</span>
            </div>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input 
              name="password"
              type="password" 
              placeholder="••••••••"
              value={fields.password}
              onChange={inputHandler}
              />
            </div>
          </div>

          {/* <div className="checkbox">
            <input type="checkbox" />
            <span>Keep me logged in for 30 days</span>
          </div> */}

          <button className="login-btn" type="submit">
            LOG IN
          </button>

          <p className="signup-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
