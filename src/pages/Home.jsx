import { useState } from "react";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import { getJobs } from "../services/jobService";
import "./Home.css";

function Home() {
  const [searchText, setSearchText] = useState("");

  const jobs = getJobs();

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

  const filteredJobs = jobs.filter((job) => {
    const search = searchText.toLowerCase();

    const skillMatch = job.skills
      ? Array.isArray(job.skills)
        ? job.skills.some((skill) =>
            skill.toLowerCase().includes(search)
          )
        : String(job.skills)
            .toLowerCase()
            .includes(search)
      : false;

    return (
      job.title?.toLowerCase().includes(search) ||
      job.company?.toLowerCase().includes(search) ||
      job.location?.toLowerCase().includes(search) ||
      job.description?.toLowerCase().includes(search) ||
      skillMatch
    );
  });

  const companies = [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "Capgemini",
    "HCL",
    "Tech Mahindra",
    "Amazon",
    "Google",
    "Microsoft",
    "IBM",
    "Oracle",
    "Deloitte",
    "Zoho",
  ];

  return (
    <div className="home-page">

      <Hero
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {/* Available Jobs */}
      <div className="container py-5">
        <h2 className="section-title">
          Available Jobs ({filteredJobs.length})
        </h2>

        <div className="row g-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                saveJob={saveJob}
              />
            ))
          ) : (
            <h4 className="text-center text-danger">
              No Jobs Found
            </h4>
          )}
        </div>
      </div>

      {/* Top Companies */}
      <div className="container py-5">
        <h2 className="section-title text-center mb-4">
          Top Companies Hiring
        </h2>

        <div className="company-slider">
          <div className="company-track">
            {[...companies, ...companies, ...companies].map(
              (company, index) => (
                <div
                  key={index}
                  className="company-item"
                >
                  🏢 {company}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="container py-5">
        <h2 className="section-title text-center">
          Candidate Reviews
        </h2>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card review-card shadow h-100 p-4">
              <h5>Rahul Kumar ⭐⭐⭐⭐⭐</h5>
              <p>Got placed in TCS within 15 days.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card review-card shadow h-100 p-4">
              <h5>Priya Sharma ⭐⭐⭐⭐⭐</h5>
              <p>Found React Developer role quickly.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card review-card shadow h-100 p-4">
              <h5>Arjun Reddy ⭐⭐⭐⭐</h5>
              <p>Got multiple interview opportunities.</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card review-card shadow h-100 p-4">
              <h5>Sneha Patel ⭐⭐⭐⭐⭐</h5>
              <p>Easy application process and genuine jobs.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Statistics */}
      <div className="container py-5">
        <div className="row text-center g-4">

          <div className="col-md-3">
            <div className="card shadow p-4 stat-card">
              <h2 className="text-primary">10K+</h2>
              <h6>Active Jobs</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4 stat-card">
              <h2 className="text-success">500+</h2>
              <h6>Companies</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4 stat-card">
              <h2 className="text-warning">50K+</h2>
              <h6>Candidates</h6>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow p-4 stat-card">
              <h2 className="text-danger">95%</h2>
              <h6>Success Rate</h6>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;