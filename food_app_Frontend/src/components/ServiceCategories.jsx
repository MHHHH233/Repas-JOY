import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Utensils, ShoppingBag, Wine, Coffee, IceCream, Heart } from "lucide-react"

const services = [
  {
    id: "food",
    name: "Food",
    description: "Restaurant delivery",
    icon: Utensils,
    color: "from-orange-500 to-red-500",
    href: "/menu"
  },
  {
    id: "groceries",
    name: "Groceries",
    description: "Fresh groceries",
    icon: ShoppingBag,
    color: "from-green-500 to-emerald-500",
    href: "/groceries"
  },
  {
    id: "alcohol",
    name: "Alcohol",
    description: "Beer, wine & spirits",
    icon: Wine,
    color: "from-purple-500 to-indigo-500",
    href: "/alcohol"
  },
  {
    id: "coffee",
    name: "Coffee",
    description: "Coffee & tea",
    icon: Coffee,
    color: "from-amber-500 to-orange-500",
    href: "/coffee"
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet treats",
    icon: IceCream,
    color: "from-pink-500 to-rose-500",
    href: "/desserts"
  },
  {
    id: "health",
    name: "Health",
    description: "Health & wellness",
    icon: Heart,
    color: "from-teal-500 to-cyan-500",
    href: "/health"
  }
]

export function ServiceCategories() {
  return (
    <motion.section 
      className="py-16 bg-gray-50"
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            From restaurant meals to groceries, we've got all your delivery needs covered in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to={service.href}>
                <motion.div 
                  className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 group cursor-pointer"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="font-bold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
