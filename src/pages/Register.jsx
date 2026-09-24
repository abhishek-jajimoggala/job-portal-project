import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../styles/Register.css";
import jobImage from "../assets/jobs.jpg";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    if (form.password.length < 6) {
      toast.warning(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (
      form.password !== form.confirmPassword
    ) {
      toast.warning("Passwords do not match");
      return;
    }

    let users =
      JSON.parse(
        localStorage.getItem("users")
      ) || [];

    const existingUser = users.find(
      (user) =>
        user.email
          .toLowerCase()
          .trim() ===
        form.email
          .toLowerCase()
          .trim()
    );

    if (existingUser) {
      toast.warning("User already exists");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),

      phone: "",
      state: "",
      skills: "",

      tenth: "",
      intermediate: "",
      degree: "",

      createdAt:
        new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    toast.success(
      "Registration Successful"
    );

    navigate("/login");
  };

  return (
    <div className="login-page">

      <div className="login-container">

        {/* Left Side */}
        <div className="login-left">

          <div className="overlay">
  <h1>
    Job <span style={{ color: "#60a5fa" }}>Portal</span>
  </h1>

  <p>
    Join thousands of job seekers and find your dream career today.
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

            <h2>Create Account</h2>

            <form
              onSubmit={handleSubmit}
            >

              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={
                    form.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Register
              </button>

            </form>

            <p className="register-text">
              Already have an account?
              <Link to="/login">
                {" "}
                Login
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;