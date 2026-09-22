import { useState, useEffect } from "react";

function Applications() {
  const [applications, setApplications] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  useEffect(() => {
    const loggedUser = JSON.parse(
      localStorage.getItem("loggedUser")
    );

    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const myApplications = allApplications.filter(
      (app) =>
        app.applicantEmail === loggedUser?.email
    );

    setApplications(myApplications);
  }, []);

  const withdrawApplication = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmDelete) return;

    const allApplications =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updated = allApplications.filter(
      (app) => app.id !== id
    );

    localStorage.setItem(
      "applications",
      JSON.stringify(updated)
    );

    setApplications(
      applications.filter((app) => app.id !== id)
    );
  };

  // Pagination Logic
  const indexOfLast =
    currentPage * applicationsPerPage;

  const indexOfFirst =
    indexOfLast - applicationsPerPage;

  const currentApplications =
    applications.slice(
      indexOfFirst,
      indexOfLast
    );

  const totalPages = Math.ceil(
    applications.length / applicationsPerPage
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">
        My Applications
      </h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Job Title</th>
            <th>Company</th>
            <th>Status</th>
            <th>Applied Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentApplications.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="text-center"
              >
                No Applications Found
              </td>
            </tr>
          ) : (
            currentApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.title}</td>

                <td>{app.company}</td>

                <td>
                  <span
                    className={
                      app.status === "Shortlisted"
                        ? "badge bg-success"
                        : app.status === "Rejected"
                        ? "badge bg-danger"
                        : "badge bg-warning text-dark"
                    }
                  >
                    {app.status}
                  </span>
                </td>

                <td>{app.appliedDate}</td>

                <td>
                  {app.status === "Applied" ? (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        withdrawApplication(app.id)
                      }
                    >
                      Withdraw
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      disabled
                    >
                      Cannot Withdraw
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">

            <li
              className={`page-item ${
                currentPage === 1
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                Previous
              </button>
            </li>

            {[...Array(totalPages)].map(
              (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1
                      ? "active"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}

            <li
              className={`page-item ${
                currentPage === totalPages
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next
              </button>
            </li>

          </ul>
        </nav>
      )}
    </div>
  );
}

export default Applications;