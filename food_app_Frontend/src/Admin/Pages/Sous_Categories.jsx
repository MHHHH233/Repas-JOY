import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Eye, Layers, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { SousCategoryModal } from "../Crud/SousCategoryModal"
import { DeleteModal } from "../Crud/DeleteModal"
import { ViewModal } from "../Crud/ViewModal"
import adminSousCategoriesService from "../../lib/services/back/adminSousCategoriesService"
import adminCategoriesService from "../../lib/services/back/adminCategoriesService"

export function SousCategoriesPage() {
  const [sousCategories, setSousCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [selectedSousCategory, setSelectedSousCategory] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadSousCategories()
    loadCategories()
  }, [currentPage])

  const loadSousCategories = async () => {
    try {
      setLoading(true)
      const response = await adminSousCategoriesService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setSousCategories(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading sous categories:", err)
      setError("Failed to load sous categories")
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
      await adminSousCategoriesService.create(formData)
      await loadSousCategories()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding sous category:", err)
      alert("Failed to add sous category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminSousCategoriesService.update(selectedSousCategory.id, formData)
      await loadSousCategories()
      setIsEditModalOpen(false)
      setSelectedSousCategory(null)
    } catch (err) {
      console.error("Error updating sous category:", err)
      alert("Failed to update sous category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminSousCategoriesService.remove(selectedSousCategory.id)
      await loadSousCategories()
      setIsDeleteModalOpen(false)
      setSelectedSousCategory(null)
    } catch (err) {
      console.error("Error deleting sous category:", err)
      alert("Failed to delete sous category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredSousCategories = sousCategories.filter(sc =>
    sc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sc.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && sousCategories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading sous categories...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Sous-Categories</h1>
          <p className="text-gray-600 mt-1">Manage sub-categories for your food items</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Sous-Category
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
          placeholder="Search sous categories by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredSousCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <Layers className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No sous categories found" : "No Sous-Categories Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first sous-category"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Sous-Category
            </button>
          )}
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Name</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Description</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSousCategories.map((sc, index) => (
                <motion.tr
                  key={sc.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-amber-50/50 transition"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Layers className="text-orange-600" size={18} />
                      <span className="text-gray-900 font-medium">{sc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2 max-w-xs">
                      <FileText className="text-gray-400 flex-shrink-0" size={16} />
                      <span className="text-gray-700 truncate">{sc.description || "-"}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedSousCategory(sc)
                          setIsViewModalOpen(true)
                        }}
                        className="text-green-600 hover:text-green-700 p-2 rounded-lg hover:bg-green-50 transition"
                        title="View"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSousCategory(sc)
                          setIsEditModalOpen(true)
                        }}
                        className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSousCategory(sc)
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
            <span className="font-semibold">{pagination.total}</span> sous categories
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
      <SousCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        categories={categories}
        isLoading={isSaving}
      />

      <SousCategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedSousCategory(null)
        }}
        onSave={handleEdit}
        sousCategory={selectedSousCategory}
        categories={categories}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedSousCategory(null)
        }}
        onConfirm={handleDelete}
        itemName={selectedSousCategory?.name}
        title="Delete Sous-Category"
      />

      <ViewModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false)
          setSelectedSousCategory(null)
        }}
        title="View Sous-Category Details"
        data={selectedSousCategory}
        fields={[
          { key: "name", label: "Name" },
          { key: "description", label: "Description" },
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
