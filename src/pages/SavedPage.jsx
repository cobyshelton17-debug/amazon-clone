import { Link } from 'react-router-dom'
import { productImage } from '../data/products.js'
import { useCart } from '../context/cart.js'
import './SavedPage.css'

function formatPrice(value) {
  return value.toFixed(2)
}

export default function SavedPage() {
  const { saved, moveToCart, removeSaved } = useCart()

  return (
    <main className="page">
      <div className="saved-panel">
        <h1>
          Saved for later ({saved.length} {saved.length === 1 ? 'item' : 'items'})
        </h1>
        {saved.length === 0 ? (
          <div className="saved-empty">
            <p>You have no saved items.</p>
            <Link className="cart-empty-link" to="/">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="saved-list">
            {saved.map((item) => (
              <div className="saved-item" key={item.id}>
                <div className="saved-item-img">
                  <img
                    src={productImage(item.emoji, item.colors[0], item.colors[1])}
                    alt={item.title}
                  />
                </div>
                <div className="saved-item-body">
                  <Link className="cart-item-title" to="/">
                    {item.title}
                  </Link>
                  <div className="cart-item-stock">In Stock</div>
                  <div className="saved-item-actions">
                    <button
                      className="saved-btn-primary"
                      type="button"
                      onClick={() => moveToCart(item.id)}
                    >
                      Move to cart
                    </button>
                    <button
                      className="saved-btn"
                      type="button"
                      onClick={() => removeSaved(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="saved-item-price">
                  ${formatPrice(item.price)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
