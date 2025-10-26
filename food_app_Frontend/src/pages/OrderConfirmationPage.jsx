"use client"

import { Link } from "react-router-dom"
import { CheckCircle, Clock, MapPin, Phone } from "lucide-react"

export function OrderConfirmationPage() {
  // In a real app, this would come from a database or URL params
  const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase()
  const estimatedDelivery = new Date(Date.now() + 30 * 60000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 text-lg">Thank you for your order. Your food is being prepared.</p>
        </div>

        {/* Order Details */}
        <div className="p-8 mb-8 rounded-lg border border-gray-200 bg-white">
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <p className="text-gray-600 text-sm mb-2">Order Number</p>
              <p className="text-2xl font-bold text-gray-900">{orderId}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-2">Order Total</p>
              <p className="text-2xl font-bold text-orange-600">$45.97</p>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Estimated Delivery</h3>
                <p className="text-gray-600">Approximately {estimatedDelivery}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <MapPin className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Delivery Address</h3>
                <p className="text-gray-600">123 Main Street, Apt 4B</p>
                <p className="text-gray-600">New York, NY 10001</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Phone className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Contact Number</h3>
                <p className="text-gray-600">(555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="p-8 mb-8 rounded-lg border border-gray-200 bg-white">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Status</h2>
          <div className="space-y-4">
            {[
              { status: "Order Confirmed", completed: true },
              { status: "Preparing Your Food", completed: true },
              { status: "Out for Delivery", completed: false },
              { status: "Delivered", completed: false },
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    step.completed ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.completed ? "✓" : index + 1}
                </div>
                <span className={step.completed ? "text-gray-900 font-semibold" : "text-gray-600"}>{step.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/menu" className="flex-1">
            <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent py-3 rounded-lg transition font-semibold">
              Continue Shopping
            </button>
          </Link>
          <Link to="/admin" className="flex-1">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg transition">
              Track Order
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
