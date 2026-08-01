import { Link } from 'react-router-dom'
import './JustKiddingPage.css'

export default function JustKiddingPage() {
  return (
    <main className="page">
      <div className="just-kidding">
        <h1>Just kidding</h1>
        <p>We aren't taking your money.</p>
        <Link className="just-kidding-btn" to="/">
          Back to shopping
        </Link>
      </div>
    </main>
  )
}
