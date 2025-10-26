import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, Search, Clock, Truck } from "lucide-react"

const popularLocations = [
  { id: 1, name: "New York, NY", deliveryTime: "25-35 min", restaurants: "500+" },
  { id: 2, name: "Los Angeles, CA", deliveryTime: "30-40 min", restaurants: "400+" },
  { id: 3, name: "Chicago, IL", deliveryTime: "20-30 min", restaurants: "350+" },
  { id: 4, name: "Houston, TX", deliveryTime: "25-35 min", restaurants: "300+" },
  { id: 5, name: "Phoenix, AZ", deliveryTime: "30-40 min", restaurants: "250+" },
  { id: 6, name: "Philadelphia, PA", deliveryTime: "25-35 min", restaurants: "200+" }
]

export function LocationSelector({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(popularLocations[0])

  const filteredLocations = popularLocations.filter(location =>
    location.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Select Location</h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close location selector"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                autoFocus
              />
            </div>

            {/* Current Location */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Location</h3>
              <motion.div
                className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{selectedLocation.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{selectedLocation.deliveryTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Truck className="w-4 h-4" />
                        <span>{selectedLocation.restaurants} restaurants</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              </motion.div>
            </div>

            {/* Popular Locations */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Popular Locations</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {filteredLocations.map((location, index) => (
                  <motion.button
                    key={location.id}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition text-left"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{location.name}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{location.deliveryTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>{location.restaurants}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedLocation.id === location.id && (
                      <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
