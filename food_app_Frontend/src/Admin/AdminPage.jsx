"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"

const dashboardStats = [
  { label: "Total Orders", value: "1,234", icon: ShoppingBag, color: "bg-blue-500" },
  { label: "Total Revenue", value: "$12,450", icon: DollarSign, color: "bg-green-500" },
  { label: "Active Users", value: "856", icon: Users, color: "bg-purple-500" },
  { label: "Growth", value: "+12.5%", icon: TrendingUp, color: "bg-orange-500" },
]

const revenueData = [
  { name: "Mon", revenue: 2400 },
  { name: "Tue", revenue: 1398 },
  { name: "Wed", revenue: 9800 },
  { name: "Thu", revenue: 3908 },
  { name: "Fri", revenue: 4800 },
  { name: "Sat", revenue: 3800 },
  { name: "Sun", revenue: 4300 },
]

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", amount: "$45.99", status: "Delivered", time: "2 hours ago" },
  { id: "ORD-002", customer: "Jane Smith", amount: "$32.50", status: "In Transit", time: "30 mins ago" },
  { id: "ORD-003", customer: "Bob Johnson", amount: "$58.75", status: "Preparing", time: "5 mins ago" },
  { id: "ORD-004", customer: "Alice Brown", amount: "$41.25", status: "Confirmed", time: "Just now" },
]

export function AdminPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your food delivery business</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="p-6 rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Tabs */}
        <div className="space-y-6">
          <div className="grid w-full grid-cols-3 bg-white border border-gray-200 rounded-lg">
            {["overview", "orders", "analytics"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-3 font-medium transition ${
                  selectedTab === tab ? "bg-orange-600 text-white" : "text-gray-700 hover:text-orange-600"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-6">
              <div className="p-6 rounded-lg border border-gray-200 bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue This Week</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#ea580c" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 bg-white">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{order.amount}</p>
                        <p className="text-sm text-gray-600">{order.time}</p>
                      </div>
                      <div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "In Transit"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Preparing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {selectedTab === "orders" && (
            <div className="p-6 rounded-lg border border-gray-200 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">All Orders</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{order.id}</td>
                        <td className="py-3 px-4 text-gray-900">{order.customer}</td>
                        <td className="py-3 px-4 text-gray-900 font-semibold">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "In Transit"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Preparing"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-orange-600 border border-orange-600 hover:bg-orange-50 bg-transparent px-3 py-1 rounded transition text-sm font-medium">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {selectedTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg border border-gray-200 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top Dishes</h3>
                <div className="space-y-3">
                  {[
                    { name: "Margherita Pizza", orders: 234 },
                    { name: "Chicken Burger", orders: 189 },
                    { name: "Grilled Salmon", orders: 156 },
                    { name: "Caesar Salad", orders: 142 },
                  ].map((dish, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{dish.name}</span>
                      <span className="font-semibold text-gray-900">{dish.orders} orders</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-lg border border-gray-200 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Satisfaction</h3>
                <div className="space-y-3">
                  {[
                    { metric: "Average Rating", value: "4.8/5" },
                    { metric: "On-Time Delivery", value: "98%" },
                    { metric: "Customer Retention", value: "92%" },
                    { metric: "Repeat Orders", value: "67%" },
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-600">{item.metric}</span>
                      <span className="font-semibold text-orange-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
