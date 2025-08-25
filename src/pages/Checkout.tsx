import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import './Checkout.css'

const Checkout: React.FC = () => {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCartStore()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Здесь будет логика отправки заказа
    alert('Заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.')
    
    // Очищаем корзину и переходим на главную
    clearCart()
    navigate('/')
  }

  if (cartItems.length === 0) {
    return (
      <div className="page checkout-page">
        <div className="container">
          <div className="empty-checkout">
            <h1>🛒 Оформление заказа</h1>
            <p>Ваша корзина пуста</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/catalog')}
            >
              Перейти в каталог
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page checkout-page">
      <div className="container">
        <h1 className="page-title">🛒 Оформление заказа</h1>
        
        <div className="checkout-content">
          <div className="checkout-form">
            <h2>Данные для доставки</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Имя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Введите ваше имя"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Телефон *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+7 (999) 123-45-67"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="address">Адрес доставки *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  placeholder="Введите полный адрес доставки"
                  rows={3}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Комментарий к заказу</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Дополнительная информация к заказу"
                  rows={3}
                />
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                🚀 Оформить заказ
              </button>
            </form>
          </div>
          
          <div className="order-summary">
            <h2>Ваш заказ</h2>
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <span className="item-price">{item.price * item.quantity} ₽</span>
                </div>
              ))}
            </div>
            
            <div className="order-total">
              <span>Итого:</span>
              <span className="total-price">{getTotalPrice()} ₽</span>
            </div>
            
            <div className="delivery-info">
              <h3>🚚 Доставка</h3>
              <p>Стандартная доставка: <strong>Бесплатно</strong></p>
              <p>Срок доставки: <strong>1-3 дня</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout


