import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTeaById } from '../data/teaData'
import { useCartStore } from '../stores/cartStore'
import { useFirebaseFavoritesStore } from '../stores/firebaseFavoritesStore'
import './Product.css'

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { isFavorite, toggleFavorite } = useFirebaseFavoritesStore()
  const [quantity, setQuantity] = useState(1)

  const tea = getTeaById(Number(id))

  if (!tea) {
    return (
      <div className="page product-page">
        <div className="container">
          <div className="product-not-found">
            <h1>😔 Товар не найден</h1>
            <p>К сожалению, такой чай не найден в нашем каталоге</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/catalog')}
            >
              Вернуться в каталог
            </button>
          </div>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: tea.id,
      name: tea.name,
      price: tea.price,
      image: tea.image
    })
    navigate('/cart')
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="page product-page">
      <div className="container">
        <div className="product-content">
          <div className="product-image-section">
            <div className="product-image-container">
              <div className="product-image">{tea.image}</div>
              <button 
                className={`favorite-btn ${isFavorite(tea.id) ? 'active' : ''}`}
                onClick={() => toggleFavorite(tea.id)}
                aria-label={isFavorite(tea.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
              >
                {isFavorite(tea.id) ? '❤️' : '🤍'}
              </button>
            </div>
            <div className="product-badges">
              <span className="badge origin">{tea.origin}</span>
              <span className="badge weight">{tea.weight}г</span>
            </div>
          </div>

          <div className="product-info-section">
            <h1 className="product-title">{tea.name}</h1>
            <p className="product-description">{tea.description}</p>
            
            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Тип чая:</span>
                <span className="spec-value">{tea.type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Происхождение:</span>
                <span className="spec-value">{tea.origin}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Кофеин:</span>
                <span className="spec-value">
                  {tea.caffeine === 'high' ? 'Высокий ☕☕☕' : 
                   tea.caffeine === 'medium' ? 'Средний ☕☕' : 
                   tea.caffeine === 'low' ? 'Низкий ☕' : 'Без кофеина 🫖'}
                </span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Вес:</span>
                <span className="spec-value">{tea.weight} грамм</span>
              </div>
            </div>

            <div className="product-price-section">
              <div className="product-price">{tea.price} ₽</div>
              <div className="product-availability">
                {tea.inStock ? (
                  <span className="in-stock">✅ В наличии</span>
                ) : (
                  <span className="out-of-stock">❌ Нет в наличии</span>
                )}
              </div>
            </div>

            {tea.inStock && (
              <div className="product-actions">
                <div className="quantity-selector">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-value">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="btn btn-primary add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  🛒 Добавить в корзину
                </button>
              </div>
            )}

            <div className="product-navigation">
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/catalog')}
              >
                ← Назад в каталог
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => navigate('/cart')}
              >
                🛒 Перейти в корзину
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product


