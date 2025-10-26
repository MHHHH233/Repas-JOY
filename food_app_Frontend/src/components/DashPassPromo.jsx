import { motion } from "framer-motion"
import { Crown, Clock, Truck, Star } from "lucide-react"

export function DashPassPromo() {
  return (
    <motion.section 
      className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Crown className="w-5 h-5" />
            <span className="font-semibold">DashPass</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Get 30 Days Free
          </motion.h2>
          
          <motion.p 
            className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Unlimited free delivery on orders over $12. Cancel anytime.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Free Delivery</h3>
            <p className="text-orange-100">On orders over $12</p>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Faster Delivery</h3>
            <p className="text-orange-100">Priority delivery times</p>
          </motion.div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Exclusive Offers</h3>
            <p className="text-orange-100">Member-only deals</p>
          </motion.div>
        </div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.button 
            className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
          </motion.button>
          <p className="text-orange-100 text-sm mt-4">
            Then $9.99/month. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}
