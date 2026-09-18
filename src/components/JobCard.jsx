import { Link } from "react-router-dom";

function JobCard({ job, saveJob }) {
  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
      <div className="card job-card shadow border-0 h-100">

        <div className="card-body d-flex flex-column">

          {/* Header */}
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2 gap-2">
            <h4 className="fw-bold">
              {job.title}
            </h4>

            <span className="badge bg-success">
              {job.type || "Full Time"}
            </span>
          </div>

          {/* Company */}
          <h5 className="text-primary">
            {job.company}
          </h5>

          {/* Details */}
          <p className="mb-1">
            📍 {job.location}
          </p>

          <p className="mb-1">
            💰 {job.salary}
          </p>

          <p className="mb-3">
            🧑‍💻 {job.experience}
          </p>

          {/* Description */}
          <p className="job-description text-muted">
  {job.description}
</p>
          {/* Skills */}
          <div className="skills-container mb-3">

            {job.skills ? (
              (Array.isArray(job.skills)
                ? job.skills
                : String(job.skills).split(",")
              ).map((skill, index) => (
                <span
                  key={index}
                  className="badge bg-info text-dark me-2 mb-2"
                >
                  {skill.trim()}
                </span>
              ))
            ) : (
              <span className="text-muted">
                No Skills
              </span>
            )}

          </div>

          {/* Buttons */}
          <div className="mt-auto d-flex flex-column flex-sm-row gap-2">

            <Link
              to={`/job/${job.id}`}
              className="btn btn-primary flex-grow-1"
            >
              View Details
            </Link>

            <button
              className="btn btn-outline-success flex-grow-1"
              onClick={() => saveJob(job)}
            >
              Save
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default JobCard;