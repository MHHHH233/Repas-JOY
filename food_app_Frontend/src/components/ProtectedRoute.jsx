import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import authService from "../lib/services/front/authService"

export function ProtectedRoute({ children, requiredRole = null }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [userRole, setUserRole] = useState(null)
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
        const response = await authService.profile()
        
        if (response?.success && response?.data) {
          const user = response.data
          setUserRole(user.role)
          // Store/update user data in sessionStorage
          sessionStorage.setItem('user', JSON.stringify(user))
          setIsAuthenticated(true)
        } else {
          // Fallback to sessionStorage if response structure is different
          const storedUser = sessionStorage.getItem('user')
          if (storedUser) {
            try {
              const user = JSON.parse(storedUser)
              setUserRole(user.role)
              setIsAuthenticated(true)
            } catch (e) {
              setIsAuthenticated(false)
            }
          } else {
            setIsAuthenticated(false)
          }
        }
      } catch (error) {
        // Token is invalid or expired
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
        setIsAuthenticated(false)
        setUserRole(null)
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

  // Check role if required
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

// Admin-specific protected route
export function AdminProtectedRoute({ children }) {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
}
