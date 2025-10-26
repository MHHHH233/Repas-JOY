"use client"

import { useCart } from "../context/CartContext"
import { CartItemRow } from "../components/CartItemRow"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export function CartPage() {
  const { cart, clearCart } = useCart()
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link to="/menu" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 text-lg mb-8">Add some delicious items to get started!</p>
            <Link to="/menu">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg font-semibold rounded-lg transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <Link to="/menu" className="flex items-center gap-2 text-orange-600 hover:text-orange-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg border border-gray-200 bg-white">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItemRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="p-6 sticky top-24 rounded-lg border border-gray-200 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>${(cart.total * 0.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-orange-600">
                  ${(cart.total + 2.99 + cart.total * 0.08).toFixed(2)}
                </span>
              </div>

              <Link to="/checkout" className="w-full block">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 text-lg rounded-lg transition">
                  Proceed to Checkout
                </button>
              </Link>

              <button
                onClick={clearCart}
                className="w-full mt-3 text-gray-700 border border-gray-300 hover:bg-gray-50 bg-transparent py-2 rounded-lg transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
