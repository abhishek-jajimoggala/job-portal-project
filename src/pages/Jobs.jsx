import { useLocation } from "react-router-dom";
import { useState } from "react";
import jobsData from "../data/jobs";
import JobCard from "../components/JobCard";

function Jobs() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const keyword =
    params.get("keyword")?.toLowerCase() || "";

  const city =
    params.get("location")?.toLowerCase() || "";

  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const allJobs = [...jobsData, ...adminJobs];

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] =
    useState("");
  const [typeFilter, setTypeFilter] =
    useState("");

  const saveJob = (job) => {
  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    alert("Please Login First");
    return;
  }

  const key = `savedJobs_${loggedUser.email}`;

  const savedJobs =
    JSON.parse(localStorage.getItem(key)) || [];

  const exists = savedJobs.find(
    (item) => String(item.id) === String(job.id)
  );

  if (exists) {
    alert("Job Already Saved");
    return;
  }

  savedJobs.push(job);

  localStorage.setItem(
    key,
    JSON.stringify(savedJobs)
  );

  alert("Job Saved Successfully");
};

  const filteredJobs = allJobs.filter((job) => {
    const searchText = search.toLowerCase();

    const skillMatch = job.skills
      ? Array.isArray(job.skills)
        ? job.skills.some((skill) =>
            skill.toLowerCase().includes(searchText)
          )
        : String(job.skills)
            .toLowerCase()
            .includes(searchText)
      : false;

    const keywordSkillMatch = job.skills
      ? Array.isArray(job.skills)
        ? job.skills.some((skill) =>
            skill.toLowerCase().includes(keyword)
          )
        : String(job.skills)
            .toLowerCase()
            .includes(keyword)
      : false;

    return (
      (!keyword ||
        job.title?.toLowerCase().includes(keyword) ||
        job.company?.toLowerCase().includes(keyword) ||
        job.description
          ?.toLowerCase()
          .includes(keyword) ||
        keywordSkillMatch) &&
      (!city ||
        job.location
          ?.toLowerCase()
          .includes(city)) &&
      (search === "" ||
        job.title
          ?.toLowerCase()
          .includes(searchText) ||
        job.company
          ?.toLowerCase()
          .includes(searchText) ||
        job.description
          ?.toLowerCase()
          .includes(searchText) ||
        skillMatch) &&
      (locationFilter === "" ||
        job.location === locationFilter) &&
      (typeFilter === "" ||
        job.type === typeFilter)
    );
  });

  return (
    <div className="container my-5">
      <div className="row">

        {/* Filters */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow border-0 p-3 sticky-top">

            <h4 className="fw-bold mb-3">
              Filters
            </h4>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Job / Company / Skill"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              className="form-select mb-3"
              value={locationFilter}
              onChange={(e) =>
                setLocationFilter(e.target.value)
              }
            >
              <option value="">
                All Locations
              </option>
              <option value="Hyderabad">
                Hyderabad
              </option>
              <option value="Bangalore">
                Bangalore
              </option>
              <option value="Noida">
                Noida
              </option>
              <option value="Chennai">
                Chennai
              </option>
              <option value="Remote">
                Remote
              </option>
            </select>

            <select
              className="form-select mb-3"
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
            >
              <option value="">
                All Types
              </option>
              <option value="Full Time">
                Full Time
              </option>
              <option value="Part Time">
                Part Time
              </option>
              <option value="Remote">
                Remote
              </option>
            </select>

            <button
              className="btn btn-secondary w-100"
              onClick={() => {
                setSearch("");
                setLocationFilter("");
                setTypeFilter("");
              }}
            >
              Reset Filters
            </button>

          </div>
        </div>

        {/* Job Listings */}
        <div className="col-lg-9">

          <h2 className="fw-bold mb-2">
            Available Jobs ({filteredJobs.length})
          </h2>

          <hr />

          {filteredJobs.length === 0 ? (
            <div className="alert alert-warning">
              No Jobs Found
            </div>
          ) : (
            <div className="row g-4">

              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  saveJob={saveJob}
                />
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Jobs;