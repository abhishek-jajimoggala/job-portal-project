import { Link } from "react-router-dom";
import { Collapse } from "bootstrap";
import { useState } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const isAdmin =
    loggedUser?.role === "admin";

  const closeNavbar = () => {
    const navbar =
      document.getElementById("navbarNav");

    if (
      navbar &&
      navbar.classList.contains("show")
    ) {
      const bsCollapse =
        Collapse.getInstance(navbar) ||
        new Collapse(navbar, {
          toggle: false,
        });

      bsCollapse.hide();
    }

    setShowDropdown(false);
  };

  const logout = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("admin");

    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container-fluid px-3">

        <Link
          className="navbar-brand fw-bold fs-4"
          to="/"
        >
          JobPortal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >

          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/"
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/jobs"
                onClick={closeNavbar}
              >
                Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/companies"
                onClick={closeNavbar}
              >
                Companies
              </Link>
            </li>

            {!isAdmin && loggedUser && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/saved-jobs"
                    onClick={closeNavbar}
                  >
                    Saved Jobs
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/categories"
                    onClick={closeNavbar}
                  >
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/my-applications"
                    onClick={closeNavbar}
                  >
                    Applications
                  </Link>
                </li>
              </>
            )}

          </ul>

          {!loggedUser ? (

            <div className="d-flex gap-2">

              <Link
                to="/login"
                className="btn btn-light"
                onClick={closeNavbar}
              >
                User Login
              </Link>

              <Link
                to="/admin-login"
                className="btn btn-warning"
                onClick={closeNavbar}
              >
                Admin Login
              </Link>

              <Link
                to="/register"
                className="btn btn-success"
                onClick={closeNavbar}
              >
                Register
              </Link>

            </div>

          ) : (

            <div className="position-relative">

              <button
                className="btn btn-light"
                onClick={() =>
                  setShowDropdown(!showDropdown)
                }
              >
                👤 {loggedUser.name} ▼
              </button>

              {showDropdown && (
                <ul
                  className="dropdown-menu show dropdown-menu-end"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "100%",
                    zIndex: 99999,
                  }}
                >

                  {!isAdmin && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/profile"
                          onClick={closeNavbar}
                        >
                          My Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/saved-jobs"
                          onClick={closeNavbar}
                        >
                          Saved Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/my-applications"
                          onClick={closeNavbar}
                        >
                          My Applications
                        </Link>
                      </li>
                    </>
                  )}

                  {isAdmin && (
                    <>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/profile"
                          onClick={closeNavbar}
                        >
                          Profile
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/jobs"
                          onClick={closeNavbar}
                        >
                          Manage Jobs
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/users"
                          onClick={closeNavbar}
                        >
                          Users
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/applications"
                          onClick={closeNavbar}
                        >
                          Applications
                        </Link>
                      </li>
                    </>
                  )}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </li>

                </ul>
              )}

            </div>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;