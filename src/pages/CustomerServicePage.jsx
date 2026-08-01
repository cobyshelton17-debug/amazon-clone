import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CustomerServicePage.css'

const helpTopics = [
  'Track your order',
  'Returns & refunds',
  'Manage your account',
  'Payment methods',
  'Shipping & delivery',
  'Prime membership',
]

export default function CustomerServicePage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [topic, setTopic] = useState('')
  const [message, setMessage] = useState('')
  const [showModal, setShowModal] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <main className="page">
      <div className="cs-hero">
        <h1>Customer Service</h1>
        <p>
          We're here to help. Find answers to common questions or reach out to
          our support team below.
        </p>
      </div>

      <div className="cs-layout">
        <section className="cs-help">
          <h2>Popular help topics</h2>
          <ul className="cs-topics">
            {helpTopics.map((topic) => (
              <li key={topic}>
                <Link className="cs-topic-link" to="/customer-service">
                  {topic}
                </Link>
              </li>
            ))}
          </ul>
          <div className="cs-hours">
            <h3>Contact options</h3>
            <p>
              <strong>Phone:</strong> 1-888-280-4331
            </p>
            <p>
              <strong>Live chat:</strong> Available 24/7
            </p>
            <p>
              <strong>Hours:</strong> Mon–Sun, 24 hours
            </p>
          </div>
        </section>

        <form className="cs-form" onSubmit={handleSubmit}>
          <h2>Contact us</h2>
          <label className="cs-field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <label className="cs-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="cs-field">
            <span>Topic</span>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} required>
              <option value="" disabled>
                Select a topic
              </option>
              {helpTopics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
              <option value="other">Something else</option>
            </select>
          </label>
          <label className="cs-field">
            <span>Message</span>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can we help?"
              rows={5}
              required
            />
          </label>
          <button className="cs-send-btn" type="submit">
            Send message
          </button>
        </form>
      </div>

      {showModal && (
        <div className="cs-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="cs-modal" role="dialog" aria-modal="true">
            <h2>Thanks for reaching out</h2>
            <p>
              We actually don't have any employees... So we won't be able to
              respond. Thanks for understanding!
            </p>
            <button
              className="cs-send-btn"
              type="button"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
