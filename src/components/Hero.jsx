import "../styles/Hero.css";

function Hero({ searchText, setSearchText }) {
  return (
    <section className="hero-section">
      <div className="container text-center">

        <h1 className="hero-title">
          Find Your Dream Job Today
        </h1>

        <p className="hero-subtitle">
          10,000+ Jobs • Top Companies • Easy Apply
        </p>

       <div className="search-box">
  <div className="search-field">
    <i className="bi bi-search"></i>

    <input
      type="text"
      placeholder="Search jobs, skills, companies..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
  <button className="search-btn">
    Search
  </button>
</div>

        <div className="hero-stats">

          <div className="stat-card">
            <h3>10K+</h3>
            <p>Jobs</p>
          </div>

          <div className="stat-card">
            <h3>500+</h3>
            <p>Companies</p>
          </div>

          <div className="stat-card">
            <h3>50K+</h3>
            <p>Candidates</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;