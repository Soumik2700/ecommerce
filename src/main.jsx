import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductList from './components/ProductList.jsx'
import Error from './components/Error.jsx'

const ProductDetails = lazy(()=>import("./components/ProductDetails.jsx"));
const Cart = lazy(()=> import("./components/Cart.jsx"));

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
        element: <Suspense><ProductDetails /></Suspense>,
      },
      {
        path: ":category",
        element: <ProductList />,
      },
      {
        path:"/cart",
        element: <Suspense><Cart /></Suspense>
      }
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
