import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesStore {
  favorites: number[] // массив ID избранных чаев
  addToFavorites: (teaId: number) => void
  removeFromFavorites: (teaId: number) => void
  isFavorite: (teaId: number) => boolean
  toggleFavorite: (teaId: number) => void
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addToFavorites: (teaId: number) => {
        set((state) => ({
          favorites: [...state.favorites, teaId]
        }))
      },
      
      removeFromFavorites: (teaId: number) => {
        set((state) => ({
          favorites: state.favorites.filter(id => id !== teaId)
        }))
      },
      
      isFavorite: (teaId: number) => {
        return get().favorites.includes(teaId)
      },
      
      toggleFavorite: (teaId: number) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get()
        if (isFavorite(teaId)) {
          removeFromFavorites(teaId)
        } else {
          addToFavorites(teaId)
        }
      }
    }),
    {
      name: 'favorites-storage'
    }
  )
)
