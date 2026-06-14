import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../../utils/AxiosInstance";

export default function VerifyEmailConfirm() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading"); // "loading" | "success" | "error"
  const [message, setMessage] = useState("");
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return; // if already fired, skip
    hasFired.current = true;      // mark as fired
    const verify = async () => {
      try {
        const response = await axiosInstance.get(`/auth/verify-email/${token}`);
        setMessage(response.data.message);
        setStatus("success");
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong.");
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  const icon = {
    loading: "⏳",
    success: "✅",
    error: "❌",
  }[status];

  return (
    <div className="login-page">
      <div className="logo-section">
        <div className="logo-icon">🏢</div>
        <h1>City Connect</h1>
        <p>Smart Infrastructure Management</p>
      </div>

      <div className="login-card" style={{ textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>{icon}</div>
        <h2>
          {status === "loading" && "Verifying..."}
          {status === "success" && "Email Verified!"}
          {status === "error" && "Verification Failed"}
        </h2>
        <p className="subtitle">{message}</p>

        {status === "success" && (
          <Link to="/login">
            <button className="login-btn" style={{ marginTop: "1.5rem" }}>
              GO TO LOGIN
            </button>
          </Link>
        )}

        {status === "error" && (
          <Link to="/verify-email">
            <button className="login-btn" style={{ marginTop: "1.5rem" }}>
              RESEND VERIFICATION
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}