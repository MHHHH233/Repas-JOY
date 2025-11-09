import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Eye, User, Mail, MapPin, Shield } from "lucide-react"
import { motion } from "framer-motion"
import { UserModal } from "../Crud/UserModal"
import { DeleteModal } from "../Crud/DeleteModal"
import { ViewModal } from "../Crud/ViewModal"
import adminUsersService from "../../lib/services/back/adminUsersService"

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadUsers()
  }, [currentPage])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await adminUsersService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setUsers(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading users:", err)
      setError("Failed to load users")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminUsersService.create(formData)
      await loadUsers()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding user:", err)
      alert("Failed to add user. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminUsersService.update(selectedUser.id, formData)
      await loadUsers()
      setIsEditModalOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error("Error updating user:", err)
      alert("Failed to update user. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminUsersService.remove(selectedUser.id)
      await loadUsers()
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
    } catch (err) {
      console.error("Error deleting user:", err)
      alert("Failed to delete user. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add User
        </button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search users by username or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No users found" : "No Users Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first user"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add User
            </button>
          )}
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-orange-600" />
                    Username
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-orange-600" />
                    Email
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-orange-600" />
                    Address
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-orange-600" />
                    Role
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="text-blue-600" size={16} />
                      </div>
                      <span className="text-gray-900 font-medium">{user.username}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-400" size={14} />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-400" size={14} />
                      <span className="text-gray-700">{user.address || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 w-fit ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Shield size={14} />
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsViewModalOpen(true)
                        }}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsEditModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDeleteModalOpen(true)
                        }}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-white rounded-lg border border-gray-200 p-4"
        >
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{pagination.from}</span> to{" "}
            <span className="font-semibold">{pagination.to}</span> of{" "}
            <span className="font-semibold">{pagination.total}</span> users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-medium"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.last_page}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition font-medium"
            >
              Next
            </button>
          </div>
        </motion.div>
      )}

      {/* Modals */}
      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        isLoading={isSaving}
      />

      <UserModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        onSave={handleEdit}
        user={selectedUser}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedUser(null)
        }}
        onConfirm={handleDelete}
        itemName={selectedUser?.username}
        title="Delete User"
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedUser(null)
        }}
        title="View User Details"
        data={selectedUser}
        fields={[
          { key: "username", label: "Username" },
          { key: "email", label: "Email" },
          { key: "address", label: "Address" },
          { key: "role", label: "Role" },
          { 
            key: "date_naissance", 
            label: "Date of Birth",
            formatter: (value) => value ? new Date(value).toLocaleDateString() : "-"
          },
          { 
            key: "created_at", 
            label: "Created At",
            formatter: (value) => value ? new Date(value).toLocaleString() : "-"
          },
          { 
            key: "updated_at", 
            label: "Updated At",
            formatter: (value) => value ? new Date(value).toLocaleString() : "-"
          },
        ]}
      />
    </div>
  )
}
