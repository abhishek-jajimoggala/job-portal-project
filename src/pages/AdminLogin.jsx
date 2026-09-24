import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import jobImage from "../assets/jobs.jpg";
import "../styles/Login.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.email === "admin@jobportal.com" &&
      form.password === "admin123"
    ) {
      const adminUser = {
        name: "Admin",
        email: "admin@jobportal.com",
        role: "admin",
      };

      localStorage.setItem(
        "loggedUser",
        JSON.stringify(adminUser)
      );

      localStorage.setItem("admin", "true");

      toast.success("Admin Login Successful");

      navigate("/admin");
    } else {
      toast.error("Invalid Admin Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <div className="overlay">
            <h1>
              Admin <span style={{ color: "#60a5fa" }}>Portal</span>
            </h1>

            <p>
              Manage jobs, users and applications
              from one secure dashboard.
            </p>

            <img
              src={jobImage}
              alt="Admin Portal"
              className="login-image"
            />
          </div>
        </div>

        <div className="login-right">
          <div className="login-card">

            <h2>Admin Login</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminLogin;