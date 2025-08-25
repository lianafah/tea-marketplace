import React from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import './Cart.css'

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCartStore()

  const handleQuantityChange = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
  }

  if (cartItems.length === 0) {
    return (
      <div className="page cart-page">
        <div className="container">
          <div className="empty-cart">
            <h1 className="page-title">🛒 Корзина</h1>
            <div className="empty-cart-content">
              <div className="empty-cart-icon">🛍️</div>
              <h2>Корзина пуста</h2>
              <p>Добавьте товары в корзину, чтобы сделать заказ</p>
              <Link to="/catalog" className="btn btn-primary">
                Перейти в каталог
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page cart-page">
      <div className="container">
        <h1 className="page-title">🛒 Корзина</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">{item.image}</div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price">{item.price} ₽</div>
                </div>
                
                <div className="item-quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="item-total">
                  {item.price * item.quantity} ₽
                </div>
                
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <h3>Итого</h3>
            <div className="summary-row">
              <span>Товаров:</span>
              <span>{getTotalItems()} шт.</span>
            </div>
            <div className="summary-row total">
              <span>Сумма:</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
            
            <div className="cart-actions">
              <button 
                className="btn btn-secondary"
                onClick={clearCart}
              >
                Очистить корзину
              </button>
              <Link to="/checkout" className="btn btn-primary">
                Оформить заказ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

