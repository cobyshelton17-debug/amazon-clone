import { Link } from 'react-router-dom'
import './OrdersPage.css'

export default function OrdersPage() {
  return (
    <main className="page">
      <div className="orders-panel">
        <h1>Your Orders</h1>
        <div className="orders-empty">
          <p>No returns or orders yet.</p>
          <p className="orders-hint">
            When you place an order, you'll find it here along with any returns.
          </p>
          <Link className="cart-empty-link" to="/">
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
