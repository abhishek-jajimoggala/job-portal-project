import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

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

      <div
        className="container-fluid min-vh-100 py-4"
        style={{
          background:
            "linear-gradient(135deg,#f8fafc,#eef2ff,#fdf2f8)",
        }}
      >
        {/* Header */}
        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h1 className="fw-bold text-danger mb-1">
                ❌ Rejected Candidates
              </h1>

              <p className="text-muted">
                Manage rejected applicants
              </p>
            </div>

            <Link
              to="/admin"
              className="btn btn-dark rounded-pill px-4"
            >
              ← Dashboard
            </Link>
          </div>

          {/* Stats Card */}
          <div
            className="card border-0 shadow-lg mb-5"
            style={{
              borderRadius: "20px",
              background:
                "linear-gradient(135deg,#dc3545,#ff6b6b)",
              color: "#fff",
            }}
          >
            <div className="card-body text-center py-4">
              <h2 className="fw-bold">
                {rejected.length}
              </h2>

              <p className="mb-0">
                Total Rejected Candidates
              </p>
            </div>
          </div>

          {/* Empty State */}
          {rejected.length === 0 ? (
            <div className="card shadow border-0 p-5 text-center">
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
                  className="card border-0 shadow-lg mb-4"
                  style={{
                    borderRadius: "25px",
                    overflow: "hidden",
                  }}
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
                          alt="Profile"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border:
                              "5px solid #dc3545",
                          }}
                        />

                      </div>

                      {/* Details */}
                      <div className="col-lg-7">

                        <h3 className="fw-bold">
                          {app.userName}
                        </h3>

                        <p className="mb-1 text-muted">
                          📧 {app.userEmail}
                        </p>

                        <p className="mb-1">
                          📱 {user?.phone || "N/A"}
                        </p>

                        <p className="mb-1">
                          📍 {user?.state || "N/A"}
                        </p>

                        <p className="mb-1">
                          💼 <b>{app.title}</b>
                        </p>

                        <p className="text-muted">
                          📅 {app.appliedDate}
                        </p>

                        <div className="mt-2">

                          {user?.skills ? (
                            user.skills
                              .split(",")
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="badge rounded-pill bg-secondary me-2 mb-2 px-3 py-2"
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

                        <span
                          className="badge fs-6 px-4 py-3 mb-3"
                          style={{
                            background:
                              "linear-gradient(135deg,#dc3545,#ff6b6b)",
                          }}
                        >
                          Rejected
                        </span>

                        <div className="d-grid gap-2">

                          <button
                            className="btn btn-outline-primary rounded-pill"
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
                              className="btn btn-danger rounded-pill"
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
                      <div className="modal-content border-0 shadow-lg">

                        <div
                          className="modal-header text-white"
                          style={{
                            background:
                              "linear-gradient(135deg,#dc3545,#ff6b6b)",
                          }}
                        >
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
                              width="150"
                              height="150"
                              className="rounded-circle border border-4 border-danger"
                            />

                            <h3 className="mt-3 fw-bold">
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
                                {user?.intermediate ||
                                  "N/A"}
                                %
                              </p>

                              <p>
                                <b>Degree:</b>{" "}
                                {user?.degree || "N/A"}%
                              </p>
                            </div>

                          </div>

                          <hr />

                          <h5 className="fw-bold">
                            Skills
                          </h5>

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