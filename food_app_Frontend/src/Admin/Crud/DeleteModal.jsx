import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { AlertTriangle, X, Trash2 } from "lucide-react"

export function DeleteModal({ isOpen, onClose, onConfirm, title, message, itemName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title || "Confirm Deletion"} size="sm">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-start gap-4 p-5 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border-2 border-red-200"
        >
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-2">Warning: This action cannot be undone</h3>
            <p className="text-red-800 leading-relaxed">
              {message || `Are you sure you want to delete "${itemName}"? This action is permanent and cannot be reversed.`}
            </p>
          </div>
        </motion.div>

        <div className="flex gap-3 justify-end pt-2">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition font-medium shadow-sm"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={onConfirm}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition font-medium flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Trash2 size={18} />
            Delete
          </motion.button>
        </div>
      </div>
    </Modal>
  )
}
