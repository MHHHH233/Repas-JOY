import { useNavigate } from "react-router-dom"
import { Menu, LogOut } from "lucide-react"
import authService from "../../lib/services/front/authService"
import fullLogo from "../../assets/fullLogo-.png"

export function Navbar({ onMenuToggle }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await authService.logout()
      sessionStorage.removeItem('user')
      navigate("/signin")
    } catch (error) {
      console.error("Logout error:", error)
      // Even if logout fails, clear token and redirect
      try {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('user')
        navigate("/signin")
      } catch (e) {
        navigate("/signin")
      }
    }
  }

  // Get user from sessionStorage
  const getUser = () => {
    try {
      const userStr = sessionStorage.getItem('user')
      return userStr ? JSON.parse(userStr) : null
    } catch {
      return null
    }
  }

  const user = getUser()
  const userInitial = user?.username?.charAt(0).toUpperCase() || 'A'

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm sticky top-0 z-20">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuToggle}
            className="md:hidden text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition"
          >
            <Menu size={24} />
          </button>
          <img 
            src={fullLogo} 
            alt="Repas Joy Logo" 
            className="h-16 md:h-20 object-contain"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Admin Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">{user?.username || "Admin User"}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role || "Manager"}</p>
            </div>
            <button
              onClick={() => navigate("/admin/profile")}
              className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center text-white font-bold text-lg cursor-pointer shadow-md hover:shadow-lg transition"
            >
              {userInitial}
            </button>
          </div>

          {/* Logout Icon */}
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-red-600 transition p-2 rounded-lg hover:bg-gray-100"
            title="Logout"
          >
            <LogOut size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}
