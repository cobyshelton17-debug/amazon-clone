import { Link } from 'react-router-dom'
import { productImage } from '../data/products.js'
import { useCart } from '../context/cart.js'
import './CartPage.css'

function formatPrice(value) {
  return value.toFixed(2)
}

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    saved,
    updateQuantity,
    removeFromCart,
    saveForLater,
    moveToCart,
    removeSaved,
  } = useCart()
  const taxRate = 0.0725
  const estimatedTax = subtotal * taxRate
  const total = subtotal + estimatedTax

  if (cart.length === 0) {
    return (
      <main className="page">
        <div className="cart-empty">
          <h1>Your Amazon Cart is empty</h1>
          <p>Your shopping cart is waiting. Give it purpose.</p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="cart-layout">
        <section className="cart-items">
          <h1>Shopping Cart</h1>
          <div className="cart-price-head">Price</div>
          <div className="cart-subtotal-line">
            Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
            <span>${formatPrice(subtotal)}</span>
          </div>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="cart-item-img">
                <img
                  src={productImage(item.emoji, item.colors[0], item.colors[1])}
                  alt={item.title}
                />
              </div>
              <div className="cart-item-body">
                <Link className="cart-item-title" to="/">
                  {item.title}
                </Link>
                <div className="cart-item-stock">In Stock</div>
                <div className="cart-item-actions">
                <div className="cart-stepper">
                  <button
                    type="button"
                    aria-label={`Decrease quantity for ${item.title}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span aria-live="polite">{item.quantity}</span>
                  <button
                    type="button"
                    aria-label={`Increase quantity for ${item.title}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                  <button
                    className="cart-link-btn"
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="cart-link-btn"
                    type="button"
                    onClick={() => saveForLater(item.id)}
                  >
                    Save for later
                  </button>
                </div>
              </div>
              <div className="cart-item-price">${formatPrice(item.price)}</div>
            </div>
          ))}
          <div className="cart-subtotal-bottom">
            Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
            <span>${formatPrice(subtotal)}</span>
          </div>
          {saved.length > 0 && (
            <section className="cart-saved">
              <h2>
                Saved for later ({saved.length} {saved.length === 1 ? 'item' : 'items'})
              </h2>
              {saved.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-img">
                    <img
                      src={productImage(item.emoji, item.colors[0], item.colors[1])}
                      alt={item.title}
                    />
                  </div>
                  <div className="cart-item-body">
                    <Link className="cart-item-title" to="/">
                      {item.title}
                    </Link>
                    <div className="cart-item-stock">In Stock</div>
                    <div className="cart-item-actions">
                      <button
                        className="cart-link-btn"
                        type="button"
                        onClick={() => moveToCart(item.id)}
                      >
                        Move to cart
                      </button>
                      <button
                        className="cart-link-btn"
                        type="button"
                        onClick={() => removeSaved(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="cart-item-price">${formatPrice(item.price)}</div>
                </div>
              ))}
              <Link className="cart-saved-link" to="/saved">
                View all saved items
              </Link>
            </section>
          )}
        </section>

        <aside className="cart-checkout-box">
          <p className="cart-gift">
            <input type="checkbox" id="gift" />
            <label htmlFor="gift">This order contains a gift</label>
          </p>
          <div className="cart-totals">
            <p>
              <span>
                Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):
              </span>
              <span>${formatPrice(subtotal)}</span>
            </p>
            <p>
              <span>Estimated tax:</span>
              <span>${formatPrice(estimatedTax)}</span>
            </p>
            <p className="cart-total-amount">
              <span>Total:</span>
              <span>${formatPrice(total)}</span>
            </p>
          </div>
          <Link className="cart-proceed" to="/just-kidding">
            Proceed to checkout
          </Link>
        </aside>
      </div>
    </main>
  )
}
