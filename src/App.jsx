import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartPage from './pages/CartPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import CustomerServicePage from './pages/CustomerServicePage.jsx'
import DealsPage from './pages/DealsPage.jsx'
import GiftCardsPage from './pages/GiftCardsPage.jsx'
import JustKiddingPage from './pages/JustKiddingPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import RegistryPage from './pages/RegistryPage.jsx'
import SavedPage from './pages/SavedPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import SearchPage from './pages/SearchPage.jsx'
import SellPage from './pages/SellPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import products from './data/products.js'

function HomePage() {
  return (
    <main className="page">
      <div className="hero-banner">
        <p>
          You are on amazon-clone.com. You can also shop on Amazon's site for
          millions of products with fast local delivery.
        </p>
      </div>
      <section className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/customer-service" element={<CustomerServicePage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/gift-cards" element={<GiftCardsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/registry" element={<RegistryPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/just-kidding" element={<JustKiddingPage />} />
        <Route path="/saved" element={<SavedPage />} />
      </Routes>
    </BrowserRouter>
  )
}
