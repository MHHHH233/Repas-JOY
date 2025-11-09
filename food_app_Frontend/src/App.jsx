import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./context/CartContext"
import { AccessibilityWrapper } from "./components/AccessibilityWrapper"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { HomePage } from "./pages/HomePage"
import { MenuPage } from "./pages/MenuPage"
import { CartPage } from "./pages/CartPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { OrderConfirmationPage } from "./pages/OrderConfirmationPage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"
import AdminLayout from "./Admin/Layouts"
import { Dashboard } from "./Admin/Pages/Dashboard"
import { UsersPage } from "./Admin/Pages/Users"
import { CategoriesPage } from "./Admin/Pages/categories"
import { SousCategoriesPage } from "./Admin/Pages/Sous_Categories"
import { RepasPage } from "./Admin/Pages/Repas"
import { CommandesPage } from "./Admin/Pages/Commandes"
import { ReviewsPage } from "./Admin/Pages/Reviews"
import { LandingSectionsPage } from "./Admin/Pages/LandingSections"
import { SocialMediaPage } from "./Admin/Pages/Social_Media"
import { ProfilePage } from "./Admin/Pages/Profile"

function App() {
  return (
    <AccessibilityWrapper>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public Routes with Navbar and Footer */}
            <Route
              path="/"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <HomePage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/menu"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <MenuPage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/cart"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <CartPage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/checkout"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <CheckoutPage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/order-confirmation"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <OrderConfirmationPage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/signin"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <SignInPage />
                  </main>
                  <Footer />
                </div>
              }
            />
            <Route
              path="/signup"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main id="main-content" className="flex-1" tabIndex="-1">
                    <SignUpPage />
                  </main>
                  <Footer />
                </div>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CategoriesPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sous-categories"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SousCategoriesPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/repas"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <RepasPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/commandes"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <CommandesPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <UsersPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reviews"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ReviewsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/landing-sections"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <LandingSectionsPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/social-media"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <SocialMediaPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <ProfilePage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AccessibilityWrapper>
  )
}

export default App
