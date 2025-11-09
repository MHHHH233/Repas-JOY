import { useState, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, Star, MessageSquare, User, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { ReviewModal } from "../Crud/ReviewModal"
import { DeleteModal } from "../Crud/DeleteModal"
import adminReviewsService from "../../lib/services/back/adminReviewsService"

export function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState(null)

  useEffect(() => {
    loadReviews()
  }, [currentPage])

  const loadReviews = async () => {
    try {
      setLoading(true)
      const response = await adminReviewsService.list({ per_page: 10, page: currentPage })
      if (response.success && response.data) {
        setReviews(response.data.data || [])
        setPagination(response.data)
      }
    } catch (err) {
      console.error("Error loading reviews:", err)
      setError("Failed to load reviews")
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (formData) => {
    try {
      setIsSaving(true)
      await adminReviewsService.create(formData)
      await loadReviews()
      setIsAddModalOpen(false)
    } catch (err) {
      console.error("Error adding review:", err)
      alert("Failed to add review. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleEdit = async (formData) => {
    try {
      setIsSaving(true)
      await adminReviewsService.update(selectedReview.id, formData)
      await loadReviews()
      setIsEditModalOpen(false)
      setSelectedReview(null)
    } catch (err) {
      console.error("Error updating review:", err)
      alert("Failed to update review. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsSaving(true)
      await adminReviewsService.remove(selectedReview.id)
      await loadReviews()
      setIsDeleteModalOpen(false)
      setSelectedReview(null)
    } catch (err) {
      console.error("Error deleting review:", err)
      alert("Failed to delete review. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const filteredReviews = reviews.filter(r =>
    r.nom_user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.des?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading && reviews.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading reviews...</div>
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

  const getRatingColor = (stars) => {
    if (stars >= 4) return "from-green-500 to-emerald-600"
    if (stars >= 3) return "from-yellow-500 to-amber-600"
    return "from-red-500 to-rose-600"
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
          <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and ratings</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition shadow-md hover:shadow-lg"
        >
          <Plus size={20} />
          Add Review
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
          placeholder="Search reviews by name or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
        />
      </motion.div>

      {/* Empty State */}
      {!loading && filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center"
        >
          <MessageSquare className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "No reviews found" : "No Reviews Added"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Get started by adding your first review"}
          </p>
          {!searchTerm && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition mx-auto"
            >
              <Plus size={20} />
              Add Review
            </button>
          )}
        </motion.div>
      )}

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${getRatingColor(review.stars)} px-6 py-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{review.nom_user || "Anonymous"}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="text-white/80" size={14} />
                      <p className="text-white/80 text-sm">
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "No date"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.stars
                          ? "fill-yellow-300 text-yellow-300"
                          : "text-white/30"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="text-orange-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700 leading-relaxed">{review.des || "No description provided"}</p>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="mb-4 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    review.stars >= 4
                      ? "bg-green-100 text-green-700"
                      : review.stars >= 3
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {review.stars} {review.stars === 1 ? "Star" : "Stars"}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setSelectedReview(review)
                    setIsEditModalOpen(true)
                  }}
                  className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 rounded-lg flex items-center justify-center gap-2 transition font-medium"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedReview(review)
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
            Showing {pagination.from} to {pagination.to} of {pagination.total} reviews
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
      <ReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAdd}
        isLoading={isSaving}
      />

      <ReviewModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setSelectedReview(null)
        }}
        onSave={handleEdit}
        review={selectedReview}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedReview(null)
        }}
        onConfirm={handleDelete}
        itemName={`Review by ${selectedReview?.nom_user}`}
        title="Delete Review"
      />
    </div>
  )
}
