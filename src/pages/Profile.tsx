import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFirebaseFavoritesStore } from '../stores/firebaseFavoritesStore'
import { teas } from '../data/teaData'
import { getTelegramUser } from '../utils/telegram'
import './Profile.css'

const Profile: React.FC = () => {
  const { 
    favorites, 
    removeFromFavorites, 
    isLoading, 
    error, 
    initializeWithTelegramId 
  } = useFirebaseFavoritesStore()
  
  // Получаем избранные чаи
  const favoriteTeas = teas.filter(tea => favorites.includes(tea.id))

  // Инициализируем Firebase при загрузке
  useEffect(() => {
    const telegramUser = getTelegramUser()
    if (telegramUser?.id) {
      initializeWithTelegramId(telegramUser.id)
    }
  }, [initializeWithTelegramId])

  if (isLoading) {
    return (
      <div className="page profile-page">
        <div className="container">
          <div className="loading-state">
            <h2>Загружаем избранное...</h2>
            <p>Пожалуйста, подождите</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page profile-page">
        <div className="container">
          <div className="error-state">
            <h2>Ошибка загрузки</h2>
            <p>{error}</p>
            <button 
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page profile-page">
      <div className="container">
        <h1 className="page-title">👤 Профиль</h1>
        
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-sections">
              <div className="profile-section">
                <h3>📋 Мои заказы</h3>
                <div className="empty-state">
                  <p>У вас пока нет заказов</p>
                  <p>Сделайте первый заказ в нашем каталоге!</p>
                </div>
              </div>
              
              <div className="profile-section">
                <h3>❤️ Избранное</h3>
                {favoriteTeas.length === 0 ? (
                  <div className="empty-state">
                    <p>Добавляйте любимые чаи в избранное</p>
                    <p>И мы будем рекомендовать похожие сорта</p>
                  </div>
                ) : (
                  <div className="favorites-list">
                    <p className="favorites-count">В избранном: {favoriteTeas.length} чаев</p>
                    <div className="favorites-grid">
                      {favoriteTeas.map((tea) => (
                        <div key={tea.id} className="favorite-tea-card">
                          <div className="favorite-tea-image">{tea.image}</div>
                          <div className="favorite-tea-info">
                            <h4 className="favorite-tea-name">{tea.name}</h4>
                            <p className="favorite-tea-price">{tea.price} ₽</p>
                            <div className="favorite-tea-actions">
                              <Link to={`/product/${tea.id}`} className="btn btn-secondary btn-sm">
                                Подробнее
                              </Link>
                              <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => removeFromFavorites(tea.id)}
                              >
                                Убрать
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile


