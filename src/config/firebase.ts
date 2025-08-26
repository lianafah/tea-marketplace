import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Конфигурация Firebase для проекта "alferov-tea"
const firebaseConfig = {
  apiKey: "AIzaSyCqtkCxjL82hqd1SERu_ohQ4NcH7QivXgU",
  authDomain: "alferov-tea.firebaseapp.com",
  projectId: "alferov-tea",
  storageBucket: "alferov-tea.firebasestorage.app",
  messagingSenderId: "959389801989",
  appId: "1:959389801989:web:61f7a00e1b176722e7466c",
  measurementId: "G-0BBWE4KQPW"
}

// Инициализация Firebase
const app = initializeApp(firebaseConfig)

// Получаем сервисы
export const db = getFirestore(app)
export const auth = getAuth(app)

export default app
