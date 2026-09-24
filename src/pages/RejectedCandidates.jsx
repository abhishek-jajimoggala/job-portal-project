import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import "./RejectedCandidates.css";

function RejectedCandidates() {
  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  );

  return (
    <>
      <AdminNavbar />

      <div className="rejected-page">

        <div className="rejected-container">

          {/* Header */}
          <div className="rejected-header">
            <div>
              <h1>❌ Rejected Candidates</h1>
              <p>Manage rejected applicants</p>
            </div>

            <Link
              to="/admin"
              className="btn btn-dark dashboard-btn"
            >
              ← Dashboard
            </Link>
          </div>

          {/* Stats Card */}
          <div className="card shadow-lg border-0 rejected-stats-card">
            <div className="card-body text-center">
              <h2>{rejected.length}</h2>
              <p>Total Rejected Candidates</p>
            </div>
          </div>

          {/* Empty State */}
          {rejected.length === 0 ? (
            <div className="card border-0 shadow p-5 text-center">
              <h3>🎉 No Rejected Candidates</h3>
              <p className="text-muted">
                All applications are active.
              </p>
            </div>
          ) : (
            rejected.map((app, index) => {
              const user = users.find(
                (u) => u.email === app.userEmail
              );

              return (
                <div
                  key={index}
                  className="card shadow-lg border-0 mb-4 rejected-card"
                >
                  <div className="card-body p-4">

                    <div className="row align-items-center">

                      {/* Profile */}
                      <div className="col-lg-2 text-center mb-3 mb-lg-0">

                        <img
                          src={
                            user?.photo ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt="profile"
                          className="candidate-img"
                        />

                      </div>

                      {/* Details */}
                      <div className="col-lg-7">

                        <h3 className="fw-bold">
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
                          📅 {app.appliedDate}
                        </p>

                        <div>
                          {user?.skills ? (
                            user.skills
                              .split(",")
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="badge bg-secondary me-2 mb-2"
                                >
                                  {skill.trim()}
                                </span>
                              ))
                          ) : (
                            <span>No Skills</span>
                          )}
                        </div>

                      </div>

                      {/* Actions */}
                      <div className="col-lg-3 text-center">

                        <span className="badge bg-danger fs-6 px-4 py-2 mb-3">
                          Rejected
                        </span>

                        <div className="d-grid gap-2">

                          <button
                            className="btn btn-outline-primary"
                            data-bs-toggle="modal"
                            data-bs-target={`#profile${index}`}
                          >
                            View Profile
                          </button>

                          {user?.resume && (
                            <a
                              href={user.resume}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-danger"
                            >
                              View Resume
                            </a>
                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                  {/* Modal */}
                  <div
                    className="modal fade"
                    id={`profile${index}`}
                    tabIndex="-1"
                  >
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content">

                        <div className="modal-header bg-danger text-white">
                          <h5 className="modal-title">
                            Candidate Profile
                          </h5>

                          <button
                            type="button"
                            className="btn-close btn-close-white"
                            data-bs-dismiss="modal"
                          ></button>
                        </div>

                        <div className="modal-body p-4">

                          <div className="text-center mb-4">

                            <img
                              src={
                                user?.photo ||
                                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                              }
                              alt=""
                              width="140"
                              height="140"
                              className="rounded-circle border border-4 border-danger"
                            />

                            <h3 className="mt-3">
                              {user?.name}
                            </h3>

                          </div>

                          <div className="row">

                            <div className="col-md-6">
                              <p>
                                <b>Email:</b>{" "}
                                {user?.email}
                              </p>

                              <p>
                                <b>Phone:</b>{" "}
                                {user?.phone}
                              </p>

                              <p>
                                <b>State:</b>{" "}
                                {user?.state}
                              </p>
                            </div>

                            <div className="col-md-6">
                              <p>
                                <b>10th:</b>{" "}
                                {user?.tenth || "N/A"}%
                              </p>

                              <p>
                                <b>Intermediate:</b>{" "}
                                {user?.intermediate || "N/A"}%
                              </p>

                              <p>
                                <b>Degree:</b>{" "}
                                {user?.degree || "N/A"}%
                              </p>
                            </div>

                          </div>

                          <hr />

                          <h5>Skills</h5>

                          <p>
                            {user?.skills ||
                              "No Skills Added"}
                          </p>

                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              );
            })
          )}

        </div>

      </div>
    </>
  );
}

export default RejectedCandidates;