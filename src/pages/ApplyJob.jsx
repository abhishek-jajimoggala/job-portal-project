import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jobs from "../data/jobs";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser"));

  if (!loggedUser) {
    alert("Please Login First");
    navigate("/login");
    return null;
  }

  if (
    !loggedUser.phone ||
    !loggedUser.skills ||
    !loggedUser.state ||
    !loggedUser.tenth ||
    !loggedUser.intermediate ||
    !loggedUser.degree
  ) {
    alert(
      "Please Complete Your Profile Before Applying"
    );

    navigate("/profile");
    return null;
  }

  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const allJobs = [...jobs, ...adminJobs];

  const job = allJobs.find(
    (item) => String(item.id) === String(id)
  );

  if (!job) {
    return (
      <div className="container my-5">
        <h3 className="text-center text-danger">
          Job Not Found
        </h3>
      </div>
    );
  }

  const applications =
    JSON.parse(
      localStorage.getItem("applications")
    ) || [];

  const alreadyApplied = applications.find(
    (app) =>
      app.userEmail === loggedUser.email &&
      String(app.jobId) === String(job.id)
  );

  if (alreadyApplied) {
    return (
      <div className="container my-5">
        <div className="card shadow p-4 text-center">

          <h2 className="text-success">
            ✓ Already Applied
          </h2>

          <p>
            You have already applied for this job.
          </p>

          <button
            className="btn btn-primary"
            onClick={() =>
              navigate("/my-applications")
            }
          >
            View My Applications
          </button>

        </div>
      </div>
    );
  }

  const [form] = useState({
    name: loggedUser.name || "",
    email: loggedUser.email || "",
    phone: loggedUser.phone || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const applications =
      JSON.parse(
        localStorage.getItem("applications")
      ) || [];

    const alreadyApplied =
      applications.find(
        (app) =>
          app.userEmail === loggedUser.email &&
          String(app.jobId) === String(job.id)
      );

    if (alreadyApplied) {
      alert("You already applied for this job");
      return;
    }

    const application = {
  id: Date.now(),

  jobId: String(job.id),

  userId: loggedUser.id,
  userName: loggedUser.name,
  userEmail: loggedUser.email,
  userPhone: loggedUser.phone,

  state: loggedUser.state || "",
  skills: loggedUser.skills || "",

  tenth: loggedUser.tenth || "",
  intermediate: loggedUser.intermediate || "",
  degree: loggedUser.degree || "",

  resume: loggedUser.resume || "",
  resumeName: loggedUser.resumeName || "",

  title: job.title,
  company: job.company,
  location: job.location,
  salary: job.salary,
  experience: job.experience,

  appliedDate: new Date().toLocaleDateString(),

  status: "Pending",
};

    applications.push(application);

    localStorage.setItem(
      "applications",
      JSON.stringify(applications)
    );

    alert(
      "Application Submitted Successfully"
    );

    navigate("/my-applications");
  };

  return (
    <div className="container my-5">

      <div className="card shadow border-0">

        <div className="card-body p-4">

          <h2 className="fw-bold mb-3">
            Apply for {job.title}
          </h2>

          <h5 className="text-primary">
            {job.company}
          </h5>

          <p className="text-muted">
            {job.location}
          </p>

          <hr />

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className="form-label">
                Full Name
              </label>

              <input
                type="text"
                className="form-control"
                value={form.name}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                value={form.email}
                readOnly
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="text"
                className="form-control"
                value={form.phone}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
            >
              Apply Now
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ApplyJob;