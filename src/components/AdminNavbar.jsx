import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const admin = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("loggedUser");

    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow admin-navbar">
      <div className="container-fluid">

        <Link
          to="/admin"
          className="navbar-brand fw-bold"
        >
          🚀 JobPortal Carrer
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="adminNavbar"
        >

          <div className="navbar-nav me-auto">

            <Link
              to="/admin"
              className="nav-link"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/jobs"
              className="nav-link"
            >
              Manage Jobs
            </Link>

            <Link
              to="/admin/posted-jobs"
              className="nav-link"
            >
              Posted Jobs
            </Link>

            <Link
              to="/admin/users"
              className="nav-link"
            >
              Users
            </Link>

            <Link
              to="/admin/applications"
              className="nav-link"
            >
              Applications
            </Link>

          </div>

          {/* Admin Profile Dropdown */}
          <div className="dropdown">

            <button
              className="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              👤 {admin?.name || "Admin"}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

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
                  to="/admin/users"
                >
                  Users
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
                <hr className="dropdown-divider" />
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>

            </ul>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;