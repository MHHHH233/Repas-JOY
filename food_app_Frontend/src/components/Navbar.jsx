"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Menu, X, MapPin, User, Bell } from "lucide-react"
import { useCart } from "../context/CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { LocationSelector } from "./LocationSelector"
import Logo from "../assets/Logo-.png"

export function Navbar() {
  const { cart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <nav id="navigation" className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" role="navigation" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={Logo} alt="Repas Joy Logo" className="w-full h-full object-contain" />
              </motion.div>
              <span className="font-bold text-xl text-gray-900">Repas Joy</span>
            </Link>

            {/* Location Selector */}
            <motion.button 
              className="hidden md:flex items-center gap-2 text-gray-600 hover:text-orange-600 transition cursor-pointer"
              onClick={() => setShowLocationModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">New York, NY</span>
            </motion.button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex gap-8">
              <Link to="/" className="text-gray-600 hover:text-orange-600 transition font-medium">
                Food
              </Link>
              <Link to="/groceries" className="text-gray-600 hover:text-orange-600 transition font-medium">
                Groceries
              </Link>
              <Link to="/alcohol" className="text-gray-600 hover:text-orange-600 transition font-medium">
                Alcohol
              </Link>
              <Link to="/admin" className="text-gray-600 hover:text-orange-600 transition font-medium">
                Admin
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Sign In / Sign Up Links */}
              <div className="hidden md:flex items-center gap-2">
                <Link 
                  to="/signin" 
                  className="text-gray-600 hover:text-orange-600 transition font-medium text-sm"
                >
                  Sign In
                </Link>
                <span className="text-gray-300">|</span>
                <Link 
                  to="/signup" 
                  className="text-gray-600 hover:text-orange-600 transition font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>

              {/* DashPass CTA */}
              <motion.button 
                className="hidden md:block bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get DashPass
              </motion.button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
                <Bell className="w-5 h-5 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User Account */}
              <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                <User className="w-5 h-5 text-gray-700" />
              </button>

              {/* Cart Button */}
              <Link to="/cart">
                <motion.button 
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition border border-gray-300 bg-transparent"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {itemCount > 0 && (
                    <motion.span 
                      className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {itemCount}
                    </motion.span>
                  )}
                </motion.button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                className="lg:hidden border-t border-gray-200 py-4 space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/"
                  className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Food
                </Link>
                <Link
                  to="/groceries"
                  className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Groceries
                </Link>
                <Link
                  to="/alcohol"
                  className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Alcohol
                </Link>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition"
                  onClick={() => setIsOpen(false)}
                >
                  Admin
                </Link>
                <div className="px-4 py-2 space-y-2">
                  <Link
                    to="/signin"
                    className="block w-full text-center text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded transition py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <motion.button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get DashPass
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
      
      {/* Location Selector Modal */}
      <LocationSelector 
        isOpen={showLocationModal} 
        onClose={() => setShowLocationModal(false)} 
      />
    </>
  )
}
