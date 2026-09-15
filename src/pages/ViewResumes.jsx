import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

function ViewResumes() {
  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const resumeUsers = users.filter(
    (user) => user.resume
  );

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
          User Resumes ({resumeUsers.length})
        </h2>

        {resumeUsers.length === 0 ? (
          <div className="alert alert-warning">
            No Resumes Found
          </div>
        ) : (
          <div className="row">

            {resumeUsers.map((user, index) => (
              <div
                className="col-lg-6 mb-4"
                key={index}
              >
                <div className="card shadow border-0 h-100">

                  <div className="card-body">

                    <div className="d-flex align-items-center">

                      <img
                        src={
                          user.photo ||
                          "https://via.placeholder.com/80"
                        }
                        alt="Profile"
                        className="rounded-circle me-3"
                        width="80"
                        height="80"
                      />

                      <div>

                        <h4 className="fw-bold mb-1">
                          {user.name}
                        </h4>

                        <p className="text-muted mb-1">
                          {user.email}
                        </p>

                        <p className="mb-0">
                          📱 {user.phone || "N/A"}
                        </p>

                      </div>

                    </div>

                    <hr />

                    <div className="row mb-3">

                      <div className="col-6">
                        <strong>State</strong>
                        <p>{user.state || "N/A"}</p>
                      </div>

                      <div className="col-6">
                        <strong>Degree %</strong>
                        <p>{user.degree || "N/A"}</p>
                      </div>

                    </div>

                    <div className="mb-3">

                      <strong>Skills</strong>

                      <div className="mt-2">

                        {user.skills
                          ? user.skills
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

                    <div className="d-flex gap-2">

                      <a
                        href={user.resume}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-success"
                      >
                        View Resume
                      </a>

                      <Link
                        to="/admin/users"
                        className="btn btn-info text-white"
                      >
                        View Profile
                      </Link>

                    </div>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </>
  );
}

export default ViewResumes;