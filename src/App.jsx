import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
//import "./styles/Register.css";
import "./styles/Global.css";
import "./styles/Navbar.css";
import "./styles/Hero.css";
//import "./styles/Dashboard.css";
import "./styles/Responsive.css";
import "./styles/Login.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Companies from "./pages/Companies";
import SavedJobs from "./pages/SavedJobs";
import Categories from "./pages/Categories";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Register from "./pages/Register";

import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfile from "./pages/AdminProfile";
import ManageJobs from "./pages/ManageJobs";
import AdminApplications from "./pages/AdminApplications";
import UserProfiles from "./pages/UserProfiles";
import PostedJobs from "./pages/PostedJobs";
import ShortlistedCandidates from "./pages/ShortlistedCandidates";
import RejectedCandidates from "./pages/RejectedCandidates";

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("admin");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener(
        "beforeunload",
        handleTabClose
      );
    };
  }, []);

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
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/my-applications"
          element={<MyApplications />}
        />
        <Route path="/profile" element={<Profile />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={<Register />}
        />

        {/* Job Details */}
        <Route
          path="/job/:id"
          element={<JobDetails />}
        />
        <Route
          path="/apply/:id"
          element={<ApplyJob />}
        />

        {/* Admin */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/profile"
          element={<AdminProfile />}
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

      <ToastContainer
        position="top-right"
        autoClose={2500}
        theme="colored"
      />

      {!hideUserLayout && <Footer />}
    </>
  );
}

export default App;