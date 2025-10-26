import { useState } from 'react'
import Header from './components/Header'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log('Buscando:', query)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <main className="app__main">
        <div className="app__container">
          <h1>Catálogo de Productos</h1>
          {searchQuery && (
            <p>Buscando: <strong>{searchQuery}</strong></p>
          )}
          <p>Proyecto en desarrollo...</p>
        </div>
      </main>
    </div>
  )
}

export default App
