import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5">

      <div className="container py-5">

        <div className="row">

          {/* Logo & About */}
          <div className="col-md-4 mb-4">

            <h3 className="fw-bold text-primary">
              JobPortal
            </h3>

            <p>
              Find your dream job from thousands
              of opportunities across India.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">

            <h5>Quick Links</h5>

            <ul className="list-unstyled">

              <li>
                <Link
                  to="/"
                  className="text-white text-decoration-none"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/jobs"
                  className="text-white text-decoration-none"
                >
                  Jobs
                </Link>
              </li>

              <li>
                <Link
                  to="/companies"
                  className="text-white text-decoration-none"
                >
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  to="/my-applications"
                  className="text-white text-decoration-none"
                >
                  Applications
                </Link>
              </li>

            </ul>

          </div>

          {/* Categories */}
          <div className="col-md-3 mb-4">

            <h5>Categories</h5>

            <ul className="list-unstyled">

              <li>React Developer</li>
              <li>Python Developer</li>
              <li>Java Developer</li>
              <li>Data Analyst</li>
              <li>Full Stack Developer</li>

            </ul>

          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">

            <h5>Contact Us</h5>

            <p>📧 support@jobportal.com</p>

            <p>📞 +91 9876543210</p>

            <p>📍 Hyderabad, India</p>

          </div>

        </div>

        <hr />

        <div className="text-center">

          <p className="mb-0">
            © 2026 JobPortal. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;