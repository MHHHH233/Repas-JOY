import { useState, useEffect } from "react"
import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { ShoppingCart, User, UtensilsCrossed, MapPin, UserCircle, Save, X, Sparkles } from "lucide-react"

export function CommandeModal({ isOpen, onClose, onSave, commande = null, users = [], repas = [], isLoading = false }) {
  const [formData, setFormData] = useState({
    id_user: "",
    id_repas: "",
    address: "",
    name: "",
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (commande) {
      setFormData({
        id_user: commande.id_user || "",
        id_repas: commande.id_repas || "",
        address: commande.address || "",
        name: commande.name || "",
      })
    } else {
      setFormData({
        id_user: "",
        id_repas: "",
        address: "",
        name: "",
      })
    }
    setErrors({})
  }, [commande, isOpen])

  const handleUserChange = (userId) => {
    const selectedUser = users.find((u) => u.id === parseInt(userId))
    if (selectedUser && !commande) {
      setFormData({
        ...formData,
        id_user: userId,
        name: selectedUser.username || "",
        address: selectedUser.address || "",
      })
    } else if (!userId && !commande) {
      // Clear user selection - allow manual entry
      setFormData({
        ...formData,
        id_user: "",
        // Keep name and address as they might be manually entered
      })
    } else {
      setFormData({
        ...formData,
        id_user: userId,
      })
    }
    if (errors.id_user) setErrors({ ...errors, id_user: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    // User is optional - no validation needed
    if (!formData.id_repas) {
      newErrors.id_repas = "Repas is required"
    }
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Prepare form data - only include id_user if it's provided
    const submitData = {
      id_repas: formData.id_repas,
      name: formData.name.trim(),
      address: formData.address.trim(),
    }
    
    // Only include id_user if a user was selected
    if (formData.id_user) {
      submitData.id_user = formData.id_user
    }

    onSave(submitData)
  }

  const selectedUser = users.find((u) => u.id === parseInt(formData.id_user))
  const selectedRepas = repas.find((r) => r.id === parseInt(formData.id_repas))

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={commande ? "Update Commande" : "Add Commande"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <User className="text-orange-600" size={18} />
            User <span className="text-gray-500 text-xs font-normal">(Optional - for walk-in customers)</span>
          </label>
          <select
            value={formData.id_user}
            onChange={(e) => handleUserChange(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.id_user 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            disabled={isLoading}
          >
            <option value="">Select a user (or leave empty for walk-in customer)</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
          {errors.id_user && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.id_user}
            </motion.p>
          )}
          {selectedUser && !commande && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2"
            >
              <Sparkles className="text-green-600" size={16} />
              <span className="text-sm text-green-700">User info auto-filled. You can edit name and address if needed.</span>
            </motion.div>
          )}
          {!formData.id_user && !commande && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2"
            >
              <User className="text-blue-600" size={16} />
              <span className="text-sm text-blue-700">No user selected. Please enter customer name and address manually.</span>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <UtensilsCrossed className="text-orange-600" size={18} />
            Repas *
          </label>
          <select
            value={formData.id_repas}
            onChange={(e) => {
              setFormData({ ...formData, id_repas: e.target.value })
              if (errors.id_repas) setErrors({ ...errors, id_repas: "" })
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition ${
              errors.id_repas 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            disabled={isLoading}
          >
            <option value="">Select a repas</option>
            {repas.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          {errors.id_repas && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.id_repas}
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <UserCircle className="text-orange-600" size={18} />
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
            placeholder="Enter customer name"
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
          transition={{ delay: 0.35 }}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <MapPin className="text-orange-600" size={18} />
            Address *
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => {
              setFormData({ ...formData, address: e.target.value })
              if (errors.address) setErrors({ ...errors, address: "" })
            }}
            rows={3}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition resize-none ${
              errors.address 
                ? "border-red-500 bg-red-50" 
                : "border-gray-300 bg-white hover:border-orange-300"
            }`}
            placeholder="Enter delivery address"
            disabled={isLoading}
          />
          {errors.address && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-600 flex items-center gap-1"
            >
              <X size={14} />
              {errors.address}
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
            <ShoppingCart size={18} />
            {isLoading ? "Saving..." : commande ? "Update Commande" : "Add Commande"}
          </motion.button>
        </div>
      </form>
    </Modal>
  )
}
