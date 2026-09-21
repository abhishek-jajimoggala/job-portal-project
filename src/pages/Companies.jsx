import { Link } from "react-router-dom";
import jobsData from "../data/jobs";

function Companies() {
  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const allJobs = [...jobsData, ...adminJobs];

  const companies = [];

  allJobs.forEach((job) => {
    const existingCompany = companies.find(
      (company) =>
        company.name?.toLowerCase() ===
        job.company?.toLowerCase()
    );

    if (existingCompany) {
      existingCompany.openings += 1;
    } else {
      companies.push({
        id: companies.length + 1,
        name: job.company,
        location: job.location,
        openings: 1,
      });
    }
  });

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-primary">
          Top Companies Hiring
        </h2>

        <p className="text-muted">
          Explore opportunities from leading companies.
        </p>
      </div>

      <div className="row g-4">
        {companies.map((company) => (
          <div
            key={company.id}
            className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12"
          >
            <div className="card company-card shadow border-0 h-100 text-center">
              <div className="card-body p-4">

                <div
                  className="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {company.name?.charAt(0)}
                </div>

                <h5 className="fw-bold">
                  {company.name}
                </h5>

                <p className="text-muted mb-2">
                  📍 {company.location}
                </p>

                <p className="mb-3">
                  <strong>{company.openings}</strong>{" "}
                  Open Positions
                </p>

                <Link
                  to={`/jobs?keyword=${encodeURIComponent(
                    company.name
                  )}`}
                  className="btn btn-primary w-100"
                >
                  View Jobs
                </Link>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Companies;