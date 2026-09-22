import { useLocation } from "react-router-dom";
import { useState } from "react";
import jobsData from "../data/jobs";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";

function Jobs() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const keyword =
    params.get("keyword")?.toLowerCase() || "";

  const city =
    params.get("location")?.toLowerCase() || "";

  const category =
    params.get("category")?.toLowerCase() || "";

  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const allJobs = [...jobsData, ...adminJobs];

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] =
    useState("");
  const [typeFilter, setTypeFilter] =
    useState("");

  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1);

  const jobsPerPage = 6;

  const saveJob = (job) => {
    const loggedUser =
      JSON.parse(localStorage.getItem("loggedUser"));

    if (!loggedUser) {
      toast.warning("Please Login First");
      return;
    }

    const key = `savedJobs_${loggedUser.email}`;

    const savedJobs =
      JSON.parse(localStorage.getItem(key)) || [];

    const exists = savedJobs.find(
      (item) => String(item.id) === String(job.id)
    );

    if (exists) {
      toast.info("Job Already Saved");
      return;
    }

    savedJobs.push(job);

    localStorage.setItem(
      key,
      JSON.stringify(savedJobs)
    );

    toast.success("Job Saved Successfully");
  };

  const filteredJobs = allJobs.filter((job) => {
    const searchText = search.toLowerCase();

    const title =
      job.title?.toLowerCase() || "";

    const company =
      job.company?.toLowerCase() || "";

    const description =
      job.description?.toLowerCase() || "";

    const jobLocation =
      job.location?.toLowerCase() || "";

    const skillMatch = job.skills
      ? (
          Array.isArray(job.skills)
            ? job.skills
            : String(job.skills).split(",")
        ).some((skill) =>
          skill.toLowerCase().includes(searchText)
        )
      : false;

    const categoryMatch =
      category === ""
        ? true
        : category === "internships"
        ? title.includes("intern")
        : title.includes(category);

    return (
      (search === "" ||
        title.includes(searchText) ||
        company.includes(searchText) ||
        description.includes(searchText) ||
        skillMatch) &&
      (keyword === "" ||
        company.includes(keyword)) &&
      (city === "" ||
        jobLocation.includes(city)) &&
      (locationFilter === "" ||
        jobLocation.includes(
          locationFilter.toLowerCase()
        )) &&
      (typeFilter === "" ||
        job.type === typeFilter) &&
      categoryMatch
    );
  });

  // Pagination Logic
  const indexOfLastJob =
    currentPage * jobsPerPage;

  const indexOfFirstJob =
    indexOfLastJob - jobsPerPage;

  const currentJobs =
    filteredJobs.slice(
      indexOfFirstJob,
      indexOfLastJob
    );

  const totalPages = Math.ceil(
    filteredJobs.length / jobsPerPage
  );

  return (
    <div className="container my-5">
      <div className="row">

        {/* Filters */}
        <div className="col-lg-3 mb-4">
          <div className="card shadow border-0 p-3">

            <h4 className="fw-bold mb-3">
              Filters
            </h4>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search Job / Company / Skill"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />

            <select
              className="form-select mb-3"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setCurrentPage(1);
              }}
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

              <option value="Chennai">
                Chennai
              </option>

              <option value="Noida">
                Noida
              </option>

              <option value="Vijayawada">
                Vijayawada
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>

            <select
              className="form-select mb-3"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
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
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </button>

          </div>
        </div>

        {/* Jobs */}
        <div className="col-lg-9">

          <h2 className="fw-bold mb-3">
            Available Jobs (
            {filteredJobs.length})
          </h2>

          {filteredJobs.length === 0 ? (
            <div className="alert alert-warning">
              No Jobs Found
            </div>
          ) : (
            <>
              <div className="row g-4">

                {currentJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    saveJob={saveJob}
                  />
                ))}

              </div>

              {/* Pagination */}
              <div className="d-flex justify-content-center align-items-center mt-5">

                <button
                  className="btn btn-outline-primary me-3"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      currentPage - 1
                    )
                  }
                >
                  Previous
                </button>

                <span className="fw-bold">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  className="btn btn-outline-primary ms-3"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      currentPage + 1
                    )
                  }
                >
                  Next
                </button>

              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Jobs;