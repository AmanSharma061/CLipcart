import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

import { ThemeProvider } from '@material-tailwind/react'
import { Provider } from 'react'
import SingleContextProvider from './contexts/singleProduct/singleContextProvider.jsx'
import CartContextProvider from './contexts/Cart/cartContextProvider.jsx'
import AuthContextProvider from './contexts/AuthContext/authContextProvider.jsx'
// import { Auth0Provider } from '@auth0/auth0-react'
ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <SingleContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </SingleContextProvider>
  </AuthContextProvider>
)
1
