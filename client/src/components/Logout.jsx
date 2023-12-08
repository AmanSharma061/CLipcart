import React, { useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext/authContextProvider'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/Cart/cartContextProvider'
function Logout () {
  const Navigate = useNavigate()
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const { cartLength, setCartLength } = useCart()

  const { cartProducts, setCartProducts } = useCart()
  const { total, setTotal } = useCart()

  const LogoutHandler = async () => {
    const response = await fetch('/api/logout', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await response.json()
  
    setIsAuthenticated(false)
    toast.success(data.message, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false
    })
    localStorage.removeItem('storageToken')
    let pp=localStorage.getItem('cartProducts')
    pp=JSON.parse(pp)
    pp=[]
    localStorage.setItem('cartProducts',JSON.stringify(pp))
    setCartLength(0)

    // setIsAuthenticated(false)1
  }
  useEffect(() => {
    LogoutHandler()
    Navigate('/login')
  }, [])
  return <div></div>
}

export default Logout
