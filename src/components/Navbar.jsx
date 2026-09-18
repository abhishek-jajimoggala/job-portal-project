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
        aria-controls="navbarNav"
        aria-expanded="false"
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
                <Link className="nav-link" to="/categories">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/my-applications">
                  Applications
                </Link>
              </li>
            </>
          )}
        </ul>

        {!loggedUser ? (
          <div className="d-flex flex-column flex-lg-row gap-2 mt-3 mt-lg-0">

            <Link
              to="/login"
              className="btn btn-light"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-warning"
            >
              Register
            </Link>

          </div>
        ) : (
          <div className="dropdown text-center mt-3 mt-lg-0">

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