"use client"

import { Trash2, Plus, Minus } from "lucide-react"
import { useCart } from "../context/CartContext"

export function CartItemRow({ item }) {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <div className="flex gap-4 pb-4 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.menuItem.image || "/placeholder.svg"}
          alt={item.menuItem.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900">{item.menuItem.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{item.menuItem.category}</p>
        <p className="text-lg font-bold text-orange-600">${item.menuItem.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => updateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
          className="p-1 hover:bg-gray-200 rounded transition"
        >
          <Minus className="w-4 h-4 text-gray-600" />
        </button>
        <span className="w-8 text-center font-semibold text-gray-900">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
          className="p-1 hover:bg-gray-200 rounded transition"
        >
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Total and Remove */}
      <div className="text-right">
        <p className="font-bold text-gray-900 mb-2">${(item.menuItem.price * item.quantity).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item.menuItem.id)}
          className="p-2 hover:bg-red-50 rounded transition text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
