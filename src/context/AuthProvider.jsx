import { useEffect, useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase.js'
import { AuthContext } from './auth.js'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      signIn: (email, password) =>
        signInWithEmailAndPassword(auth, email, password),
      signUp: (name, email, password) =>
        createUserWithEmailAndPassword(auth, email, password).then(
          ({ user: u }) => updateProfile(u, { displayName: name }),
        ),
      signOut: () => signOut(auth),
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
