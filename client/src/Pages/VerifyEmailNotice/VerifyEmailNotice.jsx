import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";

export default function VerifyEmailNotice() {
  const location = useLocation();
  const email = location.state?.email || "";
  const { resendVerification, authLoading } = useAuthContext();
  const [cooldown, setCooldown] = useState(false);

  const handleResend = async () => {
    await resendVerification(email);
    setCooldown(true);
    setTimeout(() => setCooldown(false), 120000); // 2 minute UI cooldown
  };

  return (
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card">
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>📬</div>
          <h2>Check your inbox</h2>
          <p className="subtitle">
            We sent a verification link to <strong>{email || "your email"}</strong>.
            Click it to activate your account.
          </p>
          <p className="subtitle" style={{ marginTop: "0.5rem" }}>
            The link expires in <strong>24 hours</strong>.
          </p>

          <button
            className="login-btn"
            onClick={handleResend}
            disabled={authLoading || cooldown}
            style={{ marginTop: "1.5rem" }}
          >
            {authLoading ? "SENDING..." : cooldown ? "LINK SENT (wait 2 min)" : "RESEND EMAIL"}
          </button>

          <p className="signup-text" style={{ marginTop: "1rem" }}>
            <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}