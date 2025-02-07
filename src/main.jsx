import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Error from './components/Error.jsx'
import Cart from './components/Cart.jsx'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<Error/>,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "productDetails/:id",
        element: <ProductDetails />,
      },
      {
        path: ":category",
        element: <ProductList />,
      },
      {
        path:"/cart",
        element:<Cart/>
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
