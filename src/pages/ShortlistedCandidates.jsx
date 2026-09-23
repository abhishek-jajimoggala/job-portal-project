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

      <div
        className="container-fluid py-4"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg,#e8fff2,#f8fffc)",
        }}
      >
        <div className="container">

          {/* Back Button */}
          <Link
            to="/admin"
            className="btn btn-dark rounded-pill px-4 mb-4"
          >
            ← Dashboard
          </Link>

          {/* Header */}
          <div
            className="p-4 p-md-5 rounded-4 shadow-lg mb-5 text-white"
            style={{
              background:
                "linear-gradient(135deg,#198754,#20c997)",
            }}
          >
            <h1 className="fw-bold">
              🎯 Shortlisted Candidates
            </h1>

            <p className="mb-3">
              Successfully selected candidates
              for further hiring process.
            </p>

            <span className="badge bg-light text-success fs-6 px-4 py-2">
              Total Candidates : {shortlisted.length}
            </span>
          </div>

          {shortlisted.length === 0 ? (
            <div className="alert alert-success shadow">
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
                  className="card border-0 shadow-lg rounded-4 mb-4"
                >
                  <div className="card-body p-4">

                    <div className="row align-items-center">

                      {/* Profile Image */}
                      <div className="col-lg-2 text-center mb-3 mb-lg-0">

                        <img
                          src={
                            user?.photo ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt="profile"
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                            borderRadius: "50%",
                            border:
                              "5px solid #198754",
                          }}
                        />

                      </div>

                      {/* Candidate Info */}
                      <div className="col-lg-7">

                        <h3 className="fw-bold">
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

                        <p className="mb-1">
                          💼 <b>{app.title}</b>
                        </p>

                        <p>
                          📅 Applied :
                          {" "}
                          {app.appliedDate}
                        </p>

                        <div className="d-flex flex-wrap gap-2">

                          {user?.skills ? (
                            user.skills
                              .split(",")
                              .map((skill, i) => (
                                <span
                                  key={i}
                                  className="badge bg-success"
                                >
                                  {skill.trim()}
                                </span>
                              ))
                          ) : (
                            <span className="text-muted">
                              No Skills Available
                            </span>
                          )}

                        </div>

                      </div>

                      {/* Actions */}
                      <div className="col-lg-3 text-lg-end mt-3 mt-lg-0">

                        <span className="badge bg-success fs-6 px-4 py-2">
                          ✔ Shortlisted
                        </span>

                        <div className="d-grid gap-2 mt-3">

                          <button
                            className="btn btn-outline-success"
                            data-bs-toggle="modal"
                            data-bs-target={`#profile${index}`}
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

                  {/* Modal */}
                  <div
                    className="modal fade"
                    id={`profile${index}`}
                    tabIndex="-1"
                  >
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content border-0 shadow">

                        <div className="modal-header bg-success text-white">
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
                              className="rounded-circle border border-4 border-success"
                            />

                          </div>

                          <h3 className="fw-bold">
                            {user?.name}
                          </h3>

                          <p>📧 {user?.email}</p>

                          <p>📱 {user?.phone}</p>

                          <p>📍 {user?.state}</p>

                          <hr />

                          <h5 className="fw-bold">
                            🎓 Education
                          </h5>

                          <p>
                            10th :
                            {" "}
                            {user?.tenth || "N/A"}%
                          </p>

                          <p>
                            Intermediate :
                            {" "}
                            {user?.intermediate ||
                              "N/A"}
                            %
                          </p>

                          <p>
                            Degree :
                            {" "}
                            {user?.degree || "N/A"}%
                          </p>

                          <hr />

                          <h5 className="fw-bold">
                            🛠 Skills
                          </h5>

                          <p>
                            {user?.skills ||
                              "No Skills"}
                          </p>

                          {user?.resume && (
                            <a
                              href={user.resume}
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

export default ShortlistedCandidates;