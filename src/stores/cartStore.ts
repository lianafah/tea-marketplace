import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      
      addToCart: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id)
          
          if (existingItem) {
            return {
              cartItems: state.cartItems.map(cartItem =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            }
          }
          
          return {
            cartItems: [...state.cartItems, { ...item, quantity: 1 }]
          }
        })
      },
      
      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.id !== id)
        }))
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id)
          return
        }
        
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },
      
      clearCart: () => {
        set({ cartItems: [] })
      },
      
      getTotalPrice: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      },
      
      getTotalItems: () => {
        const { cartItems } = get()
        return cartItems.reduce((total, item) => total + item.quantity, 0)
      }
    }),
    {
      name: 'tea-cart-storage'
    }
  )
)

