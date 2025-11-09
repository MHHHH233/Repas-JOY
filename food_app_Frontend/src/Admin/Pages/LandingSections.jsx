import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Palette, ExternalLink, CheckCircle2, XCircle } from "lucide-react"
import { motion } from "framer-motion"
import { LandingSectionModal } from "../Crud/LandingSectionModal"
import { DeleteModal } from "../Crud/DeleteModal"
import adminLandingSectionsService from "../../lib/services/back/adminLandingSectionsService"

export function LandingSectionsPage() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadSections()
  }, [currentPage])

  const loadSections = async () => {
    try {
      setLoading(true)
      const response = await adminLandingSectionsService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setSections(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading landing sections:", err)
      setError("Failed to load landing sections")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminLandingSectionsService.create(formData)
      await loadSections()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding landing section:", err)
      alert("Failed to add landing section. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminLandingSectionsService.update(selectedSection.id, formData)
      await loadSections()
      setIsEditModalOpen(false)
      setSelectedSection(null)
    } catch (err) {
      console.error("Error updating landing section:", err)
      alert("Failed to update landing section. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminLandingSectionsService.remove(selectedSection.id)
      await loadSections()
      setIsDeleteModalOpen(false)
      setSelectedSection(null)
    } catch (err) {
      console.error("Error deleting landing section:", err)
      alert("Failed to delete landing section. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredSections = sections.filter(s =>
    s.title_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.subtitle_text?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && sections.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading landing sections...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Landing Sections</h1>
          <p className="text-gray-600 mt-1">Manage your homepage hero sections and banners</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Section
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
          placeholder="Search sections by title or subtitle..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredSections.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <Palette className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No sections found" : "No Landing Sections Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first landing section"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Section
            </button>
          )}
        </motion.div>
      )}

      {/* Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 px-6 py-4 border-b border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Palette className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{section.title_text || "Untitled Section"}</h3>
                    <p className="text-sm text-gray-600">Section #{section.id}</p>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                    section.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {section.is_active ? (
                    <>
                      <CheckCircle2 size={16} />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      Inactive
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              {/* Background Image */}
              {section.background_img ? (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-4 rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={section.background_img}
                    alt={section.title_text}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none"
                    }}
                  />
                </motion.div>
              ) : (
                <div className="mb-4 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border border-gray-200">
                  <div className="text-center">
                    <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                    <p className="text-sm text-gray-500">No background image</p>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Title</p>
                  <p className="text-gray-900 font-medium">{section.title_text || "No title"}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Subtitle</p>
                  <p className="text-gray-700">{section.subtitle_text || "No subtitle"}</p>
                </div>
                {section.button_text && (
                  <div>
                    <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Button</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-md text-sm font-medium">
                        {section.button_text}
                      </span>
                      {section.button_link && (
                        <a
                          href={section.button_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedSection(section)
                    setIsEditModalOpen(true)
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedSection(section)
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
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {pagination.from} to {pagination.to} of {pagination.total} sections
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pagination.last_page}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <LandingSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        isLoading={isSaving}
      />

      <LandingSectionModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedSection(null)
        }}
        onSave={handleEdit}
        section={selectedSection}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedSection(null)
        }}
        onConfirm={handleDelete}
        itemName={selectedSection?.title_text}
        title="Delete Landing Section"
      />
    </div>
  )
}
