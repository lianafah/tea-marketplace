import React from 'react'
import { Link } from 'react-router-dom'
import { teas, teaCategories } from '../data/teaData'
import { useFavoritesStore } from '../stores/favoritesStore'
import './Home.css'

const Home: React.FC = () => {
  const popularTeas = teas.slice(0, 6)
  const { isFavorite, toggleFavorite } = useFavoritesStore()

  return (
    <div className="page home-page">
      <div className="container">
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Alferov tea</h1>
            <p className="hero-motto">
              Замедляйся. Слушай. Пробуй. Исследуй.
            </p>
            <p className="hero-description">
              Здесь вы найдёте разные виды чая — от классики до редких сортов. 
              Каждый чай имеет свой характер, аромат и настроение, 
              которые можно почувствовать в каждой чашке.
            </p>
            <div className="hero-button-container">
              <Link to="/catalog" className="btn btn-primary hero-btn">
                Перейти в каталог
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="tea-elements">
              <div className="tea-cup">☕</div>
              <div className="tea-leaves">🍃</div>
              <div className="tea-pot">🫖</div>
            </div>
          </div>
        </div>

        <section className="categories-section">
          <h2 className="section-title">Наши категории чая</h2>
          <div className="categories-grid">
            {teaCategories.filter(cat => cat.id !== 'all').map((category) => (
              <Link key={category.id} to={`/catalog?category=${category.id}`} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <p>
                  {category.id === 'gaba' && 'Эксклюзивные габа чаи с Тайваня'}
                  {category.id === 'pu-erh' && 'Традиционные китайские пуэры'}
                  {category.id === 'oolong' && 'Утонченные улуны из Фуцзяни'}
                </p>
                <span className="category-arrow">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="popular-section">
          <h2 className="section-title">Популярные чаи</h2>
          <div className="teas-grid">
            {popularTeas.map((tea) => (
              <div key={tea.id} className="tea-card">
                <div className="tea-image-container">
                  <div className="tea-image">{tea.image}</div>
                  <button 
                    className={`favorite-btn ${isFavorite(tea.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      toggleFavorite(tea.id)
                    }}
                    aria-label={isFavorite(tea.id) ? 'Убрать из избранного' : 'Добавить в избранное'}
                  >
                    {isFavorite(tea.id) ? '❤️' : '🤍'}
                  </button>
                </div>
                <div className="tea-info">
                  <h3 className="tea-name">{tea.name}</h3>
                  <p className="tea-description">{tea.description}</p>
                  <div className="tea-meta">
                    <span className="tea-origin">{tea.origin}</span>
                    <span className="tea-rating">⭐ {tea.rating}</span>
                  </div>
                  <div className="tea-price">{tea.price} ₽</div>
                  <Link to={`/product/${tea.id}`} className="btn btn-primary">
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/catalog" className="btn btn-secondary">
              Смотреть все чаи
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
