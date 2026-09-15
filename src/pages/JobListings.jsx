import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import jobs from "../data/jobs";
import JobCard from "../components/JobCard";

function JobListings() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(
    searchParams.get("query") || ""
  );

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = () => {
    navigate(`/jobs?query=${query}`);
  };

  return (
    <div className="container my-5">

      {/* Search Bar */}
      <div className="card shadow p-4 mb-4">
        <div className="row">

          <div className="col-md-10">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search jobs, companies..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

        </div>
      </div>

      {/* Results */}
      <h3 className="mb-4">
        Search Results ({filteredJobs.length})
      </h3>

      <div className="row">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div
              className="col-lg-4 col-md-6 mb-4"
              key={job.id}
            >
              <JobCard job={job} />
            </div>
          ))
        ) : (
          <h5 className="text-danger">
            No Jobs Found
          </h5>
        )}
      </div>

    </div>
  );
}

export default JobListings;