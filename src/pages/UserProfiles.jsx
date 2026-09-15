import { useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

function UserProfiles() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const deleteUser = (email) => {
    if (!window.confirm("Delete this user?")) return;

    const updatedUsers = users.filter(
      (user) => user.email !== email
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    window.location.reload();
  };

  return (
    <>
      <AdminNavbar />

      <div className="container mt-3">
        <Link
          to="/admin"
          className="btn btn-dark"
        >
          ← Dashboard
        </Link>
      </div>

      <div className="container my-5">

        <h2 className="fw-bold mb-4">
          👥 User Profiles ({users.length})
        </h2>

        {users.length === 0 ? (
          <div className="alert alert-warning">
            No Users Found
          </div>
        ) : (
          users.map((user, index) => (
            <div
              key={index}
              className="card shadow-lg border-0 mb-4"
              style={{ borderRadius: "20px" }}
            >
              <div className="card-body p-4">

                <div className="row align-items-center">

                  <div className="col-md-8">

                    <h4 className="fw-bold text-primary">
                      {user.name}
                    </h4>

                    <p className="mb-1">
                      📧 {user.email}
                    </p>

                    <p className="mb-1">
                      📱 {user.phone}
                    </p>

                    <div className="row mt-3">

                      <div className="col-md-4">
                        <strong>10th:</strong>{" "}
                        {user.tenth || "N/A"}%
                      </div>

                      <div className="col-md-4">
                        <strong>Inter:</strong>{" "}
                        {user.intermediate || "N/A"}%
                      </div>

                      <div className="col-md-4">
                        <strong>Degree:</strong>{" "}
                        {user.degree || "N/A"}%
                      </div>

                    </div>

                  </div>

                  <div className="col-md-4 text-end">

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
            <div className="modal-dialog modal-lg modal-dialog-scrollable">

              <div className="modal-content">

                <div className="modal-header">

                  <h4 className="modal-title fw-bold">
                    Candidate Profile
                  </h4>

                  <button
                    className="btn-close"
                    onClick={() =>
                      setSelectedUser(null)
                    }
                  ></button>

                </div>

                <div className="modal-body">

                  <h5 className="text-primary fw-bold">
                    👤 Personal Information
                  </h5>

                  <hr />

                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedUser.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {selectedUser.email}
                  </p>

                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedUser.phone}
                  </p>

                  <p>
                    <strong>Country:</strong>{" "}
                    {selectedUser.country}
                  </p>

                  <p>
                    <strong>State:</strong>{" "}
                    {selectedUser.state}
                  </p>

                  <p>
                    <strong>City:</strong>{" "}
                    {selectedUser.city}
                  </p>

                  <h5 className="text-success fw-bold mt-4">
                    🎓 Education
                  </h5>

                  <hr />

                  <p>
                    <strong>10th %:</strong>{" "}
                    {selectedUser.tenth}
                  </p>

                  <p>
                    <strong>Intermediate %:</strong>{" "}
                    {selectedUser.intermediate}
                  </p>

                  <p>
                    <strong>Degree %:</strong>{" "}
                    {selectedUser.degree}
                  </p>

                  <p>
                    <strong>College:</strong>{" "}
                    {selectedUser.college}
                  </p>

                  <p>
                    <strong>Branch:</strong>{" "}
                    {selectedUser.branch}
                  </p>

                  <p>
                    <strong>Passout Year:</strong>{" "}
                    {selectedUser.passoutYear}
                  </p>

                  <h5 className="text-warning fw-bold mt-4">
                    💼 Professional Details
                  </h5>

                  <hr />

                  <p>
                    <strong>Experience:</strong>{" "}
                    {selectedUser.experience}
                  </p>

                  <p>
                    <strong>LinkedIn:</strong>{" "}
                    {selectedUser.linkedin}
                  </p>

                  <p>
                    <strong>GitHub:</strong>{" "}
                    {selectedUser.github}
                  </p>

                  <div className="mt-3">

                    <strong>Skills:</strong>

                    <div className="mt-2">

                      {selectedUser.skills
                        ? selectedUser.skills
                            .split(",")
                            .map((skill, i) => (
                              <span
                                key={i}
                                className="badge bg-primary me-2 mb-2"
                              >
                                {skill.trim()}
                              </span>
                            ))
                        : "No Skills"}

                    </div>

                  </div>

                  {selectedUser.resume && (
                    <div className="mt-4">

                      <a
                        href={selectedUser.resume}
                        download={
                          selectedUser.resumeName ||
                          "resume.docx"
                        }
                        className="btn btn-success"
                      >
                        📄 Download Resume
                      </a>

                    </div>
                  )}

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