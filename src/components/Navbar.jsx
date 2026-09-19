import { Link } from "react-router-dom";

function Navbar() {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const isAdmin =
    localStorage.getItem("admin") === "true";

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

          <ul className="navbar-nav mx-auto text-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/jobs">
                Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/companies">
                Companies
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/saved-jobs">
                Saved Jobs
              </Link>
            </li>

            {loggedUser && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/my-applications"
                  >
                    Applications
                  </Link>
                </li>
              </>
            )}

          </ul>

          {!loggedUser ? (

            <div className="dropdown">

              <button
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Login
              </button>

              <ul className="dropdown-menu dropdown-menu-end">

                <li>
                  <Link
                    className="dropdown-item"
                    to="/login"
                  >
                    👤 User Login
                  </Link>
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/admin-login"
                  >
                    🛠 Admin Login
                  </Link>
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item"
                    to="/register"
                  >
                    📝 Register
                  </Link>
                </li>

              </ul>

            </div>

          ) : (

            <div className="d-flex align-items-center gap-2">

              {isAdmin && (
                <Link
                  to="/admin"
                  className="btn btn-warning"
                >
                  Admin Dashboard
                </Link>
              )}

              <div className="dropdown">

                <button
                  className="btn btn-light dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  👤 {loggedUser.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end">

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/profile"
                    >
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/saved-jobs"
                    >
                      Saved Jobs
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="dropdown-item"
                      to="/my-applications"
                    >
                      My Applications
                    </Link>
                  </li>

                  {isAdmin && (
                    <>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>

                      <li>
                        <Link
                          className="dropdown-item text-primary"
                          to="/admin"
                        >
                          🛠 Admin Dashboard
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

              </div>

            </div>

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;