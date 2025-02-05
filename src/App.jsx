
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

function App() {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className='body'>
      <Header />
      <Outlet />
      <Footer/>
    </main>
  )
}

export default App
