"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Plus, Minus, Clock, Truck } from "lucide-react"
import { useCart } from "../context/CartContext"

export function MenuItemCard({ item }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // Handle different data structures from API
  const itemData = {
    id: item.id,
    name: item.name || item.nom || "Unnamed Item",
    description: item.description || item.desc || "",
    price: parseFloat(item.price || item.prix || 0),
    image: item.image || item.photo || "/placeholder.svg?height=300&width=300&query=food",
    rating: item.rating || item.note || "4.5",
    category: item.category?.name || item.categorie?.name || item.category_name || "Uncategorized",
    sousCategory: item.sousCategory?.name || item.sous_categorie?.name || item.sous_category_name || "",
  }

  const handleAddToCart = () => {
    addToCart(itemData, quantity)
    setQuantity(1)
  }

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <motion.div 
      className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 bg-white group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
    >
      {/* Image */}
      <div className="aspect-square bg-gray-200 overflow-hidden relative">
        <motion.img
          src={itemData.image}
          alt={itemData.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          whileHover={{ scale: 1.1 }}
          onError={(e) => {
            e.target.src = "/placeholder.svg?height=300&width=300&query=food"
          }}
        />
        <motion.div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
          <span className="text-sm font-semibold text-gray-900">{itemData.rating}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name and Rating */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
            {itemData.name}
          </h3>
        </div>

        {/* Category and Sous-Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm text-gray-500">{itemData.category}</span>
          {itemData.sousCategory && (
            <>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-400">{itemData.sousCategory}</span>
            </>
          )}
        </div>

        {/* Description */}
        {itemData.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {itemData.description}
          </p>
        )}

        {/* Delivery Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">25-35 min</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Truck className="w-4 h-4" />
            <span className="text-sm">Delivery</span>
          </div>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-orange-600">
            ${itemData.price.toFixed(2)}
          </span>
          <motion.div 
            className="flex items-center gap-2 bg-gray-100 rounded-lg p-1"
            whileHover={{ scale: 1.05 }}
          >
            <motion.button
              onClick={handleDecrement}
              className="p-1 hover:bg-gray-200 rounded transition"
              aria-label="Decrease quantity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </motion.button>
            <span className="w-8 text-center font-semibold text-gray-900">{quantity}</span>
            <motion.button
              onClick={handleIncrement}
              className="p-1 hover:bg-gray-200 rounded transition"
              aria-label="Increase quantity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </motion.button>
          </motion.div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          onClick={handleAddToCart}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  )
}