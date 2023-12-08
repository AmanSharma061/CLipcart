import { useContext, useState } from 'react'
import cartContext from './cartContext'

const CartContextProvider = ({ children }) => {
  const [ID, setID] = useState([])
  const [ckeckoutCartProducts, setCheckoutCartProducts] = useState([])

  const [total, settotal] = useState(0)
  const [cartProducts, setCartProducts] = useState([])
  const [cartLength, setCartLength] = useState(0)
  return (
    <cartContext.Provider
      value={{
        ID,
        setID,

        ckeckoutCartProducts,
        setCheckoutCartProducts,
        total,
        settotal,
        cartLength,
        setCartLength,
        cartProducts,
        setCartProducts
      }}
    >
      {children}
    </cartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(cartContext)
}

export default CartContextProvider
