import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountCreated, setAccountCreated] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      debugger;
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setAccountCreated(true);

        // Optional: Toast message
        toast.success("Account created successfully!");

        // Redirect to login after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else if (response.status === 409) {
        toast.error(data.message || "Registration failed.");
      } else {
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      {!accountCreated ? (
        <div
          className="card p-4 shadow"
          style={{ maxWidth: "450px", width: "100%" }}
        >
          <h3 className="text-center mb-4">📝 Sign Up</h3>

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <label className="form-label">👤 First Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter first name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">👤 Last Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter last name"
                onChange={(e) => setLname(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">📧 Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">🔐 Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="d-grid mb-3">
              <button type="submit" className="btn btn-success">
                ✅ Create Account
              </button>
            </div>

            <p className="text-center">
              Already registered?{" "}
              <Link to="/login" className="fw-semibold text-decoration-none">
                Login
              </Link>
            </p>
          </form>
        </div>
      ) : (
        <div className="text-center">
          <img
            src="https://media.tenor.com/3AsA7_b0FekAAAAj/sport-utility-vehicle-joypixels.gif"
            alt="Car Moving"
            style={{ height: "150px" }}
            className="mb-4"
          />
          <div className="alert alert-success animate__animated animate__fadeInUp">
            <h5>🎉 Congratulations {fname}!</h5>
            <p>Your account has been created successfully.</p>
            <p>You will be redirected to login shortly...</p>
            <p>
              Or <Link to="/login">click here</Link> to login manually.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
