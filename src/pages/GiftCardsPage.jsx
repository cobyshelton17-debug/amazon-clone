import { Link } from 'react-router-dom'
import './GiftCardsPage.css'

export default function GiftCardsPage() {
  return (
    <main className="page">
      <div className="gift-panel">
        <h1>Gift Cards</h1>
        <p>
          We don't actually have any gift card options... oops. Please accept
          this handshake and a pat on the back instead.
        </p>
        <Link className="cart-empty-link" to="/">
          Continue shopping
        </Link>
      </div>
    </main>
  )
}
