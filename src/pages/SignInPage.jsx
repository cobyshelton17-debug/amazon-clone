import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth.js'
import './SignInPage.css'

export default function SignInPage() {
  const { signIn, signUp } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (mode === 'signin') {
        await signIn(email, password)
      } else {
        await signUp(name, email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page">
      <div className="signin-panel">
        <div className="signin-form-wrap">
          {mode === 'signin' ? (
            <>
              <h1 className="signin-title">Sign in</h1>
              <form className="signin-form" onSubmit={handleSubmit}>
                <label className="signin-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="signin-field">
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    autoComplete="current-password"
                    required
                  />
                </label>
                {error && <p className="signin-error">{error}</p>}
                <button
                  className="signin-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
              <p className="signin-switch">
                New to amazon-clone?{' '}
                <button type="button" onClick={() => setMode('signup')}>
                  Create your account
                </button>
              </p>
            </>
          ) : (
            <>
              <h1 className="signin-title">Create account</h1>
              <form className="signin-form" onSubmit={handleSubmit}>
                <label className="signin-field">
                  <span>Your name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First and last name"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="signin-field">
                  <span>Email</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </label>
                <label className="signin-field">
                  <span>Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />
                </label>
                {error && <p className="signin-error">{error}</p>}
                <button
                  className="signin-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? 'Creating account...' : 'Create your account'}
                </button>
              </form>
              <p className="signin-switch">
                Already have an account?{' '}
                <button type="button" onClick={() => setMode('signin')}>
                  Sign in
                </button>
              </p>
            </>
          )}
          <p className="signin-legal">
            By continuing, you agree to amazon-clone's Conditions of Use and
            Privacy Notice.
          </p>
          <Link className="signin-back" to="/">
            ← Back to shopping
          </Link>
        </div>
      </div>
    </main>
  )
}
