import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import './DealsPage.css'

const deals = products.filter((p) => p.originalPrice > p.price)

export default function DealsPage() {
  return (
    <main className="page">
      <header className="deals-header">
        <h1>Today's Deals</h1>
        <p className="deals-count">
          {deals.length} {deals.length === 1 ? 'item' : 'items'} with a discount
        </p>
      </header>
      <section className="product-grid">
        {deals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  )
}
