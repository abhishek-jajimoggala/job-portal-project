function Hero({
  searchText,
  setSearchText
}) {
  return (
    <section className="hero-section py-5">
      <div className="container text-center">

        <h1 className="fw-bold text-white display-4">
          Find Your Dream Job
        </h1>

        <p className="text-white fs-5 mb-4">
          Search Thousands of Jobs
        </p>

        <div className="search-box bg-white p-3 p-md-4 shadow rounded">

          <div className="row g-2 justify-content-center">

            <div className="col-lg-8 col-md-8 col-sm-12">
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

            <div className="col-lg-2 col-md-3 col-sm-12">
              <button
                className="btn btn-primary btn-lg w-100"
              >
                Search Jobs
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;