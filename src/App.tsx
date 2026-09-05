import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import SearchPage from './pages/SearchPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutReviewPage from './pages/CheckoutReviewPage'
import OrderSuccessPage from './pages/OrderSuccessPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import AdminProductsPage from './pages/AdminProductsPage'
import AdminProductFormPage from './pages/AdminProductFormPage'
import NotFound from './components/NotFound'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/review" element={<CheckoutReviewPage />} />
        <Route path="/order/:id" element={<OrderSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin/products" element={<AdminProductsPage />} />
        <Route path="/admin/products/new" element={<AdminProductFormPage />} />
        <Route path="/admin/products/:id/edit" element={<AdminProductFormPage />} />
        <Route path="*" element={<NotFound message="Page not found." />} />
      </Routes>
    </>
  )
}

export default App
