import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    localStorage.setItem("email", email);
    window.dispatchEvent(new Event("storage")); // 👈 trigger Header to re-fetch
    navigate("/cars");
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h3 className="text-center mb-4">🔐 Login to Your Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">📧 Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">🔑 Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              🔓 Login
            </button>
          </div>

          <p className="text-center">
            New user?{" "}
            <Link to="/register" className="text-decoration-none fw-semibold">
              Register Here
            </Link>
          </p>

          {/* Optional: Add Google Sign-In */}
          {/* <div className="text-center mt-3">
            <SignInWithGoogle />
          </div> */}
        </form>
      </div>
    </div>
  );
}
export default Login;
