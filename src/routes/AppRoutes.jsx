import { Routes, Route } from "react-router-dom";
import AdminProtectedRoute from "../components/AdminProtectedRoute";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/ApplyJob";
import Applications from "../pages/Applications";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Companies from "../pages/Companies";
import Categories from "../pages/Categories";
import SavedJobs from "../pages/SavedJobs";
import AdminApplications from "../pages/AdminApplications";
import AdminLogin from "../pages/AdminLogin";
import AdminDashboard from "../pages/AdminDashboard";
import ManageJobs from "../pages/ManageJobs";
import UserProfiles from "../pages/UserProfiles";
import ViewResumes from "../pages/ViewResumes";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/admin/applications" element={<AdminApplications />}/>
      {/* User Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Authentication */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* User Protected Routes */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/jobs"
  element={
    <AdminProtectedRoute>
      <ManageJobs />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/users"
  element={
    <AdminProtectedRoute>
      <UserProfiles />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/resumes"
  element={
    <AdminProtectedRoute>
      <ViewResumes />
    </AdminProtectedRoute>
  }
/>
    </Routes>
  );
}

export default AppRoutes;