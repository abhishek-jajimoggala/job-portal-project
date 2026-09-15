import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

function ShortlistedCandidates() {
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

      <div className="container mt-3">
        <Link to="/admin" className="btn btn-dark">
          ← Dashboard
        </Link>
      </div>

      <div className="container my-5">

        <h2 className="fw-bold mb-4">
          🎯 Shortlisted Candidates ({shortlisted.length})
        </h2>

        {shortlisted.length === 0 ? (
          <div className="alert alert-success">
            No Shortlisted Candidates
          </div>
        ) : (
          shortlisted.map((app, index) => {

            const user = users.find(
              (u) => u.email === app.userEmail
            );

            return (
              <div
                key={index}
                className="card shadow-lg border-0 mb-4 rounded-4"
              >
                <div className="card-body p-4">

                  <div className="row align-items-center">

                    <div className="col-md-2 text-center">

                      <img
                        src={
                          user?.photo ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt=""
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          border: "4px solid #198754",
                        }}
                      />

                    </div>

                    <div className="col-md-7">

                      <h3 className="fw-bold mb-2">
                        {app.userName}
                      </h3>

                      <p className="text-muted mb-1">
                        📧 {app.userEmail}
                      </p>

                      <p className="mb-1">
                        📱 {user?.phone || "N/A"}
                      </p>

                      <p className="mb-1">
                        📍 {user?.state || "N/A"}
                      </p>

                      <p className="mb-2">
                        💼 <b>{app.title}</b>
                      </p>

                      <p>
                        📅 Applied:
                        {" "}
                        {app.appliedDate}
                      </p>

                      <div className="d-flex flex-wrap gap-2">
                        {user?.skills
                          ?.split(",")
                          .map((skill, i) => (
                            <span
                              key={i}
                              className="badge bg-primary"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                      </div>

                    </div>

                    <div className="col-md-3 text-end">

                      <span className="badge bg-success fs-6 px-4 py-2">
                        Shortlisted
                      </span>

                      <div className="mt-3 d-grid gap-2">

                        {user?.resume && (
                          <a
                            href={user.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="btn btn-success"
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
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                      <div className="modal-header">
                        <h5 className="modal-title">
                          Candidate Profile
                        </h5>

                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                        ></button>
                      </div>

                      <div className="modal-body">

                        <div className="text-center mb-4">
                          <img
                            src={user?.photo}
                            alt=""
                            width="150"
                            height="150"
                            className="rounded-circle"
                          />
                        </div>

                        <h3>{user?.name}</h3>
                        <p>📧 {user?.email}</p>
                        <p>📱 {user?.phone}</p>
                        <p>📍 {user?.state}</p>

                        <hr />

                        <h5>Education</h5>

                        <p>
                          10th: {user?.tenth}%
                        </p>

                        <p>
                          Intermediate:
                          {" "}
                          {user?.intermediate}%
                        </p>

                        <p>
                          Degree:
                          {" "}
                          {user?.degree}%
                        </p>

                        <hr />

                        <h5>Skills</h5>

                        <p>{user?.skills}</p>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

      </div>
    </>
  );
}

export default ShortlistedCandidates;