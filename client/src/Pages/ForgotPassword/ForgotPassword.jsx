import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ForgotPassword() {
  const { forgotPassword, authLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true); // show confirmation regardless, to avoid enumeration
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card">
        {submitted ? (
          <>
            <h2>Check your email</h2>
            <p className="subtitle">
              If an account exists for <strong>{email}</strong>, a reset link has been sent. Check your inbox.
            </p>
            <p className="signup-text"><Link to="/login">Back to Login</Link></p>
          </>
        ) : (
          <form onSubmit={submitHandler}>
            <h2>Forgot Password</h2>
            <p className="subtitle">Enter your email and we'll send you a reset link.</p>

            <div className="input-group">
              <label>Email address</label>
              <div className="input-box">
                <span className="icon">📧</span>
                <input
                  type="email"
                  placeholder="admin@cityconnect.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="login-btn" type="submit" disabled={authLoading}>
              {authLoading ? "SENDING..." : "SEND RESET LINK"}
            </button>

            <p className="signup-text"><Link to="/login">Back to Login</Link></p>
          </form>
        )}
      </div>
    </div>
  );
}