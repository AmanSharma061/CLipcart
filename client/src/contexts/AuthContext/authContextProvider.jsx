import authContext from './authContext'
import { useState } from 'react'
import { useContext } from 'react'

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </authContext.Provider>
  )
}
export const useAuth = () => {
  return useContext(authContext)
}
export default AuthContextProvider
