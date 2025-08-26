import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🍵 Alferov tea</h3>
            <p>Чай согреет ваше сердечко</p>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <p>📧 info@alferov-tea.ru</p>
            <p>📱 +7 (999) 123-45-67</p>
          </div>
          
          <div className="footer-section">
            <h4>Информация</h4>
            <p>Адрес</p>
            <p>Доставка</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Alferov tea. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


