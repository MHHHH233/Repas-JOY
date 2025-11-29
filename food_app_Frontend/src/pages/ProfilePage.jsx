import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Mail, Lock, User, MapPin, Calendar, AlertCircle, CheckCircle2, Edit2, Save, X } from "lucide-react"
import authService from "../lib/services/front/authService"
import userUsersService from "../lib/services/front/usersService"

export function ProfilePage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPwd, setIsChangingPwd] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    date_naissance: "",
  })
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    password: "",
    password_confirmation: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [errors, setErrors] = useState({})
  const [passwordErrors, setPasswordErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState("")
  const [serverError, setServerError] = useState("")

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      // Try to get from sessionStorage first
      const storedUser = sessionStorage.getItem('user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setFormData({
          username: parsedUser.username || "",
          email: parsedUser.email || "",
          address: parsedUser.address || "",
          date_naissance: parsedUser.date_naissance ? parsedUser.date_naissance.split('T')[0] : "",
        })
      }
      
      // Always fetch fresh data from API
      const response = await authService.profile()
      if (response?.success && response?.data) {
        const userData = response.data
        setUser(userData)
        sessionStorage.setItem('user', JSON.stringify(userData))
        setFormData({
          username: userData.username || "",
          email: userData.email || "",
          address: userData.address || "",
          date_naissance: userData.date_naissance ? userData.date_naissance.split('T')[0] : "",
        })
      }
    } catch (err) {
      console.error("Error loading profile:", err)
      if (err.response?.status === 401) {
        navigate("/signin")
      } else {
        setServerError("Failed to load profile. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
    if (serverError) {
      setServerError("")
    }
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
    if (passwordErrors[name]) {
      setPasswordErrors({
        ...passwordErrors,
        [name]: "",
      })
    }
  }

  const validateProfileForm = () => {
    const newErrors = {}
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    if (formData.address && formData.address.length < 5) {
      newErrors.address = "Address must be at least 5 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validatePasswordForm = () => {
    const newErrors = {}
    
    if (!passwordData.current_password) {
      newErrors.current_password = "Current password is required"
    }
    
    if (!passwordData.password) {
      newErrors.password = "New password is required"
    } else if (passwordData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(passwordData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    }
    
    if (!passwordData.password_confirmation) {
      newErrors.password_confirmation = "Please confirm your password"
    } else if (passwordData.password !== passwordData.password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match"
    }
    
    if (passwordData.current_password === passwordData.password) {
      newErrors.password = "New password must be different from current password"
    }

    setPasswordErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")
    setServerError("")

    if (!validateProfileForm()) {
      return
    }

    setIsSaving(true)
    try {
      // Use userUsersService.update with user ID
      const response = await userUsersService.update(user.id, formData)
      
      if (response?.success && response?.data) {
        const updatedUser = response.data
        setUser(updatedUser)
        sessionStorage.setItem('user', JSON.stringify(updatedUser))
        setSuccessMessage("Profile updated successfully!")
        setIsEditing(false)
        setTimeout(() => setSuccessMessage(""), 3000)
        // Dispatch auth change event to update navbar
        window.dispatchEvent(new Event("authChange"))
      } else {
        setServerError("Failed to update profile. Please try again.")
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors
        const formattedErrors = {}
        
        Object.keys(serverErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(serverErrors[key]) 
            ? serverErrors[key][0] 
            : serverErrors[key]
        })
        
        setErrors(formattedErrors)
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message)
      } else {
        setServerError("Failed to update profile. Please try again.")
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordErrors({})
    setPasswordSuccessMessage("")
    setServerError("")

    if (!validatePasswordForm()) {
      return
    }

    setIsChangingPwd(true)
    try {
      // Use userUsersService.update with password field
      const response = await userUsersService.update(user.id, {
        password: passwordData.password,
      })
      
      if (response?.success) {
        setPasswordSuccessMessage("Password changed successfully!")
        setPasswordData({
          current_password: "",
          password: "",
          password_confirmation: "",
        })
        setIsChangingPassword(false)
        setTimeout(() => setPasswordSuccessMessage(""), 3000)
      } else {
        setServerError("Failed to change password. Please try again.")
      }
    } catch (err) {
      console.error("Error changing password:", err)
      if (err.response?.data?.errors) {
        const serverErrors = err.response.data.errors
        const formattedErrors = {}
        
        Object.keys(serverErrors).forEach(key => {
          formattedErrors[key] = Array.isArray(serverErrors[key]) 
            ? serverErrors[key][0] 
            : serverErrors[key]
        })
        
        setPasswordErrors(formattedErrors)
      } else if (err.response?.data?.message) {
        setServerError(err.response.data.message)
      } else {
        setServerError("Failed to change password. Please try again.")
      }
    } finally {
      setIsChangingPwd(false)
    }
  }

  const cancelEdit = () => {
    setIsEditing(false)
    setErrors({})
    setSuccessMessage("")
    setServerError("")
    // Reset form data to original user data
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        address: user.address || "",
        date_naissance: user.date_naissance ? user.date_naissance.split('T')[0] : "",
      })
    }
  }

  const cancelPasswordChange = () => {
    setIsChangingPassword(false)
    setPasswordErrors({})
    setPasswordSuccessMessage("")
    setPasswordData({
      current_password: "",
      password: "",
      password_confirmation: "",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 text-lg">Failed to load profile</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-orange-600 hover:text-orange-700 font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information and security settings</p>
        </div>

        {/* Success Messages */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-800">{successMessage}</p>
          </div>
        )}

        {passwordSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-800">{passwordSuccessMessage}</p>
          </div>
        )}

        {/* Server Error */}
        {serverError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{serverError}</p>
          </div>
        )}

        {/* Profile Information Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-4xl shadow-lg">
                  {user.username?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="text-white">
                  <h2 className="text-3xl font-bold">{user.username}</h2>
                  <p className="text-orange-100 capitalize mt-1">{user.role || "User"}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-md"
                >
                  <Edit2 size={20} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <User className="text-orange-600" size={18} />
                      Username *
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        errors.username
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isSaving}
                      placeholder="Enter your username"
                    />
                    {errors.username && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Mail className="text-orange-600" size={18} />
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isSaving}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <MapPin className="text-orange-600" size={18} />
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        errors.address
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isSaving}
                      placeholder="Enter your address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="date_naissance" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                      <Calendar className="text-orange-600" size={18} />
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="date_naissance"
                      name="date_naissance"
                      value={formData.date_naissance}
                      onChange={handleChange}
                      max={new Date(new Date().setFullYear(new Date().getFullYear() - 13)).toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-colors"
                      disabled={isSaving}
                    />
                    {errors.date_naissance && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.date_naissance}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={isSaving}
                    className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2.5 text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <User className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Username</p>
                    <p className="text-gray-900 font-medium text-lg">{user.username || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Mail className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Email</p>
                    <p className="text-gray-900 font-medium text-lg">{user.email || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <MapPin className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Address</p>
                    <p className="text-gray-900 font-medium text-lg">{user.address || "-"}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Date of Birth</p>
                    <p className="text-gray-900 font-medium text-lg">
                      {user.date_naissance ? new Date(user.date_naissance).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Calendar className="text-orange-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Member Since</p>
                    <p className="text-gray-900 font-medium text-lg">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "-"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Security Settings</h3>
              <p className="text-gray-600 mt-1">Change your password to keep your account secure</p>
            </div>
            {!isChangingPassword && (
              <button
                onClick={() => setIsChangingPassword(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors font-medium"
              >
                <Lock size={20} />
                Change Password
              </button>
            )}
          </div>

          <div className="p-6">
            {isChangingPassword ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Lock className="text-orange-600" size={18} />
                    Current Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      id="current_password"
                      name="current_password"
                      value={passwordData.current_password}
                      onChange={handlePasswordChange}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        passwordErrors.current_password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isChangingPwd}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      tabIndex={-1}
                    >
                      {showPasswords.current ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.current_password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {passwordErrors.current_password}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Lock className="text-orange-600" size={18} />
                    New Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      id="password"
                      name="password"
                      value={passwordData.password}
                      onChange={handlePasswordChange}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        passwordErrors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isChangingPwd}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      tabIndex={-1}
                    >
                      {showPasswords.new ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {passwordErrors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Lock className="text-orange-600" size={18} />
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      id="password_confirmation"
                      name="password_confirmation"
                      value={passwordData.password_confirmation}
                      onChange={handlePasswordChange}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 sm:text-sm transition-colors ${
                        passwordErrors.password_confirmation
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-orange-500 focus:border-orange-500"
                      }`}
                      disabled={isChangingPwd}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      tabIndex={-1}
                    >
                      {showPasswords.confirm ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.password_confirmation && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {passwordErrors.password_confirmation}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={cancelPasswordChange}
                    disabled={isChangingPwd}
                    className="px-6 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isChangingPwd}
                    className="px-6 py-2.5 text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isChangingPwd ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Changing...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Change Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <Lock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Click "Change Password" to update your password</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

