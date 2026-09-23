import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { toast } from "react-toastify";

function UserProfiles() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState("");

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (email) => {
    if (!window.confirm("Delete this user?")) return;

    const updatedUsers = users.filter(
      (user) => user.email !== email
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    toast.success("User Deleted Successfully");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <AdminNavbar />

      <div
        className="container-fluid py-4"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#eef2ff,#f8fafc,#e0f2fe)",
        }}
      >
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Link
              to="/admin"
              className="btn btn-dark rounded-pill px-4"
            >
              ← Dashboard
            </Link>

            <h2 className="fw-bold text-primary">
              👥 User Profiles ({filteredUsers.length})
            </h2>
          </div>

          {/* Search */}
          <div className="row mb-4">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="🔍 Search Users..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* Users */}
          {filteredUsers.length === 0 ? (
            <div className="alert alert-warning">
              No Users Found
            </div>
          ) : (
            filteredUsers.map((user, index) => (
              <div
                key={index}
                className="card border-0 shadow-lg mb-4"
                style={{
                  borderRadius: "20px",
                }}
              >
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <div className="col-md-2 text-center">
                      <img
                        src={
                          user.photo ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt=""
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <div className="col-md-7">
                      <h4 className="fw-bold text-primary">
                        {user.name}
                      </h4>

                      <p className="mb-1">
                        📧 {user.email}
                      </p>

                      <p className="mb-1">
                        📱 {user.phone}
                      </p>

                      <p className="mb-2">
                        📍 {user.state}
                      </p>

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

                    <div className="col-md-3 text-end">
                      <button
                        className="btn btn-info me-2"
                        onClick={() =>
                          setSelectedUser(user)
                        }
                      >
                        View Profile
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          deleteUser(user.email)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Modal */}
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
                    <h4 className="modal-title">
                      Candidate Profile
                    </h4>

                    <button
                      className="btn-close btn-close-white"
                      onClick={() =>
                        setSelectedUser(null)
                      }
                    ></button>
                  </div>

                  <div className="modal-body">
                    <div className="text-center mb-4">
                      <img
                        src={
                          selectedUser.photo ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt=""
                        style={{
                          width: "130px",
                          height: "130px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </div>

                    <h4>{selectedUser.name}</h4>

                    <p>
                      📧 {selectedUser.email}
                    </p>

                    <p>
                      📱 {selectedUser.phone}
                    </p>

                    <p>
                      📍 {selectedUser.state}
                    </p>

                    <hr />

                    <h5>Education</h5>

                    <p>
                      10th:
                      {" "}
                      {selectedUser.tenth}
                    </p>

                    <p>
                      Intermediate:
                      {" "}
                      {selectedUser.intermediate}
                    </p>

                    <p>
                      Degree:
                      {" "}
                      {selectedUser.degree}
                    </p>

                    <p>
                      College:
                      {" "}
                      {selectedUser.college}
                    </p>

                    <p>
                      Branch:
                      {" "}
                      {selectedUser.branch}
                    </p>

                    <p>
                      Passout Year:
                      {" "}
                      {selectedUser.passoutYear}
                    </p>

                    <hr />

                    <h5>Professional Details</h5>

                    <p>
                      Experience:
                      {" "}
                      {selectedUser.experience}
                    </p>

                    <p>
                      LinkedIn:
                      {" "}
                      {selectedUser.linkedin}
                    </p>

                    <p>
                      GitHub:
                      {" "}
                      {selectedUser.github}
                    </p>

                    <div className="mt-3">
                      <strong>
                        Skills:
                      </strong>

                      <div className="mt-2">
                        {selectedUser.skills
                          ?.split(",")
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="badge bg-success me-2 mb-2"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>
                    </div>

                    {selectedUser.resume && (
                      <a
                        href={
                          selectedUser.resume
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success mt-4"
                      >
                        📄 View Resume
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserProfiles;