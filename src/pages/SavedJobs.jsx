import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
  if (!loggedUser) return;
  const key=`savedJobs_${loggedUser.email}`;
  const jobs =
    JSON.parse(
      localStorage.getItem(key))||[];
  setSavedJobs(jobs);

}, []);


  const removeJob = (id) => {
    const updatedJobs = savedJobs.filter(
      (job) => job.id !== id
    );

    setSavedJobs(updatedJobs);

    localStorage.setItem(
      `savedJobs_${loggedUser.email}`,
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">
        Saved Jobs
      </h2>

      <div className="row">
        {savedJobs.length === 0 ? (
          <h4 className="text-center text-muted">
            No Saved Jobs Found
          </h4>
        ) : (
          savedJobs.map((job) => (
            <div
              className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
              key={job.id}
            >
              <div className="card shadow h-100 border-0 saved-job-card">
                <div className="card-body">
                  <h5 className="fw-bold">
                    {job.title}
                  </h5>

                  <h6 className="text-primary">
                    {job.company}
                  </h6>

                  <p>📍 {job.location}</p>
                  <p>💰 {job.salary}</p>
                  <p>💼 {job.type}</p>

                  <div className="d-flex flex-column flex-sm-row gap-2">
                    <Link
                      to={`/job/${job.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Details
                    </Link>

                    <Link
                      to={`/apply/${job.id}`}
                      className="btn btn-success btn-sm"
                    >
                      Apply
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeJob(job.id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SavedJobs;