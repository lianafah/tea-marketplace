import { create } from 'zustand'
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  query, 
  where,
  onSnapshot 
} from 'firebase/firestore'
import { db } from '../config/firebase'

interface FirebaseFavoritesStore {
  favorites: number[]
  isLoading: boolean
  error: string | null
  
  // Инициализация с Telegram ID
  initializeWithTelegramId: (telegramId: number) => Promise<void>
  
  // Основные функции
  addToFavorites: (teaId: number) => Promise<void>
  removeFromFavorites: (teaId: number) => Promise<void>
  isFavorite: (teaId: number) => boolean
  toggleFavorite: (teaId: number) => Promise<void>
  
  // Синхронизация
  syncFavorites: () => Promise<void>
}

export const useFirebaseFavoritesStore = create<FirebaseFavoritesStore>((set, get) => ({
  favorites: [],
  isLoading: false,
  error: null,
  
  initializeWithTelegramId: async (telegramId: number) => {
    try {
      set({ isLoading: true, error: null })
      
      // Подписываемся на изменения в реальном времени
      const userFavoritesRef = collection(db, 'userFavorites')
      const userQuery = query(userFavoritesRef, where('telegramId', '==', telegramId))
      
      onSnapshot(userQuery, (snapshot) => {
        const favorites: number[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          if (data.teaId) {
            favorites.push(data.teaId)
          }
        })
        set({ favorites, isLoading: false })
      })
      
    } catch (error) {
      set({ 
        error: `Ошибка инициализации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        isLoading: false 
      })
    }
  },
  
  addToFavorites: async (teaId: number) => {
    try {
      const { favorites } = get()
      if (favorites.includes(teaId)) return
      
      // Получаем Telegram ID пользователя
      const telegramId = getTelegramUserId()
      if (!telegramId) {
        throw new Error('Telegram ID не найден')
      }
      
      // Добавляем в Firebase
      const userFavoritesRef = collection(db, 'userFavorites')
      const favoriteDoc = doc(userFavoritesRef, `${telegramId}_${teaId}`)
      
      await setDoc(favoriteDoc, {
        telegramId,
        teaId,
        addedAt: new Date().toISOString()
      })
      
      // Обновляем локальное состояние
      set({ favorites: [...favorites, teaId] })
      
    } catch (error) {
      set({ 
        error: `Ошибка добавления: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` 
      })
    }
  },
  
  removeFromFavorites: async (teaId: number) => {
    try {
      const { favorites } = get()
      if (!favorites.includes(teaId)) return
      
      // Получаем Telegram ID пользователя
      const telegramId = getTelegramUserId()
      if (!telegramId) {
        throw new Error('Telegram ID не найден')
      }
      
      // Удаляем из Firebase
      const userFavoritesRef = collection(db, 'userFavorites')
      const favoriteDoc = doc(userFavoritesRef, `${telegramId}_${teaId}`)
      
      await deleteDoc(favoriteDoc)
      
      // Обновляем локальное состояние
      set({ favorites: favorites.filter(id => id !== teaId) })
      
    } catch (error) {
      set({ 
        error: `Ошибка удаления: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}` 
      })
    }
  },
  
  isFavorite: (teaId: number) => {
    return get().favorites.includes(teaId)
  },
  
  toggleFavorite: async (teaId: number) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = get()
    if (isFavorite(teaId)) {
      await removeFromFavorites(teaId)
    } else {
      await addToFavorites(teaId)
    }
  },
  
  syncFavorites: async () => {
    try {
      set({ isLoading: true, error: null })
      
      const telegramId = getTelegramUserId()
      if (!telegramId) {
        throw new Error('Telegram ID не найден')
      }
      
      // Загружаем избранное из Firebase
      const userFavoritesRef = collection(db, 'userFavorites')
      const userQuery = query(userFavoritesRef, where('telegramId', '==', telegramId))
      const snapshot = await getDocs(userQuery)
      
      const favorites: number[] = []
      snapshot.forEach((doc) => {
        const data = doc.data()
        if (data.teaId) {
          favorites.push(data.teaId)
        }
      })
      
      set({ favorites, isLoading: false })
      
    } catch (error) {
      set({ 
        error: `Ошибка синхронизации: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`,
        isLoading: false 
      })
    }
  }
}))

// Функция для получения Telegram ID пользователя
function getTelegramUserId(): number | null {
  try {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.id) {
      return window.Telegram.WebApp.initDataUnsafe.user.id
    }
    return null
  } catch {
    return null
  }
}
