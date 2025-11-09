import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { Star, MessageSquare, User, Save, X } from "lucide-react"

export function ReviewModal({ isOpen, onClose, onSave, review = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    nom_user: "",
    des: "",
    stars: 5,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (review) {
      setFormData({
        nom_user: review.nom_user || "",
        des: review.des || "",
        stars: review.stars || 5,
      })
    } else {
      setFormData({
        nom_user: "",
        des: "",
        stars: 5,
      })
    }
    setErrors({})
  }, [review, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.nom_user.trim()) {
      newErrors.nom_user = "User name is required"
    }
    if (!formData.des.trim()) {
      newErrors.des = "Description is required"
    }
    if (formData.stars < 1 || formData.stars > 5) {
      newErrors.stars = "Stars must be between 1 and 5"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSave(formData)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={review ? "Update Review" : "Add Review"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="text-orange-600" size={18} />
            User Name *
          </label>
          <input
            type="text"
            value={formData.nom_user}
            onChange={(e) => {
              setFormData({ ...formData, nom_user: e.target.value })
              if (errors.nom_user) setErrors({ ...errors, nom_user: "" })
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.nom_user 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            placeholder="Enter user name"
            disabled={isLoading}
          />
          {errors.nom_user && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.nom_user}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MessageSquare className="text-orange-600" size={18} />
            Description *
          </label>
          <textarea
            value={formData.des}
            onChange={(e) => {
              setFormData({ ...formData, des: e.target.value })
              if (errors.des) setErrors({ ...errors, des: "" })
            }}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none ${
              errors.des 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            placeholder="Enter review description"
            disabled={isLoading}
          />
          {errors.des && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.des}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Star className="text-orange-600" size={18} />
            Rating *
          </label>
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => setFormData({ ...formData, stars: star })}
                  disabled={isLoading}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="focus:outline-none transition"
                >
                  <Star
                    size={36}
                    className={`transition ${
                      star <= formData.stars
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <div className="flex-1">
              <span className="text-lg font-bold text-gray-700">
                {formData.stars} {formData.stars === 1 ? "Star" : "Stars"}
              </span>
            </div>
          </div>
          {errors.stars && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.stars}
            </motion.p>
          )}
        </motion.div>

        <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
          <motion.button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium disabled:opacity-50 shadow-sm"
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 rounded-lg transition font-medium disabled:opacity-50 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Save size={18} />
            {isLoading ? "Saving..." : review ? "Update Review" : "Add Review"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
