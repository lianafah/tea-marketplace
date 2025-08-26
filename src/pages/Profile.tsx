import React from 'react'
import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../stores/favoritesStore'
import { teas } from '../data/teaData'
import './Profile.css'

const Profile: React.FC = () => {
  const { favorites, removeFromFavorites } = useFavoritesStore()
  
  // Получаем избранные чаи
  const favoriteTeas = teas.filter(tea => favorites.includes(tea.id))

  return (
    <div className="page profile-page">
      <div className="container">
        <h1 className="page-title">👤 Профиль</h1>
        
        <div className="profile-content">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-avatar">👤</div>
              <div className="profile-info">
                <h2>Добро пожаловать!</h2>
                <p>Ваш профиль в Чайном Мире</p>
              </div>
            </div>
            
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
              
              <div className="profile-section">
                <h3>📱 Настройки</h3>
                <div className="settings-list">
                  <div className="setting-item">
                    <span>Уведомления о заказах</span>
                    <label className="switch">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="setting-item">
                    <span>Новости и акции</span>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile


