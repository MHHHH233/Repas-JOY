import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { 
  Image as ImageIcon, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  Share2, 
  Plus, 
  X, 
  Save,
  Trash2 
} from "lucide-react"

export function SocialMediaModal({ isOpen, onClose, onSave, socialMedia = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    logo: "",
    instagram: "",
    facebook: "",
    x: "",
    tiktok: "",
    email: "",
    phone: "",
    urls_for_local: [],
  })
  const [errors, setErrors] = useState({})
  const [localUrl, setLocalUrl] = useState("")

  useEffect(() => {
    if (socialMedia) {
      setFormData({
        logo: socialMedia.logo || "",
        instagram: socialMedia.instagram || "",
        facebook: socialMedia.facebook || "",
        x: socialMedia.x || "",
        tiktok: socialMedia.tiktok || "",
        email: socialMedia.email || "",
        phone: socialMedia.phone || "",
        urls_for_local: socialMedia.urls_for_local || [],
      })
    } else {
      setFormData({
        logo: "",
        instagram: "",
        facebook: "",
        x: "",
        tiktok: "",
        email: "",
        phone: "",
        urls_for_local: [],
      })
    }
    setLocalUrl("")
    setErrors({})
  }, [socialMedia, isOpen])

  const handleAddLocalUrl = () => {
    if (localUrl.trim() && !formData.urls_for_local.includes(localUrl.trim())) {
      setFormData({
        ...formData,
        urls_for_local: [...formData.urls_for_local, localUrl.trim()],
      })
      setLocalUrl("")
    }
  }

  const handleRemoveLocalUrl = (index) => {
    setFormData({
      ...formData,
      urls_for_local: formData.urls_for_local.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={socialMedia ? "Update Social Media" : "Add Social Media"}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="text-orange-600" size={18} />
              Logo URL
            </label>
            <input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
              placeholder="https://example.com/logo.png"
              disabled={isLoading}
            />
            {formData.logo && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={formData.logo}
                  alt="Logo preview"
                  className="w-full h-full object-contain"
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
              <Mail className="text-orange-600" size={18} />
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
              placeholder="contact@example.com"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Phone className="text-orange-600" size={18} />
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
              placeholder="+1234567890"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-200"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Instagram className="text-pink-600" size={18} />
              Instagram
            </label>
            <input
              type="url"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition bg-white hover:border-pink-400"
              placeholder="https://instagram.com/username"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Facebook className="text-blue-600" size={18} />
              Facebook
            </label>
            <input
              type="url"
              value={formData.facebook}
              onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
              className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white hover:border-blue-400"
              placeholder="https://facebook.com/username"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Twitter className="text-gray-700" size={18} />
              X (Twitter)
            </label>
            <input
              type="url"
              value={formData.x}
              onChange={(e) => setFormData({ ...formData, x: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition bg-white hover:border-gray-400"
              placeholder="https://x.com/username"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Share2 className="text-gray-700" size={18} />
              TikTok
            </label>
            <input
              type="url"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition bg-white hover:border-gray-400"
              placeholder="https://tiktok.com/@username"
              disabled={isLoading}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="md:col-span-2"
          >
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <ImageIcon className="text-orange-600" size={18} />
              Local Images URLs
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={localUrl}
                onChange={(e) => setLocalUrl(e.target.value)}
                placeholder="Enter local image URL"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition bg-white hover:border-orange-300"
                disabled={isLoading}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddLocalUrl()
                  }
                }}
              />
              <motion.button
                type="button"
                onClick={handleAddLocalUrl}
                disabled={isLoading || !localUrl.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
              >
                <Plus size={18} />
                Add
              </motion.button>
            </div>
            {formData.urls_for_local.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {formData.urls_for_local.map((url, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <img
                      src={url}
                      alt={`Local ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                    <div className="hidden w-full h-20 bg-gray-100 rounded-lg border border-gray-200 items-center justify-center">
                      <ImageIcon className="text-gray-400" size={20} />
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveLocalUrl(index)}
                      disabled={isLoading}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 size={12} />
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
            {isLoading ? "Saving..." : socialMedia ? "Update Social Media" : "Add Social Media"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
