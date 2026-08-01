import { useNavigate, Link } from 'react-router-dom'
import './RegistryPage.css'

export default function RegistryPage() {
  const navigate = useNavigate()

  return (
    <main className="page">
      <div className="registry-panel">
        <h1>Create a registry?</h1>
        <p className="registry-sub">
          Build a gift list for any occasion — weddings, baby showers, birthdays,
          and more.
        </p>
        <div className="registry-actions">
          <button
            className="registry-btn registry-btn-secondary"
            type="button"
            onClick={() => navigate(-1)}
          >
            No thank you
          </button>
          <Link className="registry-btn registry-btn-primary" to="/">
            Back to shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
