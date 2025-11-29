import { motion } from "framer-motion"
import { MapPin, Salad, Zap } from "lucide-react"

export function ServiceCategories() {
  const services = [
    {
      icon: MapPin,
      title: "Multiple Locations",
      description: "We deliver to your area with fast and reliable service"
    },
    {
      icon: Salad,
      title: "Fresh Ingredients",
      description: "Only the freshest ingredients in every meal we prepare"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your food delivered quickly to your doorstep"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2  className="text-2xl text-gray-600 max-w-2xl mx-auto mb-6">
            Why Choose Us
          </h2>
          <p className="text-3xl sm:text-4xl font-semibold text-orange-400 mb-4" style={{ fontFamily: "'Fredoka One', cursive" }}>
            Experience the Best meals with fast delivery
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
                    <Icon className="w-10 h-10 text-orange-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
