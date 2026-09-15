function Hero({
  searchText,
  setSearchText
}) {
  return (
    <section className="hero-section">
      <div className="container text-center">

        <h1 className="fw-bold text-white">
          Find Your Dream Job
        </h1>

        <p className="text-white">
          Search Thousands of Jobs
        </p>

        <div className="search-box bg-white p-4 shadow rounded">

          <div className="row g-2">

            <div className="col-md-10">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search Jobs, Company, Location..."
                value={searchText}
                onChange={(e) =>
                  setSearchText(e.target.value)
                }
              />
            </div>

            <div className="col-md-2">
              <button
                className="btn btn-primary btn-lg w-100"
              >
                Search
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;