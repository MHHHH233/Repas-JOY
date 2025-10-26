import { Navigate } from "react-router-dom"

export function ProtectedRoute({ children, isAuthenticated = false }) {
  return isAuthenticated ? children : <Navigate to="/signin" replace />
}
