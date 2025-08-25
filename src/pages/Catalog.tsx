import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { teas, teaCategories, teaSubcategories, getSubcategoriesByCategory } from '../data/teaData'
import { useCartStore } from '../stores/cartStore'
import './Catalog.css'

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const { addToCart } = useCartStore()

  const filteredTeas = teas.filter(tea => {
    const matchesCategory = selectedCategory === 'all' || tea.category === selectedCategory
    const matchesSubcategory = !selectedSubcategory || tea.subcategory === selectedSubcategory
    const matchesSearch = tea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tea.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSubcategory && matchesSearch
  })

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedSubcategory('') // Сбрасываем выбранный подвид
  }

  const handleSubcategorySelect = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId)
  }

  const handleAddToCart = (tea: any) => {
    addToCart({
      id: tea.id,
      name: tea.name,
      price: tea.price,
      image: tea.image
    })
  }

  const currentSubcategories = selectedCategory !== 'all' ? getSubcategoriesByCategory(selectedCategory) : []

  return (
    <div className="page catalog-page">
      <div className="container">
        <h1 className="page-title">🍵 Каталог чая</h1>
        
        <div className="catalog-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск чая..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="category-filters">
            {teaCategories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>

          {selectedCategory !== 'all' && currentSubcategories.length > 0 && (
            <div className="subcategory-filters">
              <h3>Выберите подвид:</h3>
              <div className="subcategory-buttons">
                <button
                  className={`subcategory-btn ${selectedSubcategory === '' ? 'active' : ''}`}
                  onClick={() => handleSubcategorySelect('')}
                >
                  Все {teaCategories.find(c => c.id === selectedCategory)?.name}
                </button>
                {currentSubcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    className={`subcategory-btn ${selectedSubcategory === subcategory.id ? 'active' : ''}`}
                    onClick={() => handleSubcategorySelect(subcategory.id)}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="results-info">
          <p>Найдено чаев: {filteredTeas.length}</p>
          {selectedCategory !== 'all' && (
            <p>Категория: {teaCategories.find(c => c.id === selectedCategory)?.name}</p>
          )}
          {selectedSubcategory && (
            <p>Подвид: {currentSubcategories.find(s => s.id === selectedSubcategory)?.name}</p>
          )}
        </div>

        {filteredTeas.length === 0 ? (
          <div className="no-results">
            <h3>😔 Ничего не найдено</h3>
            <p>Попробуйте изменить параметры поиска или категорию</p>
          </div>
        ) : (
          <div className="teas-grid">
            {filteredTeas.map((tea) => (
              <div key={tea.id} className="tea-card">
                <div className="tea-image">{tea.image}</div>
                <div className="tea-info">
                  <h3 className="tea-name">{tea.name}</h3>
                  <p className="tea-description">{tea.description}</p>
                  
                  <div className="tea-details">
                    <div className="tea-meta">
                      <span className="tea-origin">{tea.origin}</span>
                      <span className="tea-rating">⭐ {tea.rating}</span>
                    </div>
                    <div className="tea-specs">
                      <span className="tea-weight">{tea.weight}г</span>
                      <span className={`tea-caffeine caffeine-${tea.caffeine}`}>
                        {tea.caffeine === 'high' ? '☕☕☕' : 
                         tea.caffeine === 'medium' ? '☕☕' : 
                         tea.caffeine === 'low' ? '☕' : '🫖'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="tea-price">{tea.price} ₽</div>
                  
                  <div className="tea-actions">
                    <Link to={`/product/${tea.id}`} className="btn btn-secondary">
                      Подробнее
                    </Link>
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(tea)}
                      disabled={!tea.inStock}
                    >
                      {tea.inStock ? 'В корзину' : 'Нет в наличии'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Catalog
