import { useCallback, useEffect, useMemo, useState } from 'react'
import { CartContext } from './cart.js'

const CART_KEY = 'amazon-clone-cart'
const SAVED_KEY = 'amazon-clone-saved'

function load(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => load(CART_KEY))
  const [saved, setSaved] = useState(() => load(SAVED_KEY))

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
  }, [saved])

  const addToCart = useCallback((product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity <= 0) {
        removeFromCart(id)
        return
      }
      setCart((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
      )
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const saveForLater = useCallback(
    (id) => {
      const item = cart.find((i) => i.id === id)
      if (!item) return
      setCart((prev) => prev.filter((i) => i.id !== id))
      setSaved((prev) => {
        const existing = prev.find((i) => i.id === id)
        if (existing) {
          return prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
          )
        }
        return [...prev, item]
      })
    },
    [cart],
  )

  const moveToCart = useCallback(
    (id) => {
      const item = saved.find((i) => i.id === id)
      if (!item) return
      setSaved((prev) => prev.filter((i) => i.id !== id))
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id)
        if (existing) {
          return prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i,
          )
        }
        return [...prev, item]
      })
    },
    [saved],
  )

  const removeSaved = useCallback((id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const value = useMemo(() => {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    return {
      cart,
      cartCount,
      subtotal,
      saved,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      saveForLater,
      moveToCart,
      removeSaved,
    }
  }, [
    cart,
    saved,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    saveForLater,
    moveToCart,
    removeSaved,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
