import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
  alert("Please fill all fields");
  return;
}

if (form.password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

if (form.password !== form.confirmPassword) {
  alert("Passwords do not match");
  return;
}

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase().trim() ===
        form.email.toLowerCase().trim()
    );

    if (existingUser) {
      alert("User already exists");
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

      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    navigate("/login");
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">

        <div className="col-lg-5 col-md-7">

          <div className="card shadow-lg border-0">
            <div className="card-body p-5">

              <h2 className="text-center fw-bold mb-4">
                Create Account
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Full Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        minLength={6}
                        required
                      />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Confirm Password
                  </label>

                  <input
                      type="password"
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      minLength={6}
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

              <p className="text-center mt-4 mb-0">
                Already have an account?
                <Link
                  to="/login"
                  className="ms-2"
                >
                  Login
                </Link>
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;