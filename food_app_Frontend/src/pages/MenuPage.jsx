import { useState, useMemo, useEffect } from "react"
import { MenuItemCard } from "../components/MenuItemCard"
import userCategoriesService from "../lib/services/front/categoriesService"
import userSousCategoriesService from "../lib/services/front/sousCategoriesService"
import userRepasService from "../lib/services/front/repasService"

export function MenuPage() {
  const [categories, setCategories] = useState([])
  const [sousCategories, setSousCategories] = useState([])
  const [repas, setRepas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSousCategory, setSelectedSousCategory] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Load categories on mount
  useEffect(() => {
    loadCategories()
  }, [])

  // Load sous-categories when category is selected
  useEffect(() => {
    if (selectedCategory) {
      loadSousCategories(selectedCategory.id)
    } else {
      setSousCategories([])
      setSelectedSousCategory(null)
    }
  }, [selectedCategory])

  // Load repas when category or sous-category changes
  useEffect(() => {
    loadRepas()
  }, [selectedCategory, selectedSousCategory, currentPage])

  const loadCategories = async () => {
    try {
      setLoading(true)
      const response = await userCategoriesService.list({ per_page: 100, page: 1 })

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

  const loadSousCategories = async (categoryId) => {
    try {
      const response = await userSousCategoriesService.byCategory(categoryId, { per_page: 100 })

      if (response.success && response.data) {
        setSousCategories(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading sous-categories:", err)
    }
  }

  const loadRepas = async () => {
    try {
      setLoading(true)
      let response

      if (selectedCategory) {
        // Fetch repas by category
        response = await userRepasService.byCategory(selectedCategory.id, { 
          per_page: 50, 
          page: currentPage 
        })
      } else {
        // Fetch all repas
        response = await userRepasService.list({ 
          per_page: 50, 
          page: currentPage 
        })
      }

      if (response.success && response.data) {
        setRepas(response.data.data || [])
      }
    } catch (err) {
      console.error("Error loading repas:", err)
      setError("Failed to load repas")
    } finally {
      setLoading(false)
    }
  }

  // Filter repas by sous-category if selected
  const filteredRepas = useMemo(() => {
    if (!selectedSousCategory) return repas
    
    return repas.filter(item => 
      item.sous_category_id === selectedSousCategory.id ||
      item.sousCategory?.id === selectedSousCategory.id
    )
  }, [repas, selectedSousCategory])

  const handleCategoryClick = (category) => {
    if (selectedCategory?.id === category.id) {
      // Deselect if clicking the same category
      setSelectedCategory(null)
      setSelectedSousCategory(null)
    } else {
      setSelectedCategory(category)
      setSelectedSousCategory(null)
      setCurrentPage(1)
    }
  }

  const handleSousCategoryClick = (sousCategory) => {
    if (selectedSousCategory?.id === sousCategory.id) {
      setSelectedSousCategory(null)
    } else {
      setSelectedSousCategory(sousCategory)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-500 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Our Menu
          </h1>
          <p className="text-orange-50 text-base sm:text-lg lg:text-xl">
            Explore our delicious selection of dishes
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Category Filters */}
        <div className="mb-6 sm:mb-8 bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5 flex items-center">
            <span className="w-1 h-6 bg-orange-600 rounded-full mr-3"></span>
            Filter by Category
          </h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => {
                setSelectedCategory(null)
                setSelectedSousCategory(null)
                setCurrentPage(1)
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                !selectedCategory
                  ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                  : "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                  selectedCategory?.id === category.id
                    ? "bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-gray-50 border-2 border-gray-200 text-gray-700 hover:border-orange-400 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sous-Category Filters */}
        {selectedCategory && sousCategories.length > 0 && (
          <div className="mb-6 sm:mb-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 sm:p-6 shadow-md border-2 border-orange-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-5 flex items-center">
              <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
              Filter by Sub-Category
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setSelectedSousCategory(null)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                  !selectedSousCategory
                    ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg hover:shadow-xl hover:scale-105"
                    : "bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:bg-white hover:text-orange-600"
                }`}
              >
                All {selectedCategory.name}
              </button>
              {sousCategories.map((sousCategory) => (
                <button
                  key={sousCategory.id}
                  onClick={() => handleSousCategoryClick(sousCategory)}
                  className={`px-4 sm:px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-200 ${
                    selectedSousCategory?.id === sousCategory.id
                      ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg hover:shadow-xl hover:scale-105"
                      : "bg-white border-2 border-orange-200 text-gray-700 hover:border-orange-400 hover:bg-white hover:text-orange-600"
                  }`}
                >
                  {sousCategory.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-block relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-200 border-t-orange-600 mb-4"></div>
              <div className="absolute top-0 left-0 animate-ping rounded-full h-16 w-16 border-4 border-orange-400 opacity-20"></div>
            </div>
            <p className="text-gray-700 text-base sm:text-lg font-semibold mt-4">Loading delicious dishes...</p>
            <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && filteredRepas.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredRepas.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredRepas.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 mb-4">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-600 text-base sm:text-lg font-medium mb-2">
              No items found
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>
    </main>
  )
}