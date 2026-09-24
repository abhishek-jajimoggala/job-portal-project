import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminNavbar.css";

function AdminNavbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("loggedUser");

    navigate("/");
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="mobile-header">
        <button
          className="menu-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h4>Job Portal Admin</h4>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`admin-sidebar ${
          sidebarOpen ? "show" : ""
        }`}
      >
        <div className="sidebar-top">
          <h3>🚀 Admin Panel</h3>

          <button
            className="close-btn"
            onClick={closeSidebar}
          >
            ✕
          </button>
        </div>

        <Link to="/admin" onClick={closeSidebar}>
          📊 Dashboard
        </Link>

        <Link
          to="/admin/jobs"
          onClick={closeSidebar}
        >
          💼 Manage Jobs
        </Link>

        <Link
          to="/admin/applications"
          onClick={closeSidebar}
        >
          📄 Applications
        </Link>

        <Link
          to="/admin/users"
          onClick={closeSidebar}
        >
          👥 Users
        </Link>

        <Link
          to="/admin/posted-jobs"
          onClick={closeSidebar}
        >
          📢 Posted Jobs
        </Link>

        <Link
          to="/admin/shortlisted"
          onClick={closeSidebar}
        >
          ✅ Shortlisted
        </Link>

        <Link
          to="/admin/rejected"
          onClick={closeSidebar}
        >
          ❌ Rejected
        </Link>

        <Link
          to="/admin/profile"
          onClick={closeSidebar}
        >
          👤 Profile
        </Link>

        {/* Logout Button */}
        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </>
  );
}

export default AdminNavbar;