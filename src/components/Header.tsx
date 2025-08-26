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
          <div className="header-left">
            {/* Пустое место вместо логотипа */}
          </div>

          <div className="header-center">
            {/* Центральная часть пустая */}
          </div>

          <div className="header-right">
            <Link
              to="/catalog"
              className={`nav-link ${isActive('/catalog') ? 'active' : ''}`}
              data-emoji="🍃"
            >
              Каталог
            </Link>

            <Link
              to="/profile"
              className={`nav-link ${isActive('/profile') ? 'active' : ''}`}
              data-emoji="👤"
            >
              Профиль
            </Link>

            <Link
              to="/cart"
              className={`nav-link ${isActive('/cart') ? 'active' : ''}`}
              data-emoji="🛒"
            >
              <div className="cart-icon-container">
                {cartItemsCount > 0 && (
                  <span className="cart-badge">{cartItemsCount}</span>
                )}
              </div>
              Корзина
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

