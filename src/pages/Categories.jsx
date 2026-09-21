import { Link } from "react-router-dom";
import jobsData from "../data/jobs";

function Categories() {
  const adminJobs =
    JSON.parse(localStorage.getItem("adminJobs")) || [];

  const allJobs = [...jobsData, ...adminJobs];

  const getCount = (keywords) => {
    const keywordArray = Array.isArray(keywords)
      ? keywords
      : [keywords];

    return allJobs.filter((job) => {
      const title = job.title?.toLowerCase() || "";

      return keywordArray.some((keyword) =>
        title.includes(keyword.toLowerCase())
      );
    }).length;
  };

  const categories = [
    {
      id: 1,
      name: "Software Developer",
      jobs: getCount("software"),
      icon: "💻",
    },
    {
      id: 2,
      name: "Python Developer",
      jobs: getCount("python"),
      icon: "🐍",
    },
    {
      id: 3,
      name: "React Developer",
      jobs: getCount("react"),
      icon: "⚛️",
    },
    {
      id: 4,
      name: "Java Developer",
      jobs: getCount("java"),
      icon: "☕",
    },
    {
      id: 5,
      name: "Data Analyst",
      jobs: getCount("data"),
      icon: "📊",
    },
    {
      id: 6,
      name: "Python Full Stack",
      jobs: getCount("full stack"),
      icon: "🚀",
    },
    {
      id: 7,
      name: "Backend Engineer",
      jobs: getCount("backend"),
      icon: "⚙️",
    },
    {
      id: 8,
      name: "Internships",
      jobs: getCount("intern"),
      icon: "🤖",
    },
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
            <div
              className="card shadow border-0 h-100 text-center"
              style={{
                borderRadius: "15px",
              }}
            >
              <div className="card-body">
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
                  {category.jobs} Jobs
                </p>

                <Link
                  to={
                    category.name === "Internships"
                      ? "/jobs?category=intern"
                      : `/jobs?category=${encodeURIComponent(
                          category.name
                        )}`
                  }
                  className="btn btn-primary w-100"
                >
                  Explore Jobs
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;