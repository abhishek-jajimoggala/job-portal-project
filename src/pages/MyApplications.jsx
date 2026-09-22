import { useState } from "react";

function MyApplications() {
  const loggedUser =
    JSON.parse(localStorage.getItem("loggedUser"));

  const applications =
    JSON.parse(
      localStorage.getItem("applications")
    ) || [];

  const myApplications =
    applications.filter(
      (app) =>
        app.userEmail === loggedUser?.email
    );

  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1);

  const applicationsPerPage = 6;

  const indexOfLastApplication =
    currentPage * applicationsPerPage;

  const indexOfFirstApplication =
    indexOfLastApplication -
    applicationsPerPage;

  const currentApplications =
    myApplications.slice(
      indexOfFirstApplication,
      indexOfLastApplication
    );

  const totalPages = Math.ceil(
    myApplications.length /
      applicationsPerPage
  );

  return (
    <div className="container my-5">

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-2">

        <h2 className="fw-bold">
          📄 My Applications
        </h2>

        <span className="badge bg-primary fs-6 px-3 py-2">
          Total: {myApplications.length}
        </span>

      </div>

      {myApplications.length === 0 ? (

        <div className="card shadow border-0">
          <div className="card-body text-center p-5">

            <h4 className="text-muted">
              No Applications Found
            </h4>

            <p>
              You haven't applied for any jobs
              yet.
            </p>

          </div>
        </div>

      ) : (

        <>
          <div className="row">

            {currentApplications.map(
              (app, index) => (
                <div
                  key={app.id || index}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12 mb-4"
                >
                  <div className="card shadow-lg border-0 h-100">

                    <div className="card-body">

                      <h5 className="fw-bold">
                        {app.title}
                      </h5>

                      <h6 className="text-primary">
                        {app.company}
                      </h6>

                      <hr />

                      <p>
                        📍{" "}
                        <strong>
                          Location:
                        </strong>{" "}
                        {app.location}
                      </p>

                      <p>
                        💰{" "}
                        <strong>
                          Salary:
                        </strong>{" "}
                        {app.salary ||
                          "Not Mentioned"}
                      </p>

                      <p>
                        🧑‍💻{" "}
                        <strong>
                          Experience:
                        </strong>{" "}
                        {app.experience ||
                          "Fresher"}
                      </p>

                      <p>
                        📅{" "}
                        <strong>
                          Applied:
                        </strong>{" "}
                        {app.appliedDate}
                      </p>

                      <div className="mb-3">
                        <strong>
                          Status:
                        </strong>{" "}
                        <span
                          className={
                            app.status ===
                            "Shortlisted"
                              ? "badge bg-success"
                              : app.status ===
                                "Rejected"
                              ? "badge bg-danger"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {app.status}
                        </span>
                      </div>

                      {app.resume && (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-success btn-sm w-100"
                        >
                          📄 View Resume
                        </a>
                      )}

                    </div>

                  </div>
                </div>
              )
            )}

          </div>

          {/* Pagination */}

          {totalPages > 1 && (
            <nav className="mt-4">

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
                      setCurrentPage(
                        currentPage - 1
                      )
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
                        currentPage ===
                        index + 1
                          ? "active"
                          : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() =>
                          setCurrentPage(
                            index + 1
                          )
                        }
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage ===
                    totalPages
                      ? "disabled"
                      : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() =>
                      setCurrentPage(
                        currentPage + 1
                      )
                    }
                  >
                    Next
                  </button>
                </li>

              </ul>

            </nav>
          )}

        </>
      )}

    </div>
  );
}

export default MyApplications;