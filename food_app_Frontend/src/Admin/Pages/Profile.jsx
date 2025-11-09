import { useState, useEffect } from "react"
import { Save, Mail, User, MapPin, Calendar, Shield, Edit2 } from "lucide-react"
import { motion } from "framer-motion"
import authService from "../../lib/services/front/authService"

export function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    date_naissance: "",
  })
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")

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
      } else {
        // If not in sessionStorage, fetch from API
        const response = await authService.profile()
        if (response.success && response.data) {
          setUser(response.data)
          sessionStorage.setItem('user', JSON.stringify(response.data))
          setFormData({
            username: response.data.username || "",
            email: response.data.email || "",
            address: response.data.address || "",
            date_naissance: response.data.date_naissance ? response.data.date_naissance.split('T')[0] : "",
          })
        }
      }
    } catch (err) {
      console.error("Error loading profile:", err)
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setSuccessMessage("")

    const newErrors = {}
    if (!formData.username.trim()) {
      newErrors.username = "Username is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSaving(true)
    try {
      const response = await authService.updateProfile(formData)
      if (response.success && response.data) {
        setUser(response.data)
        sessionStorage.setItem('user', JSON.stringify(response.data))
        setSuccessMessage("Profile updated successfully!")
        setIsEditing(false)
        setTimeout(() => setSuccessMessage(""), 3000)
      }
    } catch (err) {
      console.error("Error updating profile:", err)
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors)
      } else {
        alert("Failed to update profile. Please try again.")
      }
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading profile...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Failed to load profile</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Manage your account information</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition"
          >
            <Edit2 size={20} />
            Edit Profile
          </button>
        )}
      </div>

      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-3xl shadow-lg">
              {user.username?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{user.username}</h2>
              <p className="text-orange-100 capitalize">{user.role || "User"}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <User className="text-orange-600" size={18} />
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.username ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isSaving}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Mail className="text-orange-600" size={18} />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    disabled={isSaving}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <MapPin className="text-orange-600" size={18} />
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Calendar className="text-orange-600" size={18} />
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date_naissance"
                    value={formData.date_naissance}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false)
                    setErrors({})
                    // Reset form data
                    setFormData({
                      username: user.username || "",
                      email: user.email || "",
                      address: user.address || "",
                      date_naissance: user.date_naissance ? user.date_naissance.split('T')[0] : "",
                    })
                  }}
                  disabled={isSaving}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition font-medium disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  <Save size={18} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <User className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Username</p>
                  <p className="text-gray-900 font-medium">{user.username || "-"}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Mail className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-gray-900 font-medium">{user.email || "-"}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <MapPin className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Address</p>
                  <p className="text-gray-900 font-medium">{user.address || "-"}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Calendar className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Date of Birth</p>
                  <p className="text-gray-900 font-medium">
                    {user.date_naissance ? new Date(user.date_naissance).toLocaleDateString() : "-"}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Shield className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Role</p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-700 capitalize">
                    {user.role || "user"}
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100"
              >
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Calendar className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-1">Member Since</p>
                  <p className="text-gray-900 font-medium">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

