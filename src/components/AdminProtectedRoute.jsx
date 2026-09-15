import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {

  const admin = JSON.parse(
    localStorage.getItem("loggedAdmin")
  );

  return admin
    ? children
    : <Navigate to="/admin-login" replace />;
}

export default AdminProtectedRoute;