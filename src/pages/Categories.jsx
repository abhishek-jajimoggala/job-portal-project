function Categories() {
  const categories = [
    {
      id: 1,
      name: "Software Developer",
      jobs: "2500+ Jobs",
      icon: "💻"
    },
    {
      id: 2,
      name: "Python Developer",
      jobs: "1800+ Jobs",
      icon: "🐍"
    },
    {
      id: 3,
      name: "React Developer",
      jobs: "1500+ Jobs",
      icon: "⚛️"
    },
    {
      id: 4,
      name: "Java Developer",
      jobs: "2200+ Jobs",
      icon: "☕"
    },
    {
      id: 5,
      name: "Data Analyst",
      jobs: "1200+ Jobs",
      icon: "📊"
    },
    {
      id: 6,
      name: "Full Stack Developer",
      jobs: "1700+ Jobs",
      icon: "🚀"
    },
    {
      id: 7,
      name: "UI/UX Designer",
      jobs: "900+ Jobs",
      icon: "🎨"
    },
    {
      id: 8,
      name: "DevOps Engineer",
      jobs: "1100+ Jobs",
      icon: "⚙️"
    }
  ];

  return (
    <div className="container my-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">
          Browse Job Categories
        </h1>

        <p className="text-muted">
          Explore opportunities across various domains
        </p>
      </div>

      <div className="row">

        {categories.map((category) => (
          <div
            key={category.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <div className="card category-card shadow-sm border-0 h-100">

              <div className="card-body text-center">

                <div
                  className="mb-3"
                  style={{ fontSize: "50px" }}
                >
                  {category.icon}
                </div>

                <h5 className="fw-bold">
                  {category.name}
                </h5>

                <p className="text-muted">
                  {category.jobs}
                </p>

                <button className="btn btn-primary w-100">
                  Explore Jobs
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Categories;