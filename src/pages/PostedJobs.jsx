import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";

function PostedJobs() {
  const jobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  return (
    <>
      <AdminNavbar />

      <div className="container my-4">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-primary">
            Posted Jobs
          </h2>

          <Link
            to="/admin"
            className="btn btn-dark"
          >
            ← Dashboard
          </Link>
        </div>

        <div className="alert alert-info">
          Total Posted Jobs : <b>{jobs.length}</b>
        </div>

        {jobs.length === 0 ? (
          <div className="card shadow border-0">
            <div className="card-body text-center p-5">
              <h4 className="text-muted">
                No Jobs Posted Yet
              </h4>

              <Link
                to="/admin/jobs"
                className="btn btn-primary mt-3"
              >
                Add First Job
              </Link>
            </div>
          </div>
        ) : (
          <div className="row">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="col-lg-4 col-md-6 mb-4"
              >
                <div className="card shadow h-100 border-0">

                  <div className="card-body">

                    <div className="d-flex justify-content-between mb-2">
                      <h5 className="fw-bold">
                        {job.title}
                      </h5>

                      <span className="badge bg-success">
                        {job.type}
                      </span>
                    </div>

                    <h6 className="text-primary">
                      {job.company}
                    </h6>

                    <p className="mb-2">
                      📍 {job.location}
                    </p>

                    <p className="mb-2">
                      💰 {job.salary}
                    </p>

                    <p className="mb-2">
                      🧑‍💻 {job.experience}
                    </p>

                    <p>
                      <strong>Skills:</strong>
                    </p>

                    <div className="mb-3">
                      {job.skills &&
                        job.skills
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={index}
                              className="badge bg-info text-dark me-1 mb-1"
                            >
                              {skill.trim()}
                            </span>
                          ))}
                    </div>

                    <p className="text-muted">
                      {job.description}
                    </p>

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

export default PostedJobs;