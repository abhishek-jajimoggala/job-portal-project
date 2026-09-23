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
    <div className="admin-sidebar">

      <div>
        <h3 className="sidebar-logo">
          🚀 JobPortal
        </h3>

        

        <ul className="sidebar-menu">

          <li>
            <Link to="/admin">
              📊 Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/jobs">
              💼 Manage Jobs
            </Link>
          </li>

          <li>
            <Link to="/admin/posted-jobs">
              📢 Posted Jobs
            </Link>
          </li>

          <li>
            <Link to="/admin/users">
              👥 Users
            </Link>
          </li>

          <li>
            <Link to="/admin/applications">
              📄 Applications
            </Link>
          </li>

          <li>
            <Link to="/admin/profile">
              ⚙️ Profile
            </Link>
          </li>

        </ul>
      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>
  );
}

export default AdminNavbar;