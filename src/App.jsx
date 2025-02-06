
import './App.css'
import Header from './components/Header'
import ProductList from './components/ProductList'
import Footer from './components/Footer'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'

function App() {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className='body'>
    <Provider store={store}>
      <Header />
      <Outlet />
    </Provider>
      <Footer/>
    </main>
  )
}

export default App
