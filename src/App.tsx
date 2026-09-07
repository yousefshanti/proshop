import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import NotFound from './components/NotFound'

const ProductPage = lazy(() => import('./pages/ProductPage'))
const SearchPage = lazy(() => import('./pages/SearchPage'))
const CartPage = lazy(() => import('./pages/CartPage'))
const WishlistPage = lazy(() => import('./pages/WishlistPage'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'))
const CheckoutReviewPage = lazy(() => import('./pages/CheckoutReviewPage'))
const OrderSuccessPage = lazy(() => import('./pages/OrderSuccessPage'))
const LoginPage = lazy(() => import('./pages/LoginPage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const AdminProductsPage = lazy(() => import('./pages/AdminProductsPage'))
const AdminProductFormPage = lazy(() => import('./pages/AdminProductFormPage'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
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
      </Suspense>
    </>
  )
}

export default App
