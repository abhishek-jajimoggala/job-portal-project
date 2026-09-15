import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Categories from "./pages/Categories";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import SavedJobs from "./pages/SavedJobs";
import Companies from "./pages/Companies";
import MyApplications from "./pages/MyApplications";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ManageJobs from "./pages/ManageJobs";
import AdminApplications from "./pages/AdminApplications";
import UserProfiles from "./pages/UserProfiles";
import ViewResumes from "./pages/ViewResumes";
import PostedJobs from "./pages/PostedJobs";
import ShortlistedCandidates from "./pages/ShortlistedCandidates";
import RejectedCandidates from "./pages/RejectedCandidates";

import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";


function App() {
  const location = useLocation();

  // Hide User Navbar & Footer on Admin Pages
  const hideUserLayout =
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideUserLayout && <Navbar />}

      <Routes>
        {/* User Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />
        <Route
          path="/my-applications"
          element={<MyApplications />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route
  path="/categories"
  element={<Categories />}
/>
        {/* User Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Job Pages */}
        <Route
          path="/job/:id"
          element={<JobDetails />}
        />
        <Route
          path="/apply/:id"
          element={<ApplyJob />}
        />

        {/* Admin Login */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        {/* Admin Pages */}
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/jobs"
          element={<ManageJobs />}
        />

        <Route
          path="/admin/applications"
          element={<AdminApplications />}
        />

        <Route
          path="/admin/users"
          element={<UserProfiles />}
        />

        <Route
          path="/admin/resumes"
          element={<ViewResumes />}
        />

        <Route
          path="/admin/posted-jobs"
          element={<PostedJobs />}
        />

        <Route
          path="/admin/shortlisted"
          element={<ShortlistedCandidates />}
        />

        <Route
          path="/admin/rejected"
          element={<RejectedCandidates />}
        />
      </Routes>

      {!hideUserLayout && <Footer />}
    </>
  );
}

export default App;