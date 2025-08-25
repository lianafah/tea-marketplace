import React, { useEffect, useState } from 'react'
import { getTelegramUser, showMainButton, hideMainButton } from '../utils/telegram'
import './TelegramIntegration.css'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
}

const TelegramIntegration: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [isTelegramApp, setIsTelegramApp] = useState(false)

  useEffect(() => {
    try {
      // Проверяем, запущено ли приложение в Telegram
      const telegramUser = getTelegramUser()
      if (telegramUser) {
        setUser(telegramUser)
        setIsTelegramApp(true)
      }
    } catch (error) {
      console.log('Ошибка при инициализации Telegram:', error)
    }
  }, [])

  if (!isTelegramApp) {
    return null // Не показываем в обычном браузере
  }

  return (
    <div className="telegram-integration">
      {user && (
        <div className="user-info">
          <span className="welcome-text">
            Добро пожаловать, {user.first_name}!
          </span>
        </div>
      )}
    </div>
  )
}

export default TelegramIntegration
