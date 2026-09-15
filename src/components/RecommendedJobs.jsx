import jobsData from "../data/jobs";
import JobCard from "./JobCard";

function RecommendedJobs() {

  const postedJobs =
    JSON.parse(localStorage.getItem("postedJobs")) || [];

  const allJobs = [...jobsData, ...postedJobs];

  const recommendedJobs = allJobs.slice(0, 6);

  return (
    <div className="container my-5">
      <h2 className="fw-bold mb-4">
        Recommended Jobs
      </h2>

      <div className="row">
        {recommendedJobs.map((job) => (
          <div
            key={job.id}
            className="col-lg-4 col-md-6 mb-4"
          >
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendedJobs;