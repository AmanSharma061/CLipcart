import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
// import '@radix-ui/themes/styles.css'

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/Signup'
import Cart from './components/Cart'
import CheckoutPage from './components/CheckoutPage'
import SingleProduct from './components/SingleProduct'
import About from './components/About'
import { useCart } from './contexts/Cart/cartContextProvider'
import Address from './components/Address'
import Logout from './components/Logout'
import Contact from './components/Contact'
import OrderSuccess from './components/OrderSuccess'
function App () {
  const { count, setCount } = useCart()

  return (
    <>
      <Router>
        <Navbar count={count} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/product' element={<SingleProduct />} />
          <Route path='/address' element={<Address />} />
          <Route path="/contact" element={<Contact  />} />
          <Route path='/success' element ={<OrderSuccess/>} />
          
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App
