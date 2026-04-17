import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

export default function Signup(){
  const navigate=useNavigate();


  const { signup } = useAuthContext();
    const [fields, setFields] = useState({
      "name": "",
      "email": "",
      "password": "",
      "confirm-password": ""
    });
  
    const inputHandler = (e) => {
      const { name, value } = e.target;
      setFields({...fields, [name]: value});
      console.log(value);
    }
  
      const submitHandler = (e) => {
      e.preventDefault();
      signup(fields.name, fields.email, fields.password);
      }

  return(
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card">
        <form onSubmit={submitHandler}>
          <h2>Create Account</h2>
        <p className="subtitle">Register to access the City Connect dashboard</p>

        <div className="input-group">
          <label>Full Name</label>
          <div className="input-box">
            <span className="icon">👤</span>
            <input 
            name="name"
            type="text" 
            placeholder="Kaushik Ahnaf"
            value={fields.name}
            onChange={inputHandler}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Email address</label>
          <div className="input-box">
            <span className="icon">📧</span>
            <input
            name="email"
            type="email" 
            placeholder="kaushik@cityconnect.gov"
            value={fields.email}
            onChange={inputHandler}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Password</label>
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

        {/* <div className="input-group">
          <label>Confirm Password</label>
          <div className="input-box">
            <span className="icon">🔒</span>
            <input
            name="confirm-password"
            type="password" 
            placeholder="••••••••"
            value={fields["confirm-password"]}
            onChange={inputHandler}
            />
          </div>
        </div> */}

        <button className="login-btn" type="submit">
          SIGN UP
        </button>

        </form>
        <p className="signup-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>

        <div className="footer-links">
          <p>AUTHORIZED PERSONNEL ONLY</p>
          <div className="links">
            <button>Terms</button>
            <button>Support</button>
          </div>
        </div>
      </div>

      <p className="copyright">
        © {new Date().getFullYear()} City Connect Municipal Systems. All rights reserved.
      </p>
    </div>
  );
}