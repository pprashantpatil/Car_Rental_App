import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import SignInwithGoogle from "./signInWIthGoogle";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import API_BASE_URL from "../config";
import { useLoading } from "../contexts/LoadingContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userselected, setuserselected] = useState();
  const [logintype, setlogintype] = useState();
  const { showLoader, hideLoader } = useLoading();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    // Handle login logic here

    if (userselected == "user") {
      showLoader();
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        hideLoader();
        localStorage.setItem("email", data.user.Email);
        localStorage.setItem("logintype", "user");
        window.dispatchEvent(new Event("storage")); // 👈 trigger Header to re-fetch
        navigate("/cars");
      } else {
        hideLoader();
        toast.error("login failed,incorrect username or password");
      }
    } else {
      showLoader();
      if (email == "admin" && password == "welcome") {
        toast.success("admin login success");
        localStorage.setItem("email", "admin");
        localStorage.setItem("logintype", "admin");
        window.dispatchEvent(new Event("storage")); // 👈 trigger Header to re-fetch
        showLoader();
        navigate("/cars");
      } else {
        hideLoader();
        toast.error("admin login failed");
      }
    }
  };

  return (
    <>
      {!userselected ? (
        <div className="container d-flex align-items-center justify-content-center vh-100 bg-light">
          <div className="row w-100 text-center">
            <h2 className="mb-5">👋 Welcome! Choose Login Type</h2>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg p-4 hover-card"
                style={{ cursor: "pointer" }}
                onClick={() => setuserselected("user")}
              >
                <h3 className="mb-3">🧑‍💼 User Login</h3>
                <p>
                  Login as a regular user to explore your dashboard and
                  services.
                </p>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div
                className="card shadow-lg p-4 hover-card"
                style={{ cursor: "pointer" }}
                onClick={() => setuserselected("admin")}
              >
                <h3 className="mb-3">👨‍💼 Admin Login</h3>
                <p>
                  Login as an admin to manage users, content, and system
                  settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {userselected === "user" && (
            <div>
              <div className="container d-flex align-items-center justify-content-center vh-100">
                <div
                  className="card shadow p-4"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  <h3 className="text-center mb-4">
                    🔐 Login to Your{" "}
                    {userselected === "admin" ? "Admin" : "User"} Account
                  </h3>

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
                      <Link
                        to="/register"
                        className="text-decoration-none fw-semibold"
                      >
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
            </div>
          )}
          {userselected === "admin" && (
            <div>
              <div className="container d-flex align-items-center justify-content-center vh-100">
                <div
                  className="card shadow p-4"
                  style={{ maxWidth: "400px", width: "100%" }}
                >
                  <h3 className="text-center mb-4">
                    🔐 Login to Your{" "}
                    {userselected === "admin" ? "Admin" : "User"} Account
                  </h3>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">📧 Username</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Username"
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
                      <Link
                        to="/register"
                        className="text-decoration-none fw-semibold"
                      >
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
            </div>
          )}
        </>
      )}
    </>
  );
}
export default Login;
