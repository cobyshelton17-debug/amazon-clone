import { Link } from 'react-router-dom'
import './SellPage.css'

export default function SellPage() {
  return (
    <main className="page">
      <div className="sell-panel">
        <h1>Sell on Amazon</h1>
        <p>
          Before you can start selling, you'll need to create an Amazon Seller
          account first.
        </p>
        <p className="sell-hint">
          It's free to sign up. You'll pay per-item or monthly fees only after
          your listings are live.
        </p>
        <div className="sell-actions">
          <Link className="cart-empty-link" to="/">
            Back to shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
