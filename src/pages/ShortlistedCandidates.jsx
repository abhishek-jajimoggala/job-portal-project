import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import "./ShortlistedCandidates.css";

function ShortlistedCandidates() {
  const [selectedUser, setSelectedUser] = useState(null);

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  );

  return (
    <>
      <AdminNavbar />

      <div className="shortlisted-page">
        <div className="container-fluid px-0">

          <Link
            to="/admin"
            className="btn btn-dark rounded-pill px-4 mb-4"
          >
            ← Dashboard
          </Link>

          <div className="shortlisted-header">
            <h1>🎯 Shortlisted Candidates</h1>

            <p>
              Successfully selected candidates for
              further hiring process.
            </p>

            <span className="badge bg-light text-success fs-6 px-4 py-2">
              Total Candidates : {shortlisted.length}
            </span>
          </div>

          {shortlisted.length === 0 ? (
            <div className="alert alert-success">
              No Shortlisted Candidates Found
            </div>
          ) : (
            shortlisted.map((app, index) => {
              const user = users.find(
                (u) => u.email === app.userEmail
              );

              return (
                <div
                  key={index}
                  className="card shortlisted-card"
                >
                  <div className="card-body p-4">

                    <div className="row align-items-center">

                      <div className="col-lg-2 text-center">
                        <img
                          src={
                            user?.photo ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt=""
                          className="candidate-img"
                        />
                      </div>

                      <div className="col-lg-7">

                        <h3 className="candidate-name">
                          {app.userName}
                        </h3>

                        <p>📧 {app.userEmail}</p>

                        <p>
                          📱 {user?.phone || "N/A"}
                        </p>

                        <p>
                          📍 {user?.state || "N/A"}
                        </p>

                        <p>
                          💼 <b>{app.title}</b>
                        </p>

                        <p>
                          📅 Applied :
                          {" "}
                          {app.appliedDate}
                        </p>

                        <div className="skills-wrapper">
                          {user?.skills ? (
                            user.skills
                              .split(",")
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="badge bg-success me-2 mb-2"
                                >
                                  {skill.trim()}
                                </span>
                              ))
                          ) : (
                            <span>
                              No Skills Available
                            </span>
                          )}
                        </div>

                      </div>

                      <div className="col-lg-3 text-lg-end">

                        <span className="badge bg-success fs-6 px-4 py-2">
                          ✔ Shortlisted
                        </span>

                        <div className="d-grid gap-2 mt-3">

                          <button
                            className="btn btn-outline-success"
                            onClick={() =>
                              setSelectedUser(user)
                            }
                          >
                            👤 View Profile
                          </button>

                          {user?.resume && (
                            <a
                              href={user.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-success"
                            >
                              📄 View Resume
                            </a>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>
                </div>
              );
            })
          )}

        </div>

        {/* React Modal */}
        {selectedUser && (
          <div className="custom-modal">

            <div className="custom-modal-content">

              <div className="custom-modal-header">
                <h4>Candidate Profile</h4>

                <button
                  className="btn-close btn-close-white"
                  onClick={() =>
                    setSelectedUser(null)
                  }
                ></button>
              </div>

              <div className="custom-modal-body">

                <div className="text-center mb-4">

                  <img
                    src={
                      selectedUser.photo ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt=""
                    className="modal-profile-img"
                  />

                </div>

                <h3>{selectedUser.name}</h3>

                <p>📧 {selectedUser.email}</p>

                <p>📱 {selectedUser.phone}</p>

                <p>📍 {selectedUser.state}</p>

                <hr />

                <h5>🎓 Education</h5>

                <p>
                  10th :
                  {" "}
                  {selectedUser.tenth || "N/A"}
                </p>

                <p>
                  Intermediate :
                  {" "}
                  {selectedUser.intermediate || "N/A"}
                </p>

                <p>
                  Degree :
                  {" "}
                  {selectedUser.degree || "N/A"}
                </p>

                <p>
                  College :
                  {" "}
                  {selectedUser.college || "N/A"}
                </p>

                <hr />

                <h5>🛠 Skills</h5>

                <p>
                  {selectedUser.skills ||
                    "No Skills"}
                </p>

                {selectedUser.resume && (
                  <a
                    href={selectedUser.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-success mt-3"
                  >
                    View Resume
                  </a>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
}

export default ShortlistedCandidates;