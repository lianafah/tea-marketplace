export interface Tea {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  subcategory: string
  origin: string
  type: 'gaba' | 'pu-erh' | 'oolong'
  rating: number
  inStock: boolean
  weight: number // в граммах
  caffeine: 'high' | 'medium' | 'low' | 'none'
}

export const teaCategories = [
  { id: 'all', name: 'Все чаи', icon: '🍵' },
  { id: 'gaba', name: 'Габа', icon: '🌿' },
  { id: 'pu-erh', name: 'Пуэр', icon: '🟤' },
  { id: 'oolong', name: 'Улун', icon: '🟡' }
]

export const teaSubcategories = {
  gaba: [
    { id: 'gaba-1', name: 'Габа 1', description: 'Классический габа чай' },
    { id: 'gaba-2', name: 'Габа 2', description: 'Премиум габа чай' },
    { id: 'gaba-3', name: 'Габа 3', description: 'Элитный габа чай' },
    { id: 'gaba-4', name: 'Габа 4', description: 'Коллекционный габа чай' }
  ],
  'pu-erh': [
    { id: 'pu-erh-1', name: 'Пуэр 1', description: 'Традиционный пуэр' },
    { id: 'pu-erh-2', name: 'Пуэр 2', description: 'Выдержанный пуэр' }
  ],
  oolong: [
    { id: 'oolong-1', name: 'Улун 1', description: 'Легкий улун' },
    { id: 'oolong-2', name: 'Улун 2', description: 'Средний улун' },
    { id: 'oolong-3', name: 'Улун 3', description: 'Крепкий улун' }
  ]
}

export const teas: Tea[] = [
  // Габа чаи
  {
    id: 1,
    name: 'Габа 1',
    description: 'Классический габа чай с нежным травянистым вкусом и ароматом свежести. Идеально подходит для ежедневного употребления.',
    price: 1200,
    image: '🌿',
    category: 'gaba',
    subcategory: 'gaba-1',
    origin: 'Тайвань, провинция Наньтоу',
    type: 'gaba',
    rating: 4.8,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  {
    id: 2,
    name: 'Габа 2',
    description: 'Премиум габа чай с насыщенным вкусом и богатым ароматом. Отличается особой глубиной и послевкусием.',
    price: 1800,
    image: '🌿',
    category: 'gaba',
    subcategory: 'gaba-2',
    origin: 'Тайвань, провинция Наньтоу',
    type: 'gaba',
    rating: 4.9,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  {
    id: 3,
    name: 'Габа 3',
    description: 'Элитный габа чай с утонченным вкусом и изысканным ароматом. Для истинных ценителей качественного чая.',
    price: 2500,
    image: '🌿',
    category: 'gaba',
    subcategory: 'gaba-3',
    origin: 'Тайвань, провинция Наньтоу',
    type: 'gaba',
    rating: 5.0,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  {
    id: 4,
    name: 'Габа 4',
    description: 'Коллекционный габа чай высочайшего качества. Редкий сорт с неповторимым вкусом и ароматом.',
    price: 3500,
    image: '🌿',
    category: 'gaba',
    subcategory: 'gaba-4',
    origin: 'Тайвань, провинция Наньтоу',
    type: 'gaba',
    rating: 5.0,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  
  // Пуэр чаи
  {
    id: 5,
    name: 'Пуэр 1',
    description: 'Традиционный пуэр с классическим вкусом и ароматом. Идеально подходит для знакомства с этим видом чая.',
    price: 1500,
    image: '🟤',
    category: 'pu-erh',
    subcategory: 'pu-erh-1',
    origin: 'Китай, провинция Юньнань',
    type: 'pu-erh',
    rating: 4.7,
    inStock: true,
    weight: 100,
    caffeine: 'high'
  },
  {
    id: 6,
    name: 'Пуэр 2',
    description: 'Выдержанный пуэр с глубоким вкусом и сложным ароматом. Для опытных ценителей пуэра.',
    price: 2800,
    image: '🟤',
    category: 'pu-erh',
    subcategory: 'pu-erh-2',
    origin: 'Китай, провинция Юньнань',
    type: 'pu-erh',
    rating: 4.9,
    inStock: true,
    weight: 100,
    caffeine: 'high'
  },
  
  // Улун чаи
  {
    id: 7,
    name: 'Улун 1',
    description: 'Легкий улун с нежным цветочным вкусом и мягким ароматом. Отлично подходит для утреннего чаепития.',
    price: 1400,
    image: '🟡',
    category: 'oolong',
    subcategory: 'oolong-1',
    origin: 'Китай, провинция Фуцзянь',
    type: 'oolong',
    rating: 4.6,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  {
    id: 8,
    name: 'Улун 2',
    description: 'Средний улун с сбалансированным вкусом и умеренным ароматом. Идеальный выбор для любого времени дня.',
    price: 1800,
    image: '🟡',
    category: 'oolong',
    subcategory: 'oolong-2',
    origin: 'Китай, провинция Фуцзянь',
    type: 'oolong',
    rating: 4.8,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  },
  {
    id: 9,
    name: 'Улун 3',
    description: 'Крепкий улун с насыщенным вкусом и ярким ароматом. Для любителей интенсивных вкусовых ощущений.',
    price: 2200,
    image: '🟡',
    category: 'oolong',
    subcategory: 'oolong-3',
    origin: 'Китай, провинция Фуцзянь',
    type: 'oolong',
    rating: 4.7,
    inStock: true,
    weight: 100,
    caffeine: 'medium'
  }
]

export const getTeaById = (id: number): Tea | undefined => {
  return teas.find(tea => tea.id === id)
}

export const getTeasByCategory = (category: string): Tea[] => {
  if (category === 'all') return teas
  return teas.filter(tea => tea.category === category)
}

export const getTeasBySubcategory = (subcategory: string): Tea[] => {
  return teas.filter(tea => tea.subcategory === subcategory)
}

export const getSubcategoriesByCategory = (category: string) => {
  return teaSubcategories[category as keyof typeof teaSubcategories] || []
}

export const searchTeas = (query: string): Tea[] => {
  const lowerQuery = query.toLowerCase()
  return teas.filter(tea => 
    tea.name.toLowerCase().includes(lowerQuery) ||
    tea.description.toLowerCase().includes(lowerQuery) ||
    tea.origin.toLowerCase().includes(lowerQuery)
  )
}
