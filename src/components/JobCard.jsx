import { Link, useNavigate } from "react-router-dom";

function JobCard({ job, saveJob }) {
  const navigate = useNavigate();

  const handleApply = () => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser")
    );

    if (!loggedUser) {
      alert("Please Login First");
      navigate("/login");
      return;
    }

    // Get latest user data
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    const currentUser = users.find(
      (user) =>
        user.email?.toLowerCase() ===
        loggedUser.email?.toLowerCase()
    );

    // Profile completion check
    const isProfileComplete =
      currentUser &&
      currentUser.name?.trim() &&
      currentUser.email?.trim() &&
      currentUser.phone?.trim() &&
      currentUser.country?.trim() &&
      currentUser.state?.trim() &&
      currentUser.city?.trim() &&
      currentUser.skills?.trim() &&
      currentUser.resume;

    if (!isProfileComplete) {
      alert("Please Complete Your Profile First");
      navigate("/profile");
      return;
    }

    navigate(`/apply/${job.id}`);
  };

  const getDaysAgo = (date) => {
    if (!date) return "Today";

    const today = new Date();
    const posted = new Date(date);

    const diffTime = today - posted;

    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 Day Ago";

    return `${diffDays} Days Ago`;
  };

  return (
    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4">
      <div className="card job-card shadow border-0 h-100">

        <div className="card-body d-flex flex-column">

          <h5 className="text-primary mb-3">
            {job.company}
          </h5>

          <div className="d-flex justify-content-between align-items-start mb-2">
            <h4 className="fw-bold">
              {job.title}
            </h4>

            <span className="badge bg-success">
              {job.type || "Full Time"}
            </span>
          </div>

          <p className="mb-1">
            📍 {job.location}
          </p>

          <p className="mb-1">
            💰 {job.salary}
          </p>

          <p className="mb-1">
            🧑‍💻 {job.experience}
          </p>

          <p className="mb-3 text-secondary">
            🕒 {getDaysAgo(job.createdAt)}
          </p>

          <p className="text-muted">
            {job.description?.substring(0, 100)}...
          </p>

          <div className="skills-container mb-3">

            {job.skills ? (
              (
                Array.isArray(job.skills)
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

          <div className="mt-auto d-grid gap-2">

            <Link
              to={`/job/${job.id}`}
              className="btn btn-primary"
            >
              View Details
            </Link>

            <button
              className="btn btn-success"
              onClick={handleApply}
            >
              Apply Now
            </button>

            <button
              className="btn btn-outline-success"
              onClick={() => saveJob(job)}
            >
              Save Job
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default JobCard;