import { useState } from 'react'
import SingleContext from './singleContext'
import { products } from '../../files/arrays'

const SingleContextProvider = ({ children }) => {
  const [single, setSingle] = useState({})
  const [loading, setLoading] = useState(false)

  const getSingle = async id => {
    try {
      if (typeof id != 'number') {
        const response = await fetch(
          `https://api.pujakaitem.com/api/products?id=${id}`
        )

        const data = await response.json()
        setSingle(data)
      } else {
        const response = products.filter(product => {
          return product.id === id
        })
        // const res = {response}

        setSingle(response)
      }

      // console.log(single)
    } catch (err) {
      let x = true
      setLoading(x)
      console.log(err)
    }
  }

  return (
    <SingleContext.Provider value={{ single, getSingle, loading }}>
      {children}
    </SingleContext.Provider>
  )
}

export default SingleContextProvider
