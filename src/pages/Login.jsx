import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

    if (form.password.length < 6) {
  alert("Password must be at least 6 characters");
  return;
}

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    console.log("Users:", users);
    console.log("Form:", form);

    const user = users.find(
      (u) =>
        u.email?.toLowerCase().trim() ===
          form.email?.toLowerCase().trim() &&
        u.password === form.password
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    localStorage.setItem(
      "loggedUser",
      JSON.stringify(user)
    );

    alert(`Welcome ${user.name}`);

    navigate("/");
    window.location.reload();
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow border-0">
            <div className="card-body p-4">

              <h2 className="text-center mb-4 text-primary">
                Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Email
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

              <p className="text-center mt-3">
                Don't have an account?
                <Link
                  to="/register"
                  className="ms-1"
                >
                  Register
                </Link>
              </p>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;