import { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./ManageJobs.css";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);

  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    type: "",
    skills: "",
    description: "",
  });

  useEffect(() => {
    const savedJobs =
      JSON.parse(localStorage.getItem("adminJobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleChange = (e) => {
    setNewJob({
      ...newJob,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setNewJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      experience: "",
      type: "",
      skills: "",
      description: "",
    });
  };

  const addJob = (e) => {
    e.preventDefault();

    const job = {
      id: Date.now(),
      ...newJob,
      createdAt: new Date().toISOString(),
    };

    const updatedJobs = [...jobs, job];

    setJobs(updatedJobs);

    localStorage.setItem(
      "adminJobs",
      JSON.stringify(updatedJobs)
    );

    resetForm();

    toast.success("Job Added Successfully");
  };

  const editJob = (job) => {
    setNewJob(job);
    setEditId(job.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const updateJob = (e) => {
  e.preventDefault();

  const updatedJobs = jobs.map((job) =>
    job.id === editId
      ? {
          ...newJob,
          id: editId,
          createdAt: job.createdAt, // preserve original date
        }
      : job
  );

  setJobs(updatedJobs);

  localStorage.setItem(
    "adminJobs",
    JSON.stringify(updatedJobs)
  );

  setEditId(null);
  resetForm();

  toast.success("Job Updated Successfully");
};

  const deleteJob = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    const updatedJobs = jobs.filter(
      (job) => job.id !== id
    );

    setJobs(updatedJobs);

    localStorage.setItem(
      "adminJobs",
      JSON.stringify(updatedJobs)
    );
  };

  return (
    <>
      <AdminNavbar />

      <div className="manage-jobs-page">


        {/* Header */}
        <div className="row align-items-center mb-4">

  <div className="col-lg-8 col-md-12">
    <div className="manage-jobs-header">
      <h1>💼 Hiring Management</h1>
      <p>
        Create, update and manage job openings
        across your organization
      </p>
    </div>
  </div>

  <div className="col-lg-4 col-md-12 text-lg-end mt-3 mt-lg-0">

    <div className="d-inline-flex gap-2 flex-wrap">

      <div className="btn btn-primary">
        Total Jobs: {jobs.length}
      </div>

      <Link
        to="/admin"
        className="btn btn-dark"
      >
        ← Dashboard
      </Link>

    </div>

  </div>

</div>

        {/* Add / Update Form */}
        <div className="card shadow border-0 mb-5">
          <div className="card-body p-4">

            <h4 className="mb-4">
              {editId ? "Update Job" : "Add New Job"}
            </h4>

            <form
              onSubmit={
                editId ? updateJob : addJob
              }
            >
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                className="form-control mb-3"
                value={newJob.title}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                className="form-control mb-3"
                value={newJob.company}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                className="form-control mb-3"
                value={newJob.location}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="salary"
                placeholder="Salary"
                className="form-control mb-3"
                value={newJob.salary}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="experience"
                placeholder="Experience"
                className="form-control mb-3"
                value={newJob.experience}
                onChange={handleChange}
                required
              />

              <select
                name="type"
                className="form-control mb-3"
                value={newJob.type}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Job Type
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

              <input
                type="text"
                name="skills"
                placeholder="React, JavaScript, Bootstrap"
                className="form-control mb-3"
                value={newJob.skills}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                rows="4"
                placeholder="Job Description"
                className="form-control mb-3"
                value={newJob.description}
                onChange={handleChange}
                required
              />

              <div className="d-flex gap-2">

                <button
                  type="submit"
                  className={
                    editId
                      ? "btn btn-success"
                      : "btn btn-primary"
                  }
                >
                  {editId
                    ? "Update Job"
                    : "Add Job"}
                </button>

                {editId && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      resetForm();
                      setEditId(null);
                    }}
                  >
                    Cancel
                  </button>
                )}

              </div>
            </form>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="card shadow border-0">
          <div className="card-body">

            <h4 className="mb-3">
              Posted Jobs
            </h4>

            <div className="table-responsive">

              <table className="table table-bordered table-hover align-middle">

                <thead className="table-dark">
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Salary</th>
                    <th>Experience</th>
                    <th>Type</th>
                    <th>Skills</th>
                    <th className="text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {jobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center"
                      >
                        No Jobs Available
                      </td>
                    </tr>
                  ) : (
                    jobs.map((job) => (
                      <tr key={job.id}>

                        <td>{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{job.salary}</td>
                        <td>{job.experience}</td>

                        <td>
                          <span className="badge bg-success">
                            {job.type}
                          </span>
                        </td>

                        <td>
                          {job.skills
                            ?.split(",")
                            .map(
                              (
                                skill,
                                index
                              ) => (
                                <span
                                  key={index}
                                  className="badge bg-info text-dark me-1"
                                >
                                  {skill.trim()}
                                </span>
                              )
                            )}
                        </td>

                        <td>

                          <div className="d-flex gap-2 justify-content-center">

                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={() =>
                                editJob(job)
                              }
                            >
                              ✏️ Edit
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                deleteJob(
                                  job.id
                                )
                              }
                            >
                              🗑 Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default ManageJobs;