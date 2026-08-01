import { Link, useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'
import './SearchPage.css'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  const results =
    terms.length === 0
      ? []
      : products.filter((product) => {
          const haystack = [product.title, product.description, ...(product.features ?? [])]
            .join(' ')
            .toLowerCase()
          return terms.every((term) => haystack.includes(term))
        })

  return (
    <main className="page">
      <header className="search-header">
        {query ? (
          <h1>
            Results for <span className="search-query">"{query}"</span>
          </h1>
        ) : (
          <h1>Search</h1>
        )}
        <p className="search-count">
          {results.length} {results.length === 1 ? 'result' : 'results'}
        </p>
      </header>

      {results.length === 0 ? (
        <div className="search-empty">
          <p>
            We couldn't find anything for "{query}". Try a different search or
            browse our best sellers.
          </p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      ) : (
        <section className="product-grid">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  )
}
