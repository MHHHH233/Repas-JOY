import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Layers,
  UtensilsCrossed,
  ShoppingCart,
  Users,
  Star,
  Palette,
  Share2,
  X,
  ChevronDown,
  ChevronRight,
  UserCircle,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  {
    icon: UtensilsCrossed,
    label: "Food",
    href: null,
    children: [
      { icon: Layers, label: "Categories", href: "/admin/categories" },
      { icon: Layers, label: "Sous-Categories", href: "/admin/sous-categories" },
      { icon: UtensilsCrossed, label: "Repas", href: "/admin/repas" },
      { icon: ShoppingCart, label: "Commandes", href: "/admin/commandes" },
    ],
  },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: Palette, label: "Landing Sections", href: "/admin/landing-sections" },
  { icon: Share2, label: "Social Media", href: "/admin/social-media" },
  { icon: UserCircle, label: "Profile", href: "/admin/profile" },
]

export function Sidebar({ open, setOpen }) {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState({})

  // Auto-expand menu if child route is active
  useEffect(() => {
    const shouldExpandFood = location.pathname.startsWith("/admin/categories") ||
      location.pathname.startsWith("/admin/sous-categories") ||
      location.pathname.startsWith("/admin/repas") ||
      location.pathname.startsWith("/admin/commandes")
    
    if (shouldExpandFood) {
      setExpandedMenus((prev) => ({
        ...prev,
        Food: true,
      }))
    }
  }, [location.pathname])

  const toggleMenu = (label) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  const isMenuActive = (item) => {
    if (item.href) {
      return location.pathname === item.href
    }
    if (item.children) {
      return item.children.some((child) => location.pathname === child.href)
    }
    return false
  }

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative w-64 h-screen bg-orange-600 text-white z-40 shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-700">
          <h1 className="text-2xl font-bold">RepasJoy</h1>
          <button 
            onClick={() => setOpen(false)} 
            className="md:hidden text-white hover:bg-orange-700 p-1 rounded transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-2 px-4">
            {menuItems.map((item) => {
              const isActive = isMenuActive(item)
              const Icon = item.icon
              const hasChildren = item.children && item.children.length > 0
              const isExpanded = expandedMenus[item.label]

              if (hasChildren) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleMenu(item.label)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        isActive 
                          ? "bg-white text-orange-600 shadow-md" 
                          : "text-white hover:bg-orange-700"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium flex-1 text-left">{item.label}</span>
                      {isExpanded ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                    {isExpanded && (
                      <div className="mt-1 ml-4 space-y-1">
                        {item.children.map((child) => {
                          const isChildActive = location.pathname === child.href
                          const ChildIcon = child.icon
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => window.innerWidth < 768 && setOpen(false)}
                              className="block"
                            >
                              <div
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                                  isChildActive
                                    ? "bg-orange-700 text-white"
                                    : "text-orange-100 hover:bg-orange-700/50"
                                }`}
                              >
                                <ChildIcon size={18} />
                                <span className="font-medium text-sm">{child.label}</span>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              return (
                <Link 
                  key={item.href} 
                  to={item.href} 
                  onClick={() => window.innerWidth < 768 && setOpen(false)}
                  className="block"
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive 
                        ? "bg-white text-orange-600 shadow-md" 
                        : "text-white hover:bg-orange-700"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium flex-1">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-orange-700">
          <p className="text-sm text-orange-100">© 2025 RepasJoy Admin</p>
        </div>
      </aside>
    </>
  )
}
