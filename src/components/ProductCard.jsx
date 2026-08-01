import { Link } from 'react-router-dom'
import './ProductCard.css'
import { productImage } from '../data/products.js'
import { useCart } from '../context/cart.js'

function Stars({ rating }) {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg key={i} className="stars-shape" viewBox="0 0 24 24" aria-hidden="true">
        <path
          className="stars-fill"
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

export default function ProductCard({ product }) {
  const { title, price, originalPrice, rating, reviews, prime, emoji, colors } =
    product
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <Link className="product-img" to={`/product/${product.id}`}>
        <img src={productImage(emoji, colors[0], colors[1])} alt={title} loading="lazy" />
      </Link>
      <div className="product-body">
        <Link className="product-title" to={`/product/${product.id}`}>
          {title}
        </Link>
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
        <button
          className="add-to-cart"
          type="button"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
