import { Link } from "react-router-dom";

function Navbar() {
  const loggedUser = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const isAdmin =
    loggedUser?.role === "admin";

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
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/jobs"
              >
                Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/companies"
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
                  >
                    Saved Jobs
                  </Link>
                </li>

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

            <div className="d-flex gap-2">

              <Link
                to="/login"
                className="btn btn-light"
              >
                User Login
              </Link>

              <Link
                to="/admin-login"
                className="btn btn-warning"
              >
                Admin Login
              </Link>

              <Link
                to="/register"
                className="btn btn-success"
              >
                Register
              </Link>

            </div>

          ) : (

            <div className="dropdown">

              <button
                className="btn btn-light dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                👤 {loggedUser.name}
              </button>

              <ul className="dropdown-menu dropdown-menu-end">

                {!isAdmin && (
                  <>
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
                  </>
                )}

                {isAdmin && (
                  <>
                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/profile"
                      >
                        Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/jobs"
                      >
                        Manage Jobs
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/applications"
                      >
                        Applications
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="dropdown-item"
                        to="/admin/users"
                      >
                        Users
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

          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;