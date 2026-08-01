import { Link, useParams } from 'react-router-dom'
import { productImage, products } from '../data/products.js'
import { useCart } from '../context/cart.js'
import './ProductPage.css'

function Stars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} className="stars-shape" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          opacity={i <= Math.round(rating) ? 1 : 0.25}
        />
      </svg>,
    )
  }
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </span>
  )
}

function formatReviews(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k` : `${n}`
}

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <main className="page">
        <div className="product-not-found">
          <h1>Product not found</h1>
          <p>We couldn't find the item you were looking for.</p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  const { title, price, originalPrice, rating, reviews, prime, emoji, colors } =
    product

  return (
    <main className="page">
      <Link className="product-back" to="/">
        ← Back to results
      </Link>
      <div className="product-layout">
        <div className="product-gallery">
          <img
            src={productImage(emoji, colors[0], colors[1])}
            alt={title}
            className="product-hero-img"
          />
        </div>
        <section className="product-details">
          <h1 className="product-page-title">{title}</h1>
          <div className="product-meta">
            <Stars rating={rating} />
            <span className="product-reviews">{formatReviews(reviews)}</span>
          </div>
          <div className="product-price">
            <span className="price-symbol">$</span>
            <span className="price-whole">{Math.trunc(price)}</span>
            <span className="price-fraction">
              {price.toFixed(2).split('.')[1]}
            </span>
            {originalPrice && (
              <span className="price-original">
                List: ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {prime && (
            <span className="product-prime" title="FREE delivery with Prime">
              <b>prime</b>
            </span>
          )}
          <p className="product-description">{product.description}</p>
          <ul className="product-features">
            {product.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
        <aside className="product-buy-box">
          <div className="product-price">
            <span className="price-symbol">$</span>
            <span className="price-whole">{Math.trunc(price)}</span>
            <span className="price-fraction">
              {price.toFixed(2).split('.')[1]}
            </span>
          </div>
          <p className="product-shipping">FREE delivery by Fri, Aug 7</p>
          {prime ? (
            <p className="product-stock">In Stock</p>
          ) : (
            <p className="product-stock product-stock-low">Only 5 left in stock</p>
          )}
          <button
            className="product-buy-btn"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <Link className="product-buy-btn product-buy-now" to="/cart">
            Buy Now
          </Link>
          <div className="product-secure">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z"
              />
            </svg>
            Secure transaction
          </div>
        </aside>
      </div>
    </main>
  )
}
