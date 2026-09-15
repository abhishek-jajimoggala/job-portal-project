function Companies() {
  const companies = [
    {
      id: 1,
      name: "TCS",
      location: "Hyderabad",
      openings: 120
    },
    {
      id: 2,
      name: "Infosys",
      location: "Bangalore",
      openings: 95
    },
    {
      id: 3,
      name: "Wipro",
      location: "Chennai",
      openings: 80
    },
    {
      id: 4,
      name: "Accenture",
      location: "Pune",
      openings: 140
    },
    {
      id: 5,
      name: "IBM",
      location: "Mumbai",
      openings: 65
    },
    {
      id: 6,
      name: "Capgemini",
      location: "Hyderabad",
      openings: 75
    },
    {
      id: 7,
      name: "Cognizant",
      location: "Bangalore",
      openings: 90
    },
    {
      id: 8,
      name: "Tech Mahindra",
      location: "Noida",
      openings: 55
    }
  ];

  return (
    <div className="container my-5">

      <h2 className="fw-bold mb-4">
        Top Companies Hiring
      </h2>

      <div className="row">

        {companies.map((company) => (
          <div
            key={company.id}
            className="col-lg-3 col-md-4 col-sm-6 mb-4"
          >
            <div className="card shadow-sm border-0 h-100 text-center">

              <div className="card-body">

                <div
                  className="rounded-circle bg-primary text-white mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "80px",
                    height: "80px",
                    fontSize: "28px",
                    fontWeight: "bold"
                  }}
                >
                  {company.name.charAt(0)}
                </div>

                <h5>{company.name}</h5>

                <p className="text-muted">
                  📍 {company.location}
                </p>

                <p>
                  <strong>
                    {company.openings}
                  </strong>{" "}
                  Open Positions
                </p>

                <button className="btn btn-primary w-100">
                  View Jobs
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Companies;