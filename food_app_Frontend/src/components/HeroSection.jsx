import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/herro.png')`,
        }}
      >
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Left Column - Text Content */}
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title - 4 words */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-700 drop-shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Delicious Food Delivered Fast
            </motion.h1>

            {/* Description - 7 words */}
            <motion.p 
              className="text-lg sm:text-xl mb-8 text-gray-600 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Order fresh meals from your favorite restaurants today.
            </motion.p>

            {/* Two Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/menu">
                <motion.button 
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition flex items-center gap-2 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Order Now
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <a href="#featured">
                <motion.button 
                  className="border-2 border-gray-600 px-8 py-4 text-lg font-semibold rounded-lg bg-transparent text-gray-700 transition shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(75, 85, 99, 0.1)', borderColor: '#4b5563' }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Menu
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
