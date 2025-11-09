import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Instagram, Facebook, Twitter, Mail, Phone, Image as ImageIcon, ExternalLink, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { SocialMediaModal } from "../Crud/SocialMediaModal"
import { DeleteModal } from "../Crud/DeleteModal"
import adminSocialMediaService from "../../lib/services/back/adminSocialMediaService"

export function SocialMediaPage() {
  const [socialMedia, setSocialMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadSocialMedia()
  }, [currentPage])

  const loadSocialMedia = async () => {
    try {
      setLoading(true)
      const response = await adminSocialMediaService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setSocialMedia(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading social media:", err)
      setError("Failed to load social media")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminSocialMediaService.create(formData)
      await loadSocialMedia()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding social media:", err)
      alert("Failed to add social media. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminSocialMediaService.update(selectedSocialMedia.id, formData)
      await loadSocialMedia()
      setIsEditModalOpen(false)
      setSelectedSocialMedia(null)
    } catch (err) {
      console.error("Error updating social media:", err)
      alert("Failed to update social media. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminSocialMediaService.remove(selectedSocialMedia.id)
      await loadSocialMedia()
      setIsDeleteModalOpen(false)
      setSelectedSocialMedia(null)
    } catch (err) {
      console.error("Error deleting social media:", err)
      alert("Failed to delete social media. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading && socialMedia.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading social media...</div>
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
          <h1 className="text-3xl font-bold text-gray-900">Social Media</h1>
          <p className="text-gray-600 mt-1">Manage your social media links and contact information</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Social Media
        </button>
      </motion.div>

      {/* Empty State */}
      {!loading && socialMedia.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <Share2 className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Social Media Added</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first social media account</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
          >
            <Plus size={20} />
            Add Social Media
          </button>
        </motion.div>
      )}

      {/* Social Media Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {socialMedia.map((sm, index) => (
          <motion.div
            key={sm.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 px-6 py-4 border-b border-orange-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {sm.logo ? (
                    <div className="w-16 h-16 bg-white rounded-lg p-2 shadow-sm border border-orange-200">
                      <img
                        src={sm.logo}
                        alt="Logo"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none"
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                      <Share2 className="text-white" size={32} />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">Social Media #{sm.id}</h3>
                    <p className="text-sm text-gray-600">Contact & Links</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedSocialMedia(sm)
                      setIsEditModalOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSocialMedia(sm)
                      setIsDeleteModalOpen(true)
                    }}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-4">
              {/* Social Media Links */}
              <div className="space-y-3">
                {sm.instagram && (
                  <motion.a
                    href={sm.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200 hover:border-pink-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Instagram className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-pink-700 uppercase tracking-wide">Instagram</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-pink-600 transition">
                        {sm.instagram}
                      </p>
                    </div>
                    <ExternalLink className="text-pink-600 opacity-0 group-hover:opacity-100 transition" size={16} />
                  </motion.a>
                )}

                {sm.facebook && (
                  <motion.a
                    href={sm.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 hover:border-blue-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Facebook className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Facebook</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-blue-600 transition">
                        {sm.facebook}
                      </p>
                    </div>
                    <ExternalLink className="text-blue-600 opacity-0 group-hover:opacity-100 transition" size={16} />
                  </motion.a>
                )}

                {sm.x && (
                  <motion.a
                    href={sm.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:border-gray-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                      <Twitter className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Twitter / X</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-gray-900 transition">
                        {sm.x}
                      </p>
                    </div>
                    <ExternalLink className="text-gray-600 opacity-0 group-hover:opacity-100 transition" size={16} />
                  </motion.a>
                )}

                {sm.tiktok && (
                  <motion.a
                    href={sm.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200 hover:border-gray-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center shadow-sm">
                      <Share2 className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">TikTok</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-gray-900 transition">
                        {sm.tiktok}
                      </p>
                    </div>
                    <ExternalLink className="text-gray-600 opacity-0 group-hover:opacity-100 transition" size={16} />
                  </motion.a>
                )}

                {sm.email && (
                  <motion.a
                    href={`mailto:${sm.email}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200 hover:border-orange-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">Email</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-orange-600 transition">
                        {sm.email}
                      </p>
                    </div>
                  </motion.a>
                )}

                {sm.phone && (
                  <motion.a
                    href={`tel:${sm.phone}`}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200 hover:border-green-400 transition group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">Phone</p>
                      <p className="text-sm text-gray-700 truncate group-hover:text-green-600 transition">
                        {sm.phone}
                      </p>
                    </div>
                  </motion.a>
                )}
              </div>

              {/* Local Images */}
              {sm.urls_for_local && sm.urls_for_local.length > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <ImageIcon className="text-orange-600" size={18} />
                    Local Images ({sm.urls_for_local.length})
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {sm.urls_for_local.slice(0, 6).map((url, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 hover:border-orange-400 transition"
                      >
                        <img
                          src={url}
                          alt={`Local ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none"
                            e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gray-100 flex items-center justify-center"><ImageIcon class="text-gray-400" size={24} /></div>'
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.last_page > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {pagination.from} to {pagination.to} of {pagination.total} social media
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
      <SocialMediaModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        isLoading={isSaving}
      />

      <SocialMediaModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedSocialMedia(null)
        }}
        onSave={handleEdit}
        socialMedia={selectedSocialMedia}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedSocialMedia(null)
        }}
        onConfirm={handleDelete}
        itemName="Social Media"
        title="Delete Social Media"
      />
    </div>
  )
}
