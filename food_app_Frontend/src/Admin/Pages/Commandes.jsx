import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Eye, ShoppingBag, User, UtensilsCrossed, MapPin, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { CommandeModal } from "../Crud/CommandeModal"
import { DeleteModal } from "../Crud/DeleteModal"
import { ViewModal } from "../Crud/ViewModal"
import adminCommandesService from "../../lib/services/back/adminCommandesService"
import adminUsersService from "../../lib/services/back/adminUsersService"
import adminRepasService from "../../lib/services/back/adminRepasService"

export function CommandesPage() {
  const [commandes, setCommandes] = useState([])
  const [users, setUsers] = useState([])
  const [repas, setRepas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedCommande, setSelectedCommande] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadCommandes()
    loadUsers()
    loadRepas()
  }, [currentPage])

  const loadCommandes = async () => {
    try {
      setLoading(true)
      const response = await adminCommandesService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setCommandes(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading commandes:", err)
      setError("Failed to load commandes")
    } finally {
      setLoading(false)
    }
  }

  const loadUsers = async () => {
    try {
      const response = await adminUsersService.list({ per_page: 100 })
      if (response.success && response.data) {
        setUsers(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading users:", err)
    }
  }

  const loadRepas = async () => {
    try {
      const response = await adminRepasService.list({ per_page: 100 })
      if (response.success && response.data) {
        setRepas(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading repas:", err)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminCommandesService.create(formData)
      await loadCommandes()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding commande:", err)
      alert("Failed to add commande. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminCommandesService.update(selectedCommande.id, formData)
      await loadCommandes()
      setIsEditModalOpen(false)
      setSelectedCommande(null)
    } catch (err) {
      console.error("Error updating commande:", err)
      alert("Failed to update commande. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminCommandesService.remove(selectedCommande.id)
      await loadCommandes()
      setIsDeleteModalOpen(false)
      setSelectedCommande(null)
    } catch (err) {
      console.error("Error deleting commande:", err)
      alert("Failed to delete commande. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredCommandes = commandes.filter(c =>
    c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.repas?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && commandes.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading commandes...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Commandes (Orders)</h1>
          <p className="text-gray-600 mt-1">Manage customer orders and deliveries</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Commande
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
          placeholder="Search by customer name, user, or repas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredCommandes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No commandes found" : "No Commandes Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first commande"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Commande
            </button>
          )}
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <User size={18} className="text-orange-600" />
                    User
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed size={18} className="text-orange-600" />
                    Repas
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-orange-600" />
                    Address
                  </div>
                </th>
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
              {filteredCommandes.map((c, index) => (
                <motion.tr
                  key={c.id}
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
                      <span className="text-gray-900 font-medium">{c.user?.username || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <UtensilsCrossed className="text-orange-600" size={16} />
                      <span className="text-gray-700">{c.repas?.name || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900 font-medium whitespace-nowrap">{c.name || "-"}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 max-w-xs">
                      <MapPin className="text-gray-400 flex-shrink-0" size={14} />
                      <span className="text-gray-700 truncate">{c.address || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm whitespace-nowrap">
                      <Calendar className="text-gray-400" size={14} />
                      {c.created_at ? new Date(c.created_at).toLocaleDateString() : "-"}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCommande(c)
                          setIsViewModalOpen(true)
                        }}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCommande(c)
                          setIsEditModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCommande(c)
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
            <span className="font-semibold">{pagination.total}</span> commandes
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
      <CommandeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        users={users}
        repas={repas}
        isLoading={isSaving}
      />

      <CommandeModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCommande(null)
        }}
        onSave={handleEdit}
        commande={selectedCommande}
        users={users}
        repas={repas}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedCommande(null)
        }}
        onConfirm={handleDelete}
        itemName={`Commande #${selectedCommande?.id}`}
        title="Delete Commande"
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedCommande(null)
        }}
        title="View Commande Details"
        data={selectedCommande}
        fields={[
          { 
            key: "user.username", 
            label: "User",
            formatter: (value) => value || "Walk-in customer (No account)"
          },
          { 
            key: "user.email", 
            label: "User Email",
            formatter: (value) => value || "-"
          },
          { key: "repas.name", label: "Repas" },
          { key: "name", label: "Name" },
          { key: "address", label: "Address" },
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
