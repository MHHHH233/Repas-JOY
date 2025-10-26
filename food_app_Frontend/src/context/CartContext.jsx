"use client"

import { createContext, useContext, useState, useCallback } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0 })

  const calculateTotal = useCallback((items) => {
    return items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  }, [])

  const addToCart = useCallback(
    (menuItem, quantity) => {
      setCart((prevCart) => {
        const existingItem = prevCart.items.find((item) => item.menuItem.id === menuItem.id)

        let newItems
        if (existingItem) {
          newItems = prevCart.items.map((item) =>
            item.menuItem.id === menuItem.id ? { ...item, quantity: item.quantity + quantity } : item,
          )
        } else {
          newItems = [...prevCart.items, { id: menuItem.id, menuItem, quantity }]
        }

        return { items: newItems, total: calculateTotal(newItems) }
      })
    },
    [calculateTotal],
  )

  const removeFromCart = useCallback(
    (itemId) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.filter((item) => item.menuItem.id !== itemId)
        return { items: newItems, total: calculateTotal(newItems) }
      })
    },
    [calculateTotal],
  )

  const updateQuantity = useCallback(
    (itemId, quantity) => {
      setCart((prevCart) => {
        const newItems = prevCart.items.map((item) => (item.menuItem.id === itemId ? { ...item, quantity } : item))
        return { items: newItems, total: calculateTotal(newItems) }
      })
    },
    [calculateTotal],
  )

  const clearCart = useCallback(() => {
    setCart({ items: [], total: 0 })
  }, [])

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
