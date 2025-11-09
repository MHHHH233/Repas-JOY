import { Modal } from "./Modal"
import { motion } from "framer-motion"
import { Info, Calendar, User, Package, MapPin, Star, Image as ImageIcon } from "lucide-react"

export function ViewModal({ isOpen, onClose, title, data, fields = [] }) {
  if (!data) return null

  // If fields are not provided, show all data
  const displayFields = fields.length > 0 
    ? fields 
    : Object.keys(data).filter(key => key !== 'id' && !key.includes('_at'))

  // Icon mapping for different field types
  const getFieldIcon = (key) => {
    const keyLower = key.toLowerCase()
    if (keyLower.includes('date') || keyLower.includes('created') || keyLower.includes('updated')) {
      return Calendar
    }
    if (keyLower.includes('user') || keyLower.includes('username') || keyLower.includes('name')) {
      return User
    }
    if (keyLower.includes('image') || keyLower.includes('img') || keyLower.includes('logo')) {
      return ImageIcon
    }
    if (keyLower.includes('address') || keyLower.includes('location')) {
      return MapPin
    }
    if (keyLower.includes('star') || keyLower.includes('rating')) {
      return Star
    }
    if (keyLower.includes('category') || keyLower.includes('repas') || keyLower.includes('qte')) {
      return Package
    }
    return Info
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title || "View Details"}
      size="xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayFields.map((field, index) => {
          const fieldLabel = typeof field === 'object' ? field.label : field
          const fieldKey = typeof field === 'object' ? field.key : field
          const fieldFormatter = typeof field === 'object' ? field.formatter : null
          
          const value = fieldKey.split('.').reduce((obj, key) => obj?.[key], data)
          const Icon = getFieldIcon(fieldKey)
          
          let displayValue = value
          
          if (fieldFormatter && typeof fieldFormatter === 'function') {
            displayValue = fieldFormatter(value)
          } else if (value === null || value === undefined) {
            displayValue = "-"
          } else if (typeof value === 'boolean') {
            displayValue = value ? "Yes" : "No"
          } else if (Array.isArray(value)) {
            displayValue = value.length > 0 ? value.join(", ") : "None"
          } else if (typeof value === 'object') {
            displayValue = JSON.stringify(value, null, 2)
          } else {
            displayValue = String(value)
          }

          const isBoolean = typeof value === 'boolean'
          const isEmpty = displayValue === "-" || displayValue === "None"
          const isImageField = fieldKey.includes('image') || fieldKey.includes('img') || fieldKey.includes('url')
          const isFullWidth = isImageField && (Array.isArray(value) && value.length > 0 || (typeof value === 'string' && value.startsWith('http')))

          return (
            <motion.div
              key={fieldKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3 }}
              className={`bg-gradient-to-r from-orange-50 to-white rounded-lg border border-orange-100 p-4 hover:shadow-md transition-shadow ${
                isFullWidth ? "md:col-span-2" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <Icon className="text-orange-600" size={20} />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-orange-700 text-xs uppercase tracking-wide">
                      {fieldLabel || fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                  </div>
                  <div>
                    {isBoolean ? (
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        value 
                          ? "bg-green-100 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {displayValue}
                      </span>
                    ) : Array.isArray(value) && value.length > 0 && !isImageField ? (
                      <div className="flex flex-wrap gap-2">
                        {value.map((item, idx) => (
                          <span 
                            key={idx}
                            className="inline-flex items-center px-2.5 py-1 rounded-md bg-orange-100 text-orange-800 text-sm font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    ) : isImageField ? (
                      <div className="space-y-2">
                        {Array.isArray(value) && value.length > 0 ? (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {value.slice(0, 6).map((url, idx) => (
                              <div key={idx} className="relative group">
                                <img 
                                  src={url} 
                                  alt={`Image ${idx + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border border-orange-200 hover:border-orange-400 transition cursor-pointer"
                                  onError={(e) => {
                                    e.target.style.display = "none"
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        ) : typeof value === 'string' && value.startsWith('http') ? (
                          <img 
                            src={value} 
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg border border-orange-200"
                            onError={(e) => {
                              e.target.style.display = "none"
                            }}
                          />
                        ) : (
                          <p className="text-gray-600 italic text-sm">{displayValue}</p>
                        )}
                      </div>
                    ) : (
                      <p className={`text-gray-900 font-medium text-sm ${isEmpty ? "text-gray-400 italic" : ""}`}>
                        {displayValue}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Modal>
  )
}

