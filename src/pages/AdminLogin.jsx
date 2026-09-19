import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  localStorage.setItem("admin", "true");

  localStorage.setItem(
    "loggedUser",
    JSON.stringify({
      name: "Admin",
      email: "admin@jobportal.com",
      role: "admin",
    })
  );

  alert("Admin Login Successful");

  navigate("/admin");

  window.location.reload();
} else {
  alert("Invalid Admin Credentials");
}
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow-lg border-0">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">
                Admin Login
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Admin Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="alert alert-info mt-3">
                <strong>Demo Admin Credentials</strong>
                  <br />
                Email: <b>admin@jobportal.com</b>
                  <br />
                Password: <b>admin123</b>
                </div>


                <button
                  className="btn btn-primary w-100"
                >
                  Login
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminLogin;