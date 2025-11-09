import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { Tag, Save, X } from "lucide-react"

export function CategoryModal({ isOpen, onClose, onSave, category = null, isLoading = false }) {
  const [formData, setFormData] = useState({ name: "" })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (category) {
      setFormData({ name: category.name || "" })
    } else {
      setFormData({ name: "" })
    }
    setErrors({})
  }, [category, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
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
      title={category ? "Update Category" : "Add Category"}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Tag className="text-orange-600" size={18} />
            Category Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: "" })
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.name 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            placeholder="Enter category name"
            disabled={isLoading}
          />
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.name}
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
            {isLoading ? "Saving..." : category ? "Update Category" : "Add Category"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
