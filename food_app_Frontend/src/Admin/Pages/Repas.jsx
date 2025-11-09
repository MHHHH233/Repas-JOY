import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Eye, EyeOff, UtensilsCrossed, Layers, Package, CheckCircle2, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { RepasModal } from "../Crud/RepasModal"
import { DeleteModal } from "../Crud/DeleteModal"
import { ViewModal } from "../Crud/ViewModal"
import adminRepasService from "../../lib/services/back/adminRepasService"
import adminCategoriesService from "../../lib/services/back/adminCategoriesService"

export function RepasPage() {
  const [repas, setRepas] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedRepas, setSelectedRepas] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadRepas()
    loadCategories()
  }, [currentPage])

  const loadRepas = async () => {
    try {
      setLoading(true)
      const response = await adminRepasService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setRepas(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading repas:", err)
      setError("Failed to load repas")
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const response = await adminCategoriesService.list({ per_page: 100 })
      if (response.success && response.data) {
        setCategories(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading categories:", err)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminRepasService.create(formData)
      await loadRepas()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding repas:", err)
      alert("Failed to add repas. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminRepasService.update(selectedRepas.id, formData)
      await loadRepas()
      setIsEditModalOpen(false)
      setSelectedRepas(null)
    } catch (err) {
      console.error("Error updating repas:", err)
      alert("Failed to update repas. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminRepasService.remove(selectedRepas.id)
      await loadRepas()
      setIsDeleteModalOpen(false)
      setSelectedRepas(null)
    } catch (err) {
      console.error("Error deleting repas:", err)
      alert("Failed to delete repas. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleVisibility = async (id) => {
    try {
      await adminRepasService.toggleVisibility(id)
      await loadRepas()
    } catch (err) {
      console.error("Error toggling visibility:", err)
      alert("Failed to toggle visibility. Please try again.")
    }
  }

  const filteredRepas = repas.filter(r =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && repas.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading repas...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Repas (Meals)</h1>
          <p className="text-gray-600 mt-1">Manage your menu items and meals</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Repas
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
          placeholder="Search repas by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredRepas.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <UtensilsCrossed className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No repas found" : "No Repas Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first repas"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Repas
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
                    <UtensilsCrossed size={18} className="text-orange-600" />
                    Name
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Layers size={18} className="text-orange-600" />
                    Category
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Description</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Package size={18} className="text-orange-600" />
                    Quantity
                  </div>
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRepas.map((r, index) => (
                <motion.tr
                  key={r.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <UtensilsCrossed className="text-orange-600" size={16} />
                      </div>
                      <span className="text-gray-900 font-medium">{r.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Layers className="text-purple-600" size={16} />
                      <span className="text-gray-700">{r.category?.name || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-700 max-w-xs truncate block">{r.description || "-"}</span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                        r.qte > 20 
                          ? "bg-green-100 text-green-700" 
                          : r.qte > 0 
                          ? "bg-yellow-100 text-yellow-700" 
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.qte}
                    </span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1 ${
                          r.onView ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {r.onView ? (
                          <>
                            <CheckCircle2 size={14} />
                            Visible
                          </>
                        ) : (
                          <>
                            <XCircle size={14} />
                            Hidden
                          </>
                        )}
                      </span>
                      {r.vegan && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Vegan
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRepas(r)
                          setIsViewModalOpen(true)
                        }}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleVisibility(r.id)}
                        className="text-purple-600 hover:text-purple-700 p-2 rounded-lg hover:bg-purple-50 transition"
                        title={r.onView ? "Hide" : "Show"}
                      >
                        {r.onView ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRepas(r)
                          setIsEditModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedRepas(r)
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
            <span className="font-semibold">{pagination.total}</span> repas
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
      <RepasModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        categories={categories}
        isLoading={isSaving}
      />

      <RepasModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedRepas(null)
        }}
        onSave={handleEdit}
        repas={selectedRepas}
        categories={categories}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedRepas(null)
        }}
        onConfirm={handleDelete}
        itemName={selectedRepas?.name}
        title="Delete Repas"
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedRepas(null)
        }}
        title="View Repas Details"
        data={selectedRepas}
        fields={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
          { key: "category.name", label: "Category" },
          { key: "qte", label: "Quantity" },
          { key: "vegan", label: "Vegan" },
          { key: "onView", label: "Visible" },
          { 
            key: "imgs_urls", 
            label: "Images",
            formatter: (value) => Array.isArray(value) && value.length > 0 
              ? value.map((url, i) => `${i + 1}. ${url}`).join("\n")
              : "No images"
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
