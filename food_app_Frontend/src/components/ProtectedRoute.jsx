import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../lib/services/front/authService"

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = sessionStorage.getItem("token")
        if (!token) {
          setIsAuthenticated(false)
          setIsLoading(false)
          return
        }

        // Try to get user profile to verify token
        await authService.profile()
        setIsAuthenticated(true)
      } catch (error) {
        // Token is invalid or expired
        sessionStorage.removeItem("token")
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return children
}
