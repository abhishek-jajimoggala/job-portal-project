import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("applications")) || [];

    setApplications(data);
  }, []);

  const updateStatus = (index, status) => {
    const updatedApplications = [...applications];

    updatedApplications[index].status = status;

    setApplications(updatedApplications);

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );
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
          📄 Job Applications
        </h2>

        <div className="row">
          {applications.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No Applications Found
              </div>
            </div>
          ) : (
            applications.map((app, index) => (
              <div
                className="col-lg-4 col-md-6 mb-4"
                key={app.id || index}
              >
                <div className="card shadow border-0 h-100">

                  <div className="card-body">

                    <h4 className="fw-bold">
                      {app.userName}
                    </h4>

                    <hr />

                    <p>
                      <strong>Email:</strong>
                      
                      {app.userEmail}
                    </p>

                    <p>
                      <strong>Phone:</strong>
                      
                      {app.userPhone || "N/A"}
                    </p>

                    <p>
                      <strong>Job Title:</strong>
                      
                      {app.title}
                    </p>

                    <p>
                      <strong>Company:</strong>
                      
                      {app.company}
                    </p>

                    <p>
                      <strong>Location:</strong>
                      
                      {app.location}
                    </p>

                    <p>
                      <strong>Applied Date:</strong>
                      
                      {app.appliedDate}
                    </p>

                    <p>
                      <strong>Status:</strong>{" "}
                      {app.status === "Shortlisted" ? (
                        <span className="badge bg-success">
                          Shortlisted
                        </span>
                      ) : app.status === "Rejected" ? (
                        <span className="badge bg-danger">
                          Rejected
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark">
                          Pending
                        </span>
                      )}
                    </p>

                    <div className="d-grid gap-2 mt-3">

                      {app.resume && (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-info"
                        >
                          📄 View Resume
                        </a>
                      )}

                      {(!app.status ||
                        app.status === "Pending") && (
                        <>
                          <button
                            className="btn btn-success"
                            onClick={() =>
                              updateStatus(
                                index,
                                "Shortlisted"
                              )
                            }
                          >
                            ✓ Accept
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              updateStatus(
                                index,
                                "Rejected"
                              )
                            }
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}

                      {app.status ===
                        "Shortlisted" && (
                        <div className="alert alert-success text-center mb-0">
                          Candidate Accepted
                        </div>
                      )}

                      {app.status ===
                        "Rejected" && (
                        <div className="alert alert-danger text-center mb-0">
                          Candidate Rejected
                        </div>
                      )}

                    </div>

                  </div>

                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AdminApplications;