"use client"

import { useState, useMemo } from "react"
import { MenuItemCard } from "../components/MenuItemCard"
import { menuData } from "../lib/menu-data"

const categories = ["All", "Pizza", "Burgers", "Seafood", "Salads", "Desserts"]

export function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return menuData
    }
    return menuData.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
          <p className="text-gray-600 text-lg">Explore our delicious selection of dishes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                    : "border border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items found in this category</p>
          </div>
        )}
      </div>
    </main>
  )
}
