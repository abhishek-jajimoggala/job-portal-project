import { useState } from "react";
import { Link } from "react-router-dom";
function ResumeUpload() {
   <div className="container mt-3">
  <Link
    to="/admin"
    className="btn btn-dark"
  >
    ← Dashboard
  </Link>
</div>
  const [resume, setResume] = useState("");

  const saveResume = () => {
    const resumes =
      JSON.parse(localStorage.getItem("resumes")) || [];

    resumes.push({
      id: Date.now(),
      fileName: resume
    });

    localStorage.setItem(
      "resumes",
      JSON.stringify(resumes)
    );

    alert("Resume Uploaded");
  };

  return (
    <div className="container my-5">

      <h2>Upload Resume</h2>

      <input
        type="text"
        className="form-control"
        placeholder="Resume File Name"
        onChange={(e) =>
          setResume(e.target.value)
        }
      />

      <button
        className="btn btn-primary mt-3"
        onClick={saveResume}
      >
        Upload
      </button>

    </div>
  );
}

export default ResumeUpload;