import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { UtensilsCrossed, FileText, Layers, Package, Image as ImageIcon, Plus, X, Save, Eye, EyeOff, CheckCircle2 } from "lucide-react"

export function RepasModal({ isOpen, onClose, onSave, repas = null, categories = [], isLoading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    vegan: false,
    onView: true,
    qte: 0,
    id_category: "",
    imgs_urls: [],
  })
  const [errors, setErrors] = useState({})
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {
    if (repas) {
      setFormData({
        name: repas.name || "",
        description: repas.description || "",
        vegan: repas.vegan || false,
        onView: repas.onView !== undefined ? repas.onView : true,
        qte: repas.qte || 0,
        id_category: repas.id_category || "",
        imgs_urls: repas.imgs_urls || [],
      })
    } else {
      setFormData({
        name: "",
        description: "",
        vegan: false,
        onView: true,
        qte: 0,
        id_category: "",
        imgs_urls: [],
      })
    }
    setImageUrl("")
    setErrors({})
  }, [repas, isOpen])

  const handleAddImage = () => {
    if (imageUrl.trim() && !formData.imgs_urls.includes(imageUrl.trim())) {
      setFormData({
        ...formData,
        imgs_urls: [...formData.imgs_urls, imageUrl.trim()],
      })
      setImageUrl("")
    }
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imgs_urls: formData.imgs_urls.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.id_category) {
      newErrors.id_category = "Category is required"
    }
    if (formData.qte < 0) {
      newErrors.qte = "Quantity cannot be negative"
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
      title={repas ? "Update Repas" : "Add Repas"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <UtensilsCrossed className="text-orange-600" size={18} />
              Name *
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
              placeholder="Enter repas name"
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

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="md:col-span-2"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <FileText className="text-orange-600" size={18} />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300 resize-none"
              placeholder="Enter description"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Layers className="text-orange-600" size={18} />
              Category *
            </label>
            <select
              value={formData.id_category}
              onChange={(e) => {
                setFormData({ ...formData, id_category: e.target.value })
                if (errors.id_category) setErrors({ ...errors, id_category: "" })
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
                errors.id_category 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 bg-white hover:border-orange-300"
              }`}
              disabled={isLoading}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.id_category && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <X size={14} />
                {errors.id_category}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Package className="text-orange-600" size={18} />
              Quantity *
            </label>
            <input
              type="number"
              value={formData.qte}
              onChange={(e) => {
                setFormData({ ...formData, qte: parseInt(e.target.value) || 0 })
                if (errors.qte) setErrors({ ...errors, qte: "" })
              }}
              min="0"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
                errors.qte 
                  ? "border-red-500 bg-red-50" 
                  : "border-gray-300 bg-white hover:border-orange-300"
              }`}
              disabled={isLoading}
            />
            {errors.qte && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-red-600 flex items-center gap-1"
              >
                <X size={14} />
                {errors.qte}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 flex items-center gap-6 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
          >
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.vegan}
                  onChange={(e) => setFormData({ ...formData, vegan: e.target.checked })}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  disabled={isLoading}
                />
                {formData.vegan && (
                  <CheckCircle2 className="absolute -top-0.5 -left-0.5 text-orange-600" size={22} />
                )}
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700 transition">
                Vegan
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={formData.onView}
                  onChange={(e) => setFormData({ ...formData, onView: e.target.checked })}
                  className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                  disabled={isLoading}
                />
                {formData.onView && (
                  <CheckCircle2 className="absolute -top-0.5 -left-0.5 text-orange-600" size={22} />
                )}
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700 transition">
                Visible
              </span>
            </label>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="md:col-span-2"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="text-orange-600" size={18} />
              Image URLs
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddImage()
                  }
                }}
              />
              <motion.button
                type="button"
                onClick={handleAddImage}
                disabled={isLoading || !imageUrl.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
              >
                <Plus size={18} />
                Add
              </motion.button>
            </div>
            {formData.imgs_urls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formData.imgs_urls.map((url, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                    <div className="hidden w-full h-24 bg-gray-100 rounded-lg border border-gray-200 items-center justify-center">
                      <ImageIcon className="text-gray-400" size={24} />
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      disabled={isLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

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
            {isLoading ? "Saving..." : repas ? "Update Repas" : "Add Repas"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
