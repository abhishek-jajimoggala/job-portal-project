import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import "./UserProfiles.css";

function UserProfiles() {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <AdminNavbar />

      <div className="user-profiles-page">
        <div className="page-header">
          <Link
            to="/admin"
            className="btn btn-dark rounded-pill px-4"
          >
            ← Dashboard
          </Link>

          <h2>
            👥 User Profiles ({filteredUsers.length})
          </h2>
        </div>

        <div className="search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search Users..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="card user-card"
          >
            <div className="card-body">
              <div className="row align-items-center">

                <div className="col-lg-2 text-center">
                  <img
                    src={
                      user.photo ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt="user"
                    className="profile-img"
                  />
                </div>

                <div className="col-lg-7">
                  <h4 className="user-name">
                    {user.name}
                  </h4>

                  <p>📧 {user.email}</p>
                  <p>📱 {user.phone}</p>
                  <p>📍 {user.state}</p>

                  <div>
                    {user.skills
                      ?.split(",")
                      .map((skill, i) => (
                        <span
                          key={i}
                          className="badge bg-primary me-2 mb-2"
                        >
                          {skill.trim()}
                        </span>
                      ))}
                  </div>
                </div>

                <div className="col-lg-3 text-end">
                  <button
                    className="btn btn-info me-2"
                    onClick={() =>
                      setSelectedUser(user)
                    }
                  >
                    View Profile
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}

        {selectedUser && (
          <div
            className="modal show d-block"
            style={{
              background:
                "rgba(0,0,0,0.6)",
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">

                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    Candidate Profile
                  </h5>

                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() =>
                      setSelectedUser(null)
                    }
                  ></button>
                </div>

                <div className="modal-body">
                  <h4>
                    {selectedUser.name}
                  </h4>

                  <p>
                    📧 {selectedUser.email}
                  </p>

                  <p>
                    📱 {selectedUser.phone}
                  </p>

                  <p>
                    📍 {selectedUser.state}
                  </p>

                  <p>
                    🎓 Degree:
                    {" "}
                    {selectedUser.degree}
                  </p>

                  <p>
                    🏫 College:
                    {" "}
                    {selectedUser.college}
                  </p>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UserProfiles;