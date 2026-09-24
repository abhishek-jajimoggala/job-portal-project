import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import jobImage from "../assets/jobs.jpg";

function Login() {
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

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email?.toLowerCase().trim() ===
          form.email?.toLowerCase().trim() &&
        u.password === form.password
    );

    if (!user) {
      toast.error("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "loggedUser",
      JSON.stringify(user)
    );

    toast.success(`Welcome ${user.name}`);
    navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">
          <div className="overlay">

            <h1>
              Find Your
              <span style={{ color: "#60a5fa" }}>
                {" "}Dream Job
              </span>
            </h1>

            <p>
              Search thousands of jobs from top
              companies and apply instantly.
            </p>

            <img
              src={jobImage}
              alt="Job Portal"
              className="login-image"
            />

          </div>
        </div>

        {/* Right Side */}
        <div className="login-right">
          <div className="login-card">

            <h2>User Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={form.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={form.password}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Login
              </button>
            </form>

            <p className="register-text">
              Don't have an account?
              <Link to="/register">
                {" "}Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;