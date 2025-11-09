import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { Image as ImageIcon, Type, FileText, MousePointerClick, Link as LinkIcon, ToggleLeft, ToggleRight, Save, X, ExternalLink } from "lucide-react"

export function LandingSectionModal({ isOpen, onClose, onSave, section = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    background_img: "",
    title_text: "",
    subtitle_text: "",
    button_text: "",
    button_link: "",
    is_active: true,
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (section) {
      setFormData({
        background_img: section.background_img || "",
        title_text: section.title_text || "",
        subtitle_text: section.subtitle_text || "",
        button_text: section.button_text || "",
        button_link: section.button_link || "",
        is_active: section.is_active !== undefined ? section.is_active : true,
      })
    } else {
      setFormData({
        background_img: "",
        title_text: "",
        subtitle_text: "",
        button_text: "",
        button_link: "",
        is_active: true,
      })
    }
    setErrors({})
  }, [section, isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.title_text.trim()) {
      newErrors.title_text = "Title is required"
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
      title={section ? "Update Landing Section" : "Add Landing Section"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <ImageIcon className="text-orange-600" size={18} />
            Background Image URL
          </label>
          <input
            type="url"
            value={formData.background_img}
            onChange={(e) => setFormData({ ...formData, background_img: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
            placeholder="https://example.com/image.jpg"
            disabled={isLoading}
          />
          {formData.background_img && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                src={formData.background_img}
                alt="Preview"
                className="w-full h-32 object-cover"
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <Type className="text-orange-600" size={18} />
            Title Text *
          </label>
          <input
            type="text"
            value={formData.title_text}
            onChange={(e) => {
              setFormData({ ...formData, title_text: e.target.value })
              if (errors.title_text) setErrors({ ...errors, title_text: "" })
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.title_text 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            placeholder="Enter title text"
            disabled={isLoading}
          />
          {errors.title_text && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.title_text}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <FileText className="text-orange-600" size={18} />
            Subtitle Text
          </label>
          <input
            type="text"
            value={formData.subtitle_text}
            onChange={(e) => setFormData({ ...formData, subtitle_text: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
            placeholder="Enter subtitle text"
            disabled={isLoading}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <MousePointerClick className="text-orange-600" size={18} />
              Button Text
            </label>
            <input
              type="text"
              value={formData.button_text}
              onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
              placeholder="e.g., Order Now"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <LinkIcon className="text-orange-600" size={18} />
              Button Link
            </label>
            <div className="relative">
              <input
                type="url"
                value={formData.button_link}
                onChange={(e) => setFormData({ ...formData, button_link: e.target.value })}
                className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
                placeholder="https://example.com"
                disabled={isLoading}
              />
              {formData.button_link && (
                <a
                  href={formData.button_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-orange-600 hover:text-orange-700"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg border border-orange-200"
        >
          <label className="flex items-center gap-3 cursor-pointer group">
            {formData.is_active ? (
              <ToggleRight className="text-orange-600" size={28} />
            ) : (
              <ToggleLeft className="text-gray-400" size={28} />
            )}
            <div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-orange-700 transition">
                Active Section
              </span>
              <p className="text-xs text-gray-600 mt-0.5">
                {formData.is_active ? "This section will be displayed" : "This section will be hidden"}
              </p>
            </div>
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="hidden"
              disabled={isLoading}
            />
          </label>
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
            {isLoading ? "Saving..." : section ? "Update Section" : "Add Section"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
