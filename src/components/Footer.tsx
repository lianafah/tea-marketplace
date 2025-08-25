import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🍵 Чайный Мир</h3>
            <p>Лучшие сорта чая для истинных ценителей</p>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>📧 info@tea-world.ru</p>
            <p>📱 +7 (999) 123-45-67</p>
          </div>
          
          <div className="footer-section">
            <h4>Информация</h4>
            <p>О компании</p>
            <p>Доставка</p>
            <p>Оплата</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Чайный Мир. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


