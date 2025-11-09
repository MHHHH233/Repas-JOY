import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Tag, Layers, Package } from "lucide-react"
import { motion } from "framer-motion"
import { CategoryModal } from "../Crud/CategoryModal"
import { DeleteModal } from "../Crud/DeleteModal"
import adminCategoriesService from "../../lib/services/back/adminCategoriesService"

export function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadCategories()
  }, [currentPage])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await adminCategoriesService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setCategories(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading categories:", err)
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminCategoriesService.create(formData)
      await loadCategories()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding category:", err)
      alert("Failed to add category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminCategoriesService.update(selectedCategory.id, formData)
      await loadCategories()
      setIsEditModalOpen(false)
      setSelectedCategory(null)
    } catch (err) {
      console.error("Error updating category:", err)
      alert("Failed to update category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminCategoriesService.remove(selectedCategory.id)
      await loadCategories()
      setIsDeleteModalOpen(false)
      setSelectedCategory(null)
    } catch (err) {
      console.error("Error deleting category:", err)
      alert("Failed to delete category. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredCategories = categories.filter(cat =>
    cat.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading categories...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage your food categories</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Category
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
          placeholder="Search categories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <Tag className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No categories found" : "No Categories Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first category"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Category
            </button>
          )}
        </motion.div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Tag className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white">{cat.name}</h3>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200">
                <Package className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm font-semibold text-orange-700">Items Count</p>
                  <p className="text-2xl font-bold text-gray-900">{cat.repas?.length || 0}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedCategory(cat)
                    setIsEditModalOpen(true)
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(cat)
                    setIsDeleteModalOpen(true)
                  }}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
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
            <span className="font-semibold">{pagination.total}</span> categories
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
      <CategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        isLoading={isSaving}
      />

      <CategoryModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedCategory(null)
        }}
        onSave={handleEdit}
        category={selectedCategory}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedCategory(null)
        }}
        onConfirm={handleDelete}
        itemName={selectedCategory?.name}
        title="Delete Category"
      />
    </div>
  )
}
