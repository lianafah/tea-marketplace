import React from 'react'
import './Profile.css'

const Profile: React.FC = () => {
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
                <div className="empty-state">
                  <p>Добавляйте любимые чаи в избранное</p>
                  <p>И мы будем рекомендовать похожие сорта</p>
                </div>
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


