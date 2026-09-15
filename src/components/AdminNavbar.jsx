import { Link, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  return (
    <nav className="navbar navbar-expand-lg admin-navbar sticky-top">
      <div className="container-fluid">

        {/* Logo */}
        <Link
          to="/admin"
          className="navbar-brand fw-bold"
        >
          🚀 JobPortal Admin
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminNavbar"
          aria-controls="adminNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
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
              to="/admin/applications"
              className="nav-link"
            >
              Applications
            </Link>

            <Link
              to="/admin/users"
              className="nav-link"
            >
              Users
            </Link>

            <Link
              to="/admin/resumes"
              className="nav-link"
            >
              Resumes
            </Link>

            <Link
              to="/admin/shortlisted"
              className="nav-link"
            >
              Shortlisted
            </Link>

            <Link
              to="/admin/rejected"
              className="nav-link"
            >
              Rejected
            </Link>

          </div>

          {/* Logout */}
          <button
            className="btn btn-danger admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;