
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './utils/store'

function App() {
  // const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className='body'>
      <Provider store={store}>
        <div className='w-full h-auto'>
          <Header />
          <Outlet />
        </div>
      </Provider>
      <Footer />
    </main>
  )
}

export default App
