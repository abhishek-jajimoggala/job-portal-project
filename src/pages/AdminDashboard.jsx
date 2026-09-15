import { Link, Navigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {

  const isAdmin =
    localStorage.getItem("admin") === "true";

  if (!isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  const users =
    JSON.parse(localStorage.getItem("users")) || [];

  const jobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const applications =
    JSON.parse(localStorage.getItem("applications")) || [];

  const shortlisted = applications.filter(
    (app) => app.status === "Shortlisted"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const pending =
    applications.length -
    shortlisted -
    rejected;

  const barData = {
    labels: [
      "Users",
      "Jobs",
      "Applications",
      "Shortlisted",
      "Rejected",
    ],
    datasets: [
      {
        label: "Statistics",
        data: [
          users.length,
          jobs.length,
          applications.length,
          shortlisted,
          rejected,
        ],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#0dcaf0",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  const pieData = {
    labels: [
      "Shortlisted",
      "Rejected",
      "Pending",
    ],
    datasets: [
      {
        data: [
          shortlisted,
          rejected,
          pending,
        ],
        backgroundColor: [
          "#198754",
          "#dc3545",
          "#0d6efd",
        ],
      },
    ],
  };

  return (
    <>
      <AdminNavbar />

      <div className="container-fluid p-4">

        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">
            Admin Dashboard
          </h2>
        </div>

        {/* Statistics */}
        <div className="row g-4">

          <div className="col-md-3">
            <div className="card bg-primary text-white shadow border-0">
              <div className="card-body text-center">
                <h1>{users.length}</h1>
                <h5>Total Users</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white shadow border-0">
              <div className="card-body text-center">
                <h1>{jobs.length}</h1>
                <h5>Jobs Posted</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-info text-white shadow border-0">
              <div className="card-body text-center">
                <h1>{applications.length}</h1>
                <h5>Applications</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-warning shadow border-0">
              <div className="card-body text-center">
                <h1>{shortlisted}</h1>
                <h5>Shortlisted</h5>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card bg-success text-white shadow border-0">
              <div className="card-body text-center">
                <h1>{rejected}</h1>
                <h5>Rejected</h5>
              </div>
            </div>
          </div>
          

        </div>

        {/* Charts */}
        <div className="row mt-5">

          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-body">

                <h4 className="mb-4">
                  Portal Analytics
                </h4>

                <Bar data={barData} />

              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body">

                <h4 className="mb-4">
                  Application Status
                </h4>

                <Pie data={pieData} />

              </div>
            </div>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="card shadow border-0 mt-5">
          <div className="card-body">

            <h3 className="mb-4">
              Quick Actions
            </h3>

            <div className="row g-3">

              <div className="col-md-3">
                <Link
                  to="/admin/jobs"
                  className="btn btn-primary w-100"
                >
                  Manage Jobs
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/posted-jobs"
                  className="btn btn-secondary w-100"
                >
                  Posted Jobs
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/applications"
                  className="btn btn-info w-100"
                >
                  Applications
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/users"
                  className="btn btn-success w-100"
                >
                  Users
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/shortlisted"
                  className="btn btn-warning w-100"
                >
                  Shortlisted
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/rejected"
                  className="btn btn-danger w-100"
                >
                  Rejected
                </Link>
              </div>

              <div className="col-md-3">
                <Link
                  to="/admin/resumes"
                  className="btn btn-dark w-100"
                >
                  Resumes
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* Summary Table */}
        <div className="card shadow border-0 mt-5">
          <div className="card-body">

            <h3 className="mb-4">
              Dashboard Summary
            </h3>

            <table className="table table-bordered">

              <thead>
                <tr>
                  <th>Category</th>
                  <th>Count</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>Total Users</td>
                  <td>{users.length}</td>
                </tr>

                <tr>
                  <td>Total Jobs</td>
                  <td>{jobs.length}</td>
                </tr>

                <tr>
                  <td>Total Applications</td>
                  <td>{applications.length}</td>
                </tr>

                <tr>
                  <td>Shortlisted</td>
                  <td>{shortlisted}</td>
                </tr>

                <tr>
                  <td>Rejected</td>
                  <td>{rejected}</td>
                </tr>

                <tr>
                  <td>Pending</td>
                  <td>{pending}</td>
                </tr>

              </tbody>

            </table>

          </div>
        </div>

      </div>
    </>
  );
}

export default AdminDashboard;