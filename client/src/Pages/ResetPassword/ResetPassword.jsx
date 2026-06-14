import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ResetPassword() {
  const { token } = useParams();
  const { resetPassword, authLoading } = useAuthContext();
  const [fields, setFields] = useState({ password: "", confirm: "" });
  const [error, setError] = useState("");

  const inputHandler = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (fields.password !== fields.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    await resetPassword(token, fields.password);
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card">
        <form onSubmit={submitHandler}>
          <h2>Reset Password</h2>
          <p className="subtitle">Enter your new password below.</p>

          <div className="input-group">
            <label>New Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={fields.password}
                onChange={inputHandler}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <div className="input-box">
              <span className="icon">🔒</span>
              <input
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={fields.confirm}
                onChange={inputHandler}
                required
              />
            </div>
          </div>

          {error && <p style={{ color: "red", fontSize: "0.85rem" }}>{error}</p>}

          <button className="login-btn" type="submit" disabled={authLoading}>
            {authLoading ? "RESETTING..." : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
}