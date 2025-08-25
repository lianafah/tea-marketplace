import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../stores/cartStore'
import './Header.css'

const Header: React.FC = () => {
  const location = useLocation()
  const { cartItems } = useCartStore()
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            Alfrerov tea
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Главная
            </Link>
            <Link 
              to="/catalog" 
              className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
            >
              Каталог
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
            >
              Профиль
            </Link>
          </nav>

          <Link to="/cart" className="cart-button">
            🛒 Корзина
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header

