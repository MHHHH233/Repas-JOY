import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  TrendingUp,
  Users,
  ShoppingBag,
  UtensilsCrossed,
  Star,
  Layers,
  Package,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import { motion } from "framer-motion"
import adminDashboardService from "../../lib/services/back/adminDashboardService"

const COLORS = ["#f97316", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444", "#f59e0b"]

export function Dashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const response = await adminDashboardService.overview()
      if (response.success && response.data) {
        setStats(response.data)
      }
    } catch (err) {
      console.error("Error loading dashboard:", err)
      setError("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const dashboardStats = [
    {
      label: "Total Users",
      value: stats.totals?.users || 0,
      icon: Users,
      color: "bg-blue-500",
      change: stats.users?.growth_rate_7d || 0,
      subtitle: `${stats.users?.new_last_7_days || 0} new (7d)`,
    },
    {
      label: "Total Categories",
      value: stats.totals?.categories || 0,
      icon: Layers,
      color: "bg-purple-500",
      subtitle: `${stats.categories?.with_repas || 0} with repas`,
    },
    {
      label: "Total Repas",
      value: stats.totals?.repas || 0,
      icon: UtensilsCrossed,
      color: "bg-green-500",
      subtitle: `${stats.repas?.visible || 0} visible`,
    },
    {
      label: "Total Commandes",
      value: stats.totals?.commandes || 0,
      icon: ShoppingBag,
      color: "bg-orange-500",
      change: stats.commandes?.last_7_days || 0,
      subtitle: `${stats.commandes?.last_7_days || 0} (7d)`,
    },
    {
      label: "Total Reviews",
      value: stats.totals?.reviews || 0,
      icon: Star,
      color: "bg-yellow-500",
      subtitle: `Avg: ${stats.reviews?.average_rating || 0}⭐`,
    },
  ]

  // Prepare data for charts
  const dailyCommandesData = stats.commandes?.daily_data?.map((item) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count: item.count,
  })) || []

  const weeklyGrowthData = stats.growth?.weekly?.map((item) => ({
    week: new Date(item.week).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    users: item.users,
    repas: item.repas,
    commandes: item.commandes,
    reviews: item.reviews,
  })) || []

  const categoryDistributionData =
    stats.categories?.distribution?.slice(0, 5).map((cat) => ({
      name: cat.category_name,
      value: cat.repas_count,
    })) || []

  const ratingDistributionData = stats.reviews?.rating_distribution
    ? Object.entries(stats.reviews.rating_distribution)
        .filter(([key]) => key !== "0_stars")
        .map(([key, value]) => ({
          name: key.replace("_", " ").replace("stars", "⭐"),
          value: value,
        }))
    : []

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your restaurant management</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition-all overflow-hidden relative group"
            >
              {/* Gradient Background Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {stat.change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${
                      stat.change >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {stat.change >= 0 ? (
                        <ArrowUp className="text-green-600" size={14} />
                      ) : (
                        <ArrowDown className="text-red-600" size={14} />
                      )}
                      <span className="font-semibold">
                        {Math.abs(stat.change)}%
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  {stat.subtitle && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {stat.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Commandes Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <ShoppingBag className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Commandes (Last 30 Days)</h3>
              <p className="text-xs text-gray-500">Daily order trends</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyCommandesData}>
              <defs>
                <linearGradient id="colorCommandes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#f97316"
                fillOpacity={1}
                fill="url(#colorCommandes)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Weekly Growth Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Weekly Growth</h3>
              <p className="text-xs text-gray-500">Growth across all metrics</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="users" fill="#3b82f6" name="Users" />
              <Bar dataKey="repas" fill="#10b981" name="Repas" />
              <Bar dataKey="commandes" fill="#f97316" name="Commandes" />
              <Bar dataKey="reviews" fill="#f59e0b" name="Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Layers className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Top Categories by Repas</h3>
              <p className="text-xs text-gray-500">Category distribution</p>
            </div>
          </div>
          {categoryDistributionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No data available
            </div>
          )}
        </motion.div>

        {/* Rating Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
              <Star className="text-white" size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Rating Distribution</h3>
              <p className="text-xs text-gray-500">Customer ratings breakdown</p>
            </div>
          </div>
          {ratingDistributionData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ratingDistributionData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="value" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No data available
            </div>
          )}
        </motion.div>
      </div>

      {/* Additional Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-md p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-green-700 text-sm mb-1 font-semibold">Repas in Stock</p>
              <p className="text-3xl font-bold text-gray-900">{stats.repas?.in_stock || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
              <Package className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs text-green-600 font-medium">
            {stats.repas?.out_of_stock || 0} out of stock
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 shadow-md p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-emerald-700 text-sm mb-1 font-semibold">Vegan Repas</p>
              <p className="text-3xl font-bold text-gray-900">{stats.repas?.vegan || 0}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-md">
              <UtensilsCrossed className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-medium">
            {stats.repas?.non_vegan || 0} non-vegan
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 shadow-md p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-orange-700 text-sm mb-1 font-semibold">Commandes (30d)</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.commandes?.last_30_days || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs text-orange-600 font-medium">
            {stats.commandes?.last_90_days || 0} in last 90 days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 shadow-md p-6 hover:shadow-xl transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-yellow-700 text-sm mb-1 font-semibold">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.reviews?.average_rating || 0}⭐
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center shadow-md">
              <Star className="text-white" size={24} />
            </div>
          </div>
          <p className="text-xs text-yellow-600 font-medium">
            {stats.reviews?.total || 0} total reviews
          </p>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center shadow-md">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <p className="text-xs text-gray-500">Latest updates across the platform</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <p className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <Users size={18} className="text-blue-600" />
              Recent Users
            </p>
            <div className="space-y-3">
              {stats.recent_activity?.users?.slice(0, 3).map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded-lg border border-blue-100"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="text-blue-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200">
            <p className="text-sm font-semibold text-orange-700 mb-3 flex items-center gap-2">
              <ShoppingBag size={18} className="text-orange-600" />
              Recent Commandes
            </p>
            <div className="space-y-3">
              {stats.recent_activity?.commandes?.slice(0, 3).map((commande, index) => (
                <motion.div
                  key={commande.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded-lg border border-orange-100"
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <ShoppingBag className="text-orange-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium truncate">
                      {commande.repas?.name || "N/A"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {commande.user?.username || "N/A"}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-semibold text-yellow-700 mb-3 flex items-center gap-2">
              <Star size={18} className="text-yellow-600" />
              Recent Reviews
            </p>
            <div className="space-y-3">
              {stats.recent_activity?.reviews?.slice(0, 3).map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded-lg border border-yellow-100"
                >
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Star className="text-yellow-600 fill-yellow-600" size={14} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{review.nom_user}</p>
                    <p className="text-xs text-yellow-600 font-semibold">{review.stars}⭐</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
