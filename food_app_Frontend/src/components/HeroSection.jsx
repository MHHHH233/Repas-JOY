import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Star, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-orange-50 to-amber-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 right-10 w-96 h-96 bg-orange-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Main heading */}
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 text-balance"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Delicious Food,
                <motion.span 
                  className="text-orange-600 block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  Delivered Fast
                </motion.span>
              </motion.h1>

              {/* Subheading */}
              <motion.p 
                className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Order from your favorite restaurants and get fresh, hot meals delivered to your door in minutes.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/menu">
                  <motion.button 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Order Now
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <a href="#featured">
                  <motion.button 
                    className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold rounded-lg bg-transparent transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Menu
                  </motion.button>
                </a>
              </motion.div>

              {/* Trust indicators */}
              <motion.div 
                className="grid grid-cols-3 gap-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-6 h-6 text-orange-600" />
                    <div className="text-3xl font-bold text-orange-600">30min</div>
                  </div>
                  <p className="text-gray-600 text-sm">Average Delivery</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="w-6 h-6 text-orange-600" />
                    <div className="text-3xl font-bold text-orange-600">4.8★</div>
                  </div>
                  <p className="text-gray-600 text-sm">Customer Rating</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-6 h-6 text-orange-600" />
                    <div className="text-3xl font-bold text-orange-600">500+</div>
                  </div>
                  <p className="text-gray-600 text-sm">Restaurants</p>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <motion.div 
                className="relative z-10"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <img
                  src="/hero-food-delivery.png"
                  alt="Food delivery illustration"
                  className="w-full h-auto max-w-lg mx-auto"
                />
              </motion.div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute top-10 -left-4 bg-white rounded-full p-3 shadow-lg"
                animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍕</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-20 -right-4 bg-white rounded-full p-3 shadow-lg"
                animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍔</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
