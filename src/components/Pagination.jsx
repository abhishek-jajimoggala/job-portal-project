function Pagination({
  currentPage,
  totalPages,
  setCurrentPage
}) {
  return (
    <div className="d-flex justify-content-center mt-4">

      <button
        className="btn btn-outline-primary me-2"
        disabled={currentPage === 1}
        onClick={() =>
          setCurrentPage(currentPage - 1)
        }
      >
        Previous
      </button>

      <span className="mt-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary ms-2"
        disabled={
          currentPage === totalPages
        }
        onClick={() =>
          setCurrentPage(currentPage + 1)
        }
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;