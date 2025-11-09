"use client"

import { motion } from "framer-motion"
import { Users, ShoppingCart, UtensilsCrossed, Star, TrendingUp, BarChart3 } from "lucide-react"

const dashboardStats = [
  {
    title: "Total Users",
    value: "1,234",
    icon: Users,
    trend: "+12.5%asdasdas",
    color: "bg-blue-500",
  },
  {
    title: "Total Orders",
    value: "5,678",
    icon: ShoppingCart,
    trend: "+8.2asdadasdas%",
    color: "bg-green-500",
  },
  {
    title: "Total Meals",
    value: "342",
    icon: UtensilsCrossed,
    trend: "+3.1%asdasdasdasd",
    color: "bg-orange-500",
  },
  {
    title: "Total Reviews",
    value: "892",
    icon: Star,
    trend: "+15.3%",
    color: "bg-yellow-500",
  },
]

const recentOrders = [
  { id: 1, customer: "John Doe", meal: "Pizza Margherita", status: "Completed", amount: "$25.99" },
  { id: 2, customer: "Jane Smith", meal: "Caesar Salad", status: "Pending", amount: "$12.50" },
  { id: 3, customer: "Bob Johnson", meal: "Pasta Carbonara", status: "Processing", amount: "$18.75" },
  { id: 4, customer: "Alice Williams", meal: "Burger Deluxe", status: "Completed", amount: "$22.00" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

export default function AdminDashboard() {
  return (
    <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
      {/* Stats Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5 rgba(0,0,0,0.1)" }}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-600"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</h3>
                  <p className="text-green-600 text-sm font-semibold mt-2 flex items-center gap-1">
                    <TrendingUp size={16} />
                    {stat.trend}
                  </p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon size={28} className="text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 size={24} className="text-orange-600" />
          <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
        </div>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-500">
          <p>Chart component - integrate with Recharts</p>
        </div>
      </motion.div>

      {/* Recent Orders Table */}
      <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Meal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  whileHover={{ backgroundColor: "#f9fafb" }}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-4 px-4 text-gray-900">{order.customer}</td>
                  <td className="py-4 px-4 text-gray-700">{order.meal}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{order.amount}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
