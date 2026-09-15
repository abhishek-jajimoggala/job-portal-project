import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(
    localStorage.getItem("loggedUser")
  );

  return user
    ? children
    : <Navigate to="/login" replace />;
}

export default ProtectedRoute;