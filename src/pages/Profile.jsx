import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const emptyUser = {
    name: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    skills: "",
    tenth: "",
    intermediate: "",
    degree: "",
    college: "",
    branch: "",
    passoutYear: "",
    experience: "",
    linkedin: "",
    github: "",
    resume: "",
    resumeName: "",
  };

  const [user, setUser] = useState(emptyUser);

  const states = [
    "Andhra Pradesh",
    "Telangana",
    "Tamil Nadu",
    "Karnataka",
    "Kerala",
    "Maharashtra",
    "Delhi",
  ];

  const cities = {
    "Andhra Pradesh": [
      "Vijayawada",
      "Guntur",
      "Visakhapatnam",
      "Tirupati",
    ],
    Telangana: ["Hyderabad", "Warangal", "Karimnagar"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    Karnataka: ["Bangalore", "Mysore", "Hubli"],
    Kerala: ["Kochi", "Trivandrum", "Kozhikode"],
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
  };

  // Load the currently logged-in user's profile
  useEffect(() => {
    try {
      const loggedUser =
        JSON.parse(localStorage.getItem("loggedUser")) || {};

      setUser({
        ...emptyUser,
        ...loggedUser,
      });
    } catch (error) {
      console.error("Unable to load profile:", error);
      setUser(emptyUser);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
      // Clear city when state changes
      ...(name === "state" ? { city: "" } : {}),
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF, DOC, or DOCX files.");
      e.target.value = "";
      return;
    }

    // localStorage has limited storage. Large resumes can exceed it.
    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      alert("Resume size should be less than 2 MB.");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setUser((prev) => ({
        ...prev,
        resume: reader.result,
        resumeName: file.name,
      }));
    };

    reader.onerror = () => {
      alert("Unable to read the resume file.");
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (!user.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!user.email.trim()) {
      alert("Please enter your email.");
      return;
    }

    // Save currently logged-in user
    localStorage.setItem("loggedUser", JSON.stringify(user));

    // Update the same user in users array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUserIndex = users.findIndex(
      (item) =>
        item.email?.toLowerCase() === user.email.trim().toLowerCase()
    );

    if (existingUserIndex !== -1) {
      users[existingUserIndex] = {
        ...users[existingUserIndex],
        ...user,
      };
    } else {
      users.push(user);
    }

    localStorage.setItem("users", JSON.stringify(users));

    alert("Profile Updated Successfully");
    setIsEdit(false);
  };

  const cancelEdit = () => {
    try {
      const loggedUser =
        JSON.parse(localStorage.getItem("loggedUser")) || {};

      setUser({
        ...emptyUser,
        ...loggedUser,
      });
    } catch (error) {
      setUser(emptyUser);
    }

    setIsEdit(false);
  };

  const hasLink = (value) => {
    return value && value.trim() !== "";
  };

  return (
    <div className="container py-4 py-md-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-3 p-md-5">
          <div className="text-center mb-4">
            <h2 className="text-primary fw-bold mb-2">
              👤 My Profile
            </h2>
            <p className="text-muted mb-0">
              Manage your personal, education and professional details
            </p>
          </div>
          <button
  className="btn btn-secondary mb-3 w-100 w-md-auto"
  onClick={() => navigate("/")}
>
  ← Back To Home
</button>

          {isEdit ? (
            <>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    className="form-control"
                    value={user.country}
                    onChange={handleChange}
                    placeholder="India"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    State
                  </label>
                  <select
                    name="state"
                    className="form-select"
                    value={user.state}
                    onChange={handleChange}
                  >
                    <option value="">Select State</option>

                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    City
                  </label>
                  <select
                    name="city"
                    className="form-select"
                    value={user.city}
                    onChange={handleChange}
                    disabled={!user.state}
                  >
                    <option value="">Select City</option>

                    {(cities[user.state] || []).map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    College
                  </label>
                  <input
                    type="text"
                    name="college"
                    className="form-control"
                    value={user.college}
                    onChange={handleChange}
                    placeholder="Enter college name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Branch
                  </label>
                  <input
                    type="text"
                    name="branch"
                    className="form-control"
                    value={user.branch}
                    onChange={handleChange}
                    placeholder="Example: CSE"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Passout Year
                  </label>
                  <input
                    type="number"
                    name="passoutYear"
                    className="form-control"
                    value={user.passoutYear}
                    onChange={handleChange}
                    placeholder="Example: 2026"
                    min="1950"
                    max="2100"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Experience
                  </label>
                  <input
                    type="text"
                    name="experience"
                    className="form-control"
                    value={user.experience}
                    onChange={handleChange}
                    placeholder="Example: Fresher / 1 Year"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    10th %
                  </label>
                  <input
                    type="text"
                    name="tenth"
                    className="form-control"
                    value={user.tenth}
                    onChange={handleChange}
                    placeholder="Example: 98%"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Intermediate %
                  </label>
                  <input
                    type="text"
                    name="intermediate"
                    className="form-control"
                    value={user.intermediate}
                    onChange={handleChange}
                    placeholder="Example: 71%"
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label fw-semibold">
                    Degree / CGPA
                  </label>
                  <input
                    type="text"
                    name="degree"
                    className="form-control"
                    value={user.degree}
                    onChange={handleChange}
                    placeholder="Example: 7.9 CGPA"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    className="form-control"
                    value={user.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    GitHub
                  </label>
                  <input
                    type="url"
                    name="github"
                    className="form-control"
                    value={user.github}
                    onChange={handleChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold">
                    Skills
                  </label>
                  <textarea
                    rows="3"
                    name="skills"
                    className="form-control"
                    value={user.skills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, Python, SQL"
                  />
                  <small className="text-muted">
                    Separate skills with commas.
                  </small>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fw-semibold">
                    Upload Resume
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeChange}
                  />

                  <small className="text-muted">
                    PDF, DOC or DOCX. Maximum 2 MB.
                  </small>

                  {user.resumeName && (
                    <div className="mt-2">
                      <span className="badge bg-success">
                        📄 {user.resumeName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex flex-wrap gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={saveProfile}
                >
                  💾 Save Profile
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Name:</strong>
                    <div className="mt-1 text-muted">
                      {user.name || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Email:</strong>
                    <div className="mt-1 text-muted">
                      {user.email || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Phone:</strong>
                    <div className="mt-1 text-muted">
                      {user.phone || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Country:</strong>
                    <div className="mt-1 text-muted">
                      {user.country || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>State:</strong>
                    <div className="mt-1 text-muted">
                      {user.state || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>City:</strong>
                    <div className="mt-1 text-muted">
                      {user.city || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>College:</strong>
                    <div className="mt-1 text-muted">
                      {user.college || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Branch:</strong>
                    <div className="mt-1 text-muted">
                      {user.branch || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Passout Year:</strong>
                    <div className="mt-1 text-muted">
                      {user.passoutYear || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Experience:</strong>
                    <div className="mt-1 text-muted">
                      {user.experience || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>10th %:</strong>
                    <div className="mt-1 text-muted">
                      {user.tenth || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Intermediate %:</strong>
                    <div className="mt-1 text-muted">
                      {user.intermediate || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>Degree / CGPA:</strong>
                    <div className="mt-1 text-muted">
                      {user.degree || "Not provided"}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="border rounded-3 p-3">
                    <strong>Skills:</strong>

                    <div className="mt-2">
                      {user.skills ? (
                        user.skills
                          .split(",")
                          .map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="badge bg-primary me-2 mb-2"
                            >
                              {skill.trim()}
                            </span>
                          ))
                      ) : (
                        <span className="text-muted">
                          No skills added
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>LinkedIn:</strong>

                    <div className="mt-2">
                      {hasLink(user.linkedin) ? (
                        <a
                          href={user.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          View LinkedIn
                        </a>
                      ) : (
                        <span className="text-muted">
                          Not provided
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="border rounded-3 p-3 h-100">
                    <strong>GitHub:</strong>

                    <div className="mt-2">
                      {hasLink(user.github) ? (
                        <a
                          href={user.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-dark btn-sm"
                        >
                          View GitHub
                        </a>
                      ) : (
                        <span className="text-muted">
                          Not provided
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="border rounded-3 p-3">
                    <strong>Resume:</strong>

                    {user.resume ? (
                      <div className="mt-2 d-flex flex-wrap align-items-center gap-2">
                        <span className="text-muted">
                          📄 {user.resumeName || "Resume"}
                        </span>

                        <a
                          href={user.resume}
                          download={user.resumeName || "resume"}
                          className="btn btn-success btn-sm"
                        >
                          Download Resume
                        </a>
                      </div>
                    ) : (
                      <p className="text-muted mt-2 mb-0">
                        No Resume Uploaded
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                    type="button"
                    className="btn btn-primary w-100 w-md-auto"
                    onClick={() => setIsEdit(true)}
                >
                ✏️ Edit Profile
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 

