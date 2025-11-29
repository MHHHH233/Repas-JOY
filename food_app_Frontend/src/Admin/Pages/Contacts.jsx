import { useState, useEffect } from "react"
import { Mail, MessageSquare, Eye, EyeOff, Search, Calendar, User, X, CheckCircle2, Clock } from "lucide-react"
import { motion } from "framer-motion"
import adminContactsService from "../../lib/services/back/adminContactsService"

export function ContactPage() {
  const [contacts, setContacts] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    loadContacts()
    loadStats()
  }, [currentPage, statusFilter])

  const loadContacts = async () => {
    try {
      setLoading(true)
      const params = { per_page: 10, page: currentPage }
      if (statusFilter) {
        params.status = statusFilter
      }
      const response = await adminContactsService.list(params)
      if (response.success && response.data) {
        setContacts(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading contacts:", err)
      setError("Failed to load contacts")
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const response = await adminContactsService.statsOverview()
      if (response.success && response.data) {
        setStats(response.data)
      }
    } catch (err) {
      console.error("Error loading stats:", err)
    }
  }

  const handleViewContact = async (contact) => {
    setSelectedContact(contact)
    setIsViewModalOpen(true)
    
    // Mark as read if status is pending
    if (contact.status === "pending") {
      try {
        await adminContactsService.updateStatus(contact.id, "read")
        await loadContacts()
        await loadStats()
      } catch (err) {
        console.error("Error updating status:", err)
      }
    }
  }

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      await adminContactsService.updateStatus(contactId, newStatus)
      await loadContacts()
      await loadStats()
      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus })
      }
    } catch (err) {
      console.error("Error updating status:", err)
      alert("Failed to update status. Please try again.")
    }
  }

  const filteredContacts = contacts.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      case "read":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "replied":
        return "bg-green-100 text-green-700 border-green-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "read":
        return <Eye className="w-4 h-4" />
      case "replied":
        return <CheckCircle2 className="w-4 h-4" />
      default:
        return <Mail className="w-4 h-4" />
    }
  }

  if (loading && contacts.length === 0 && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading contacts...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
          <p className="text-gray-600 mt-1">Manage customer messages and inquiries</p>
        </div>
      </motion.div>

      {/* Dashboard Cards */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Total Messages Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Total Messages</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.total_contacts || 0}</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="text-white" size={32} />
              </div>
            </div>
          </motion.div>

          {/* Read Messages Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Messages Read</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.read_contacts || 0}</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Eye className="text-white" size={32} />
              </div>
            </div>
          </motion.div>

          {/* Unread Messages Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">Messages Unread</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.pending_contacts || 0}</h3>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                <EyeOff className="text-white" size={32} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value)
            setCurrentPage(1)
          }}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </motion.div>

      {/* Empty State */}
      {!loading && filteredContacts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || statusFilter ? "No contacts found" : "No Messages"}
          </h3>
          <p className="text-gray-600">
            {searchTerm || statusFilter
              ? "Try adjusting your search or filter terms"
              : "No contact messages have been received yet"}
          </p>
        </motion.div>
      )}

      {/* Messages List */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-orange-600" />
                    Name
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Mail size={18} className="text-orange-600" />
                    Email
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Subject</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-orange-600" />
                    Date
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition ${
                    contact.status === "pending" ? "bg-yellow-50/30" : ""
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="text-orange-600" size={16} />
                      </div>
                      <span className="text-gray-900 font-medium">{contact.name || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{contact.email || "-"}</td>
                  <td className="py-4 px-6">
                    <span className="text-gray-900 font-medium">{contact.subject || "-"}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        contact.status
                      )}`}
                    >
                      {getStatusIcon(contact.status)}
                      {contact.status || "pending"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
                      <Calendar className="text-gray-400" size={14} />
                      {contact.created_at
                        ? new Date(contact.created_at).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "-"}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      onClick={() => handleViewContact(contact)}
                      className="text-orange-600 hover:text-orange-700 p-2 rounded-lg hover:bg-orange-50 transition font-medium"
                      title="View Message"
                    >
                      <Eye size={18} />
                    </button>
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
            <span className="font-semibold">{pagination.total}</span> contacts
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

      {/* View Modal */}
      {isViewModalOpen && selectedContact && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Message Details</h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedContact(null)
                }}
                className="text-white hover:bg-white/20 p-1 rounded transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Name</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedContact.email}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Subject</label>
                  <p className="mt-1 text-gray-900 font-medium">{selectedContact.subject}</p>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Message</label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Status and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                  <div className="mt-2">
                    <select
                      value={selectedContact.status}
                      onChange={(e) => handleStatusChange(selectedContact.id, e.target.value)}
                      className={`px-4 py-2 rounded-lg border font-semibold text-sm ${getStatusColor(
                        selectedContact.status
                      )} focus:ring-2 focus:ring-orange-500`}
                    >
                      <option value="pending">Pending</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Date</label>
                  <p className="mt-1 text-gray-900">
                    {selectedContact.created_at
                      ? new Date(selectedContact.created_at).toLocaleString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsViewModalOpen(false)
                  setSelectedContact(null)
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

