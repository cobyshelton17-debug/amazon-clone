import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './Navbar.css'
import { useCart } from '../context/cart.js'
import { useAuth } from '../context/auth.js'

const departments = [
  "Today's Deals",
  'Customer Service',
  'Registry',
  'Gift Cards',
  'Sell',
]

const searchDepartments = [
  'All',
  'Alexa Skills',
  'Amazon Devices',
  'Amazon Fresh',
  'Amazon Pharmacy',
  'Appliances',
  'Apps & Games',
  'Arts & Crafts',
  'Automotive',
  'Baby',
  'Beauty & Personal Care',
  'Books',
  'CDs & Vinyl',
  'Cell Phones & Accessories',
  'Clothing, Shoes & Jewelry',
  'Collectibles & Fine Art',
  'Computers & Accessories',
  'Deals',
  'Electronics',
  'Garden & Outdoor',
  'Gift Cards',
  'Grocery & Gourmet Food',
  'Handmade',
  'Health & Household',
  'Home & Kitchen',
  'Industrial & Scientific',
  'Kindle Store',
  'Luggage',
  'Movies & TV',
  'Music',
  'Musical Instruments',
  'Office Products',
  'Patio, Lawn & Garden',
  'Pet Supplies',
  'Premium Beauty',
  'Prime Video',
  'Smart Home',
  'Software',
  'Sports & Outdoors',
  'Subscribe & Save',
  'Tools & Home Improvement',
  'Toys & Games',
  'Under $10',
  'Video Games',
  'Whole Foods Market',
]

export default function Navbar() {
  const { cartCount } = useCart()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '')
  const [menuOpen, setMenuOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [dealsOpen, setDealsOpen] = useState(false)
  const [deliverOpen, setDeliverOpen] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q != null) setQuery(q)
  }, [searchParams])

  function handleSearch(e) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
  }

  function handleDepartment(dept) {
    setMenuOpen(false)
    navigate(dept === 'All' ? '/' : `/search?q=${encodeURIComponent(dept)}`)
  }

  const firstName = user?.displayName?.split(' ')[0] || user?.email || ''

  async function handleSignOut() {
    setAccountOpen(false)
    await signOut()
    navigate('/')
  }

  return (
    <header className="navbar">
      <div className="navbar-main">
        <Link className="nav-logo" to="/" aria-label="Amazon home">
          amazon
        </Link>

        <button className="nav-deliver" type="button" onClick={() => setDeliverOpen(true)}>
          <svg className="nav-icon nav-icon-pin" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5A2.5 2.5 0 0 1 9.5 9 2.5 2.5 0 0 1 12 6.5 2.5 2.5 0 0 1 14.5 9 2.5 2.5 0 0 1 12 11.5"
            />
          </svg>
          <span className="nav-deliver-text">
            <span className="nav-deliver-label">Deliver to</span>
            <span className="nav-deliver-place">Raleigh 27606</span>
          </span>
        </button>

        <form className="nav-search" role="search" onSubmit={handleSearch}>
          <select className="nav-search-select" aria-label="Search in">
            {searchDepartments.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
          <input
            className="nav-search-input"
            type="text"
            placeholder="Search Amazon"
            aria-label="Search Amazon"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="nav-search-btn" type="submit" aria-label="Search">
            <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14"
              />
            </svg>
          </button>
        </form>

        {user ? (
          <div className="nav-account">
            <button
              className="nav-item nav-item-btn"
              type="button"
              aria-haspopup="true"
              aria-expanded={accountOpen}
              onClick={() => setAccountOpen((open) => !open)}
            >
              <span className="nav-item-label">
                Hello, {firstName || 'there'}
              </span>
              <span className="nav-item-value">Account &amp; Lists</span>
            </button>
            {accountOpen && (
              <>
                <div
                  className="nav-menu-backdrop"
                  onClick={() => setAccountOpen(false)}
                />
                <ul className="nav-menu-list nav-account-menu" role="menu">
                  <li className="nav-account-head">{user.email}</li>
                  <li>
                    <Link
                      className="nav-menu-item"
                      to="/orders"
                      onClick={() => setAccountOpen(false)}
                    >
                      Your Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      className="nav-menu-item"
                      type="button"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        ) : (
          <Link className="nav-item" to="/signin">
            <span className="nav-item-label">Hello, sign in</span>
            <span className="nav-item-value">Account &amp; Lists</span>
          </Link>
        )}

        <Link className="nav-item" to="/orders">
          <span className="nav-item-label">Returns</span>
          <span className="nav-item-value">&amp; Orders</span>
        </Link>

        <Link className="nav-cart" to="/cart">
          <svg className="nav-cart-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21 4H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2"
            />
          </svg>
          <span className="nav-cart-text">Cart</span>
          <span className="nav-cart-count">{cartCount}</span>
        </Link>
      </div>

      <nav className="navbar-sub" aria-label="Departments">
        <div className="nav-menu">
          <button
            className="nav-all"
            type="button"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg className="nav-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z" />
            </svg>
            All
          </button>
          {menuOpen && (
            <>
              <div className="nav-menu-backdrop" onClick={() => setMenuOpen(false)} />
              <ul className="nav-menu-list" role="menu">
                {searchDepartments.map((dept) => (
                  <li key={dept}>
                    <button
                      className="nav-menu-item"
                      type="button"
                      onClick={() => handleDepartment(dept)}
                    >
                      {dept}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        {departments.map((dept) =>
          dept === 'Sell' ? (
            <Link className="nav-sub-link" key={dept} to="/sell">
              {dept}
            </Link>
          ) : dept === "Today's Deals" ? (
            <Link className="nav-sub-link" key={dept} to="/deals">
              {dept}
            </Link>
          )           : dept === 'Gift Cards' ? (
            <Link className="nav-sub-link" key={dept} to="/gift-cards">
              {dept}
            </Link>
          )           : dept === 'Customer Service' ? (
            <Link className="nav-sub-link" key={dept} to="/customer-service">
              {dept}
            </Link>
          ) : dept === 'Registry' ? (
            <Link className="nav-sub-link" key={dept} to="/registry">
              {dept}
            </Link>
          ) : (
            <a className="nav-sub-link" key={dept} href="#">
              {dept}
            </a>
          ),
        )}
        <button
          className="nav-sub-link nav-sub-link-deals"
          type="button"
          onClick={() => setDealsOpen(true)}
        >
          Shop deals in Electronics
        </button>
      </nav>

      {deliverOpen && (
        <div className="nav-popup-backdrop" onClick={() => setDeliverOpen(false)}>
          <div className="nav-popup" role="dialog" aria-modal="true">
            <h2>Sorry, we only deliver to Raleigh...</h2>
          </div>
        </div>
      )}

      {dealsOpen && (
        <div className="nav-popup-backdrop" onClick={() => setDealsOpen(false)}>
          <div className="nav-popup" role="dialog" aria-modal="true">
            <h2>Why did you click here??</h2>
          </div>
        </div>
      )}
    </header>
  )
}
