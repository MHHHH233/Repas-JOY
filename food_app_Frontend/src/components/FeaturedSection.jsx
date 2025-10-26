import { motion } from "framer-motion"
import { Star, Clock, Truck } from "lucide-react"

const featuredItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, basil, and tomato sauce",
    price: 12.99,
    rating: 4.8,
    image: "/margherita-pizza.png",
    deliveryTime: "25-35 min",
    restaurant: "Tony's Pizza"
  },
  {
    id: "2",
    name: "Grilled Salmon",
    description: "Fresh salmon with lemon butter sauce",
    price: 18.99,
    rating: 4.9,
    image: "/grilled-salmon-plate.png",
    deliveryTime: "30-40 min",
    restaurant: "Ocean Bistro"
  },
  {
    id: "3",
    name: "Chicken Burger",
    description: "Crispy fried chicken with special sauce",
    price: 10.99,
    rating: 4.7,
    image: "/delicious-chicken-burger.png",
    deliveryTime: "20-30 min",
    restaurant: "Burger Palace"
  },
]

export function FeaturedSection() {
  return (
    <motion.section 
      id="featured" 
      className="py-16 bg-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
          <p className="text-gray-600 text-lg">Try our most popular items loved by customers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 rounded-2xl border border-gray-200 bg-white group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-square bg-gray-200 overflow-hidden relative">
                <motion.img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  whileHover={{ scale: 1.1 }}
                />
                <motion.div 
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
                  <span className="text-sm font-semibold text-gray-900">{item.rating}</span>
                </motion.div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>
                </div>
                
                <p className="text-sm text-gray-500 mb-2">{item.restaurant}</p>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{item.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span className="text-sm">Delivery</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-orange-600">${item.price}</span>
                  <motion.button 
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Order Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
