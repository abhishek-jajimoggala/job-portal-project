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

    const users =
      JSON.parse(localStorage.getItem("users")) || [];

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
    <div className="container-fluid">
      <div
        className="row justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-11 col-sm-10 col-md-8 col-lg-5 col-xl-4">

          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">

              <h2 className="text-center text-primary fw-bold mb-4">
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
                    className="form-control form-control-lg"
                    placeholder="Enter Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder="Enter Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100"
                >
                  Login
                </button>
              </form>

              <p className="text-center mt-4 mb-0">
                Don't have an account?
                <Link
                  to="/register"
                  className="ms-2 text-decoration-none fw-semibold"
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