import { Link } from "react-router-dom";

function Navbar() {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const logout = () => {
    localStorage.removeItem("loggedUser");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">

        <Link
          className="navbar-brand fw-bold text-primary fs-3"
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
              <Link className="nav-link fw-semibold" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/jobs">
                Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/companies">
                Companies
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link fw-semibold"
                to="/saved-jobs"
              >
                Saved Jobs
              </Link>
            </li>

            {loggedUser && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    to="/categories"
                  >
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold"
                    to="/my-applications"
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
                className="btn btn-outline-primary"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="btn btn-primary"
              >
                Register
              </Link>

            </div>
          ) : (
            <div className="dropdown">

              <button
                className="btn btn-light dropdown-toggle border"
                data-bs-toggle="dropdown"
              >
                👤 {loggedUser.name || "User"}
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
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;