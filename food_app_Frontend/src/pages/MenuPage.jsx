import { useState, useMemo, useEffect } from "react"
import { MenuItemCard } from "../components/MenuItemCard"
import userCategoriesService from "../lib/services/front/categoriesService";
import { menuData } from "../lib/menu-data"


export function MenuPage() {

  const [categories, setCategories] = useState([])
  const [ , setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    loadCategories()
  }, [currentPage])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await userCategoriesService.list({ per_page: 10, page: currentPage })

      if (response.success && response.data) {
        setCategories(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading categories:", err)
      setError("Failed to load categories")
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return menuData
    return menuData.filter(item => item.category === selectedCategory.name)
  }, [selectedCategory])


  return (
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Menu</h1>
          <p className="text-gray-600 text-lg">Explore our delicious selection of dishes</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* Category Filters */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h2>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory?.id === category.id
                    ? "bg-orange-600 text-white"
                    : "border border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600"
                }`}
              >
                {category.name}
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
