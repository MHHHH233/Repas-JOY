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
import { AdminPage } from "./Admin/AdminPage"

function App() {
  return (
    <AccessibilityWrapper>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-1" tabIndex="-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute isAuthenticated={false}>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AccessibilityWrapper>
  )
}

export default App
