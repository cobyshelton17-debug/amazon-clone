import { useState } from 'react'
import { Link } from 'react-router-dom'
import { productImage } from '../data/products.js'
import { useCart } from '../context/cart.js'
import './CheckoutPage.css'

function formatPrice(value) {
  return value.toFixed(2)
}

export default function CheckoutPage() {
  const { cart, cartCount, subtotal, clearCart } = useCart()
  const [placed, setPlaced] = useState(false)
  const [orderNumber] = useState(
    () => `112-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
  )
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    card: '',
    exp: '',
    cvc: '',
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    clearCart()
    setPlaced(true)
    window.scrollTo(0, 0)
  }

  if (placed) {
    return (
      <main className="page">
        <div className="checkout-confirm">
          <h1>Thank you, your order has been placed.</h1>
          <p>
            Confirmation will be sent to your email. Your order number is{' '}
            <strong>{orderNumber}</strong>.
          </p>
          <p className="confirm-eta">
            Estimated delivery: <strong>Fri, Aug 7</strong>
          </p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  if (cart.length === 0) {
    return (
      <main className="page">
        <div className="checkout-confirm">
          <h1>Your cart is empty</h1>
          <p>Add some items before checking out.</p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <h1 className="checkout-title">Checkout</h1>
      <form className="checkout-layout" onSubmit={handleSubmit}>
        <section className="checkout-left">
          <div className="checkout-section">
            <h2>1. Shipping address</h2>
            <div className="checkout-fields">
              <input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                required
              />
              <div className="checkout-row">
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                />
                <input
                  name="state"
                  placeholder="State"
                  value={form.state}
                  onChange={handleChange}
                  required
                />
                <input
                  name="zip"
                  placeholder="ZIP"
                  value={form.zip}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>2. Payment method</h2>
            <div className="checkout-fields">
              <input
                name="card"
                placeholder="Card number"
                inputMode="numeric"
                value={form.card}
                onChange={handleChange}
                required
              />
              <div className="checkout-row">
                <input
                  name="exp"
                  placeholder="Expiration (MM/YY)"
                  value={form.exp}
                  onChange={handleChange}
                  required
                />
                <input
                  name="cvc"
                  placeholder="CVC"
                  inputMode="numeric"
                  value={form.cvc}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>3. Review items</h2>
            {cart.map((item) => (
              <div className="checkout-review-item" key={item.id}>
                <img
                  src={productImage(item.emoji, item.colors[0], item.colors[1])}
                  alt={item.title}
                />
                <span className="checkout-review-title">{item.title}</span>
                <span className="checkout-review-price">
                  ${formatPrice(item.price)} x {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="checkout-summary">
          <div className="checkout-price-lines">
            <p>
              <span>
                Items ({cartCount}):{' '}
              </span>
              <span>${formatPrice(subtotal)}</span>
            </p>
            <p>
              <span>Shipping &amp; handling: </span>
              <span>FREE</span>
            </p>
            <p className="checkout-total">
              <span>Order total: </span>
              <span>${formatPrice(subtotal)}</span>
            </p>
          </div>
          <button className="cart-proceed checkout-place" type="submit">
            Place your order
          </button>
          <p className="checkout-disclaimer">
            By placing your order, you agree to Amazon&apos;s privacy notice and
            conditions of use.
          </p>
        </aside>
      </form>
    </main>
  )
}
