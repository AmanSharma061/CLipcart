import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'
import { useAuth } from '../contexts/AuthContext/authContextProvider'
import { FaRupeeSign } from 'react-icons/fa'
import { useCart } from '../contexts/Cart/cartContextProvider'
function Cart () {
  const Navigate = useNavigate
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const x = useCart()
  const { cartLength, setCartLength, setCheckoutCartProducts, settotal } =
    useCart()

  const [total, setTotal] = useState(1)
  const [size, setSize] = useState(true)
  const cartProducts = x.cartProducts
  const setCartProducts = x.setCartProducts

  let Total = 0

  const [open, setOpen] = useState(true)

  //Functions for Cart
  const remover = id => {
    let xx = localStorage.getItem('cartProducts')
    let yy = JSON.parse(xx)
    yy = yy.filter(item => item.id !== id)

    setCartProducts(yy)
    setCartLength(yy?.length)
    localStorage.setItem('cartProducts', JSON.stringify(yy))
    setSize(false)
  }
  const quantityHandler = (e, id) => {
    let xx = localStorage.getItem('cartProducts')
    let yy = JSON.parse(xx)

    yy = yy.map(item => {
      if (item.id === id) {
        item.quantity = e.target.value
        cartProducts.quantity = e.target.value
      }
      return item
    })

    setCartProducts(yy)
    setCheckoutCartProducts(yy)

    localStorage.setItem('cartProducts', JSON.stringify(yy))
    setSize(false)
  }

  setCartProducts(cartProducts)

  useEffect(() => {
    window.scrollTo(0, 0, 1000)
    let xx = localStorage.getItem('cartProducts')
    xx = JSON.parse(xx)
    setCartProducts(xx)
    setCheckoutCartProducts(xx)
    setCartLength(xx?.length)
    if (cartProducts.length == 0) {
      setSize(false)
    }

    localStorage.setItem('cartProducts', JSON.stringify(xx))
  }, [])

  const Totaler = () => {
    let xx = localStorage.getItem('cartProducts')
    let yy = JSON.parse(xx)
    yy?.map(item => {
      if (item?.quantity == undefined) {
        item.quantity = 1
      }

      Total =
        Total +
        Math.round(item?.price - (item?.price * item.discountPercentage) / 100) *
          item.quantity
    })
    settotal(Total)
    setTotal(Total)
  }
  useEffect(() => {
    Totaler()
    setCheckoutCartProducts(cartProducts)
  }, [cartProducts])
  useEffect(() => {
    const xxx = localStorage.getItem('cartProducts')
    const yyy = JSON.parse(xxx)
    if (localStorage.getItem('cartProducts') === undefined) {
      setIsAuthenticated(true)
    }
  }, [])
  console.log(localStorage.getItem('storageToken'))
  if (localStorage.getItem('storageToken') === 'undefined') {
    setIsAuthenticated(true)
  }

  if (isAuthenticated === false) {
    return (
      <>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
          <h1 className='text-2xl font-medium text-center text-gray-600'>
            Please Login to Continue
          </h1>
          <NavLink
            to='/login'
            className='flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-2  text-base font-medium text-white shadow-sm hover:bg-teal-700 mt-10'
          >
            Login
          </NavLink>
        </div>
      </>
    )
  } else if (cartLength === 0) {
    return (
      <>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
          <h1 className='text-2xl font-medium text-center text-gray-600'>
            Cart is Empty
          </h1>
          <NavLink
            to='/products'
            className='flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-2  text-base font-medium text-white shadow-sm hover:bg-teal-700 mt-10'
          >
            Continue Shopping
          </NavLink>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 '>
        {isAuthenticated ? (
          <>
            <div className='md:mt-8 my-3 '>
              <h1 className='text-2xl font-medium  text-start  left-5 my-2    sticky top-16 bg-white z-20 w-full '>
                <p className='bottom-1   md:-left-0    relative w-fit  md:bottom-0   h-fit '>
                  <span className='text-gray-600 text-sm   w-fit items-center  md:pt-0 pt- mx-1 md:-mx-4  inline-flex '>
                    <NavLink
                      to='/'
                      className='mr-2 mb-[2px] text-teal-600  '
                      id='product'
                    >
                      <FaHouse />{' '}
                    </NavLink>
                    <p className='mb-[2px]'>/</p>
                    <NavLink
                      className=' mb-[2px] text-teal-600 mx-1 pt-[0.5px] py-'
                      to='/products'
                    >
                      Products
                    </NavLink>
                    {' / '} Cart
                  </span>
                </p>
              </h1>

              <hr className='' />

              <div className='flow-root'>
                <ul role='list' className='my-2  divide-y divide-gray-200'>
                  {cartProducts?.map(product => (
                    <li key={product.id} className='flex py-6'>
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          src={product.images[0]}
                          // alt={product.imageAlt}
                          className='h-full w-full object-contain object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col '>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <a href={product.href}>{product.title}</a>
                            </h3>
                            <p className='ml-4  items-center gap-x-[0.5px] gap-y-2'>
                              {' '}
                              <span className='flex items-center'>
                                <FaRupeeSign className='text-sm' />{' '}
                                {Math.round(
                                  product.price -
                                    (product.price *
                                      product.discountPercentage) /
                                      100
                                ) * (product.quantity || 1)}
                              </span>
                              <span className='flex items-center text-xs line-through opacity-50'>
                                <FaRupeeSign className='text-xs pt-[1px]' />{' '}
                                {product.price}
                              </span>
                            </p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            {/* {products.color} */}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm '>
                          <p className='text-gray-500 font-medium items-center flex gap-x-1'>
                            Qty{' '}
                            <select
                              className='rounded-md  py-[2px]  mx-1'
                              onChange={e => {
                                quantityHandler(e, product.id)
                              }}
                              value={product.quantity || 1}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                            </select>
                          </p>

                          <div className='flex'>
                            <button
                              onClick={() => remover(product.id)}
                              type='button'
                              className='font-medium text-indigo-600 hover:text-indigo-500'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='border-t border-gray-200 px-4 py-6 my-16 sm:px-6  '>
                <div className='flex justify-between text-base font-medium text-gray-900'>
                  <p>Subtotal</p>
                  <p className='flex items-center gap-x-[0.5px] text-sm'>
                    <span className='font-light text-sm'>
                      <FaRupeeSign />
                    </span>{' '}
                    {total}
                  </p>
                </div>
                <p className='mt-0.5 text-sm text-gray-500'>
                  Shipping and taxes calculated at checkout.
                </p>
                <div className='mt-6'>
                  <NavLink
                    to='/checkout'
                    className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                  >
                    Checkout
                  </NavLink>
                </div>
                <div className='mt-6 flex justify-center text-center text-sm text-gray-500 mb-10'>
                  <p>
                    or{' '}
                    <button
                      type='button'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                      onClick={() => setOpen(false)}
                    >
                      <NavLink to='/products'> Continue Shopping</NavLink>
                      <span aria-hidden='true'> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div>
              <div className='flex flex-col items-center justify-center h-[90vh]'>
                <h1 className='text-2xl font-medium text-center text-gray-600'>
                  Please Login to Continue
                </h1>
                <NavLink
                  to='/login'
                  className='flex items-center justify-center rounded-md border border-transparent bg-teal-600 px-8 py-2  text-base font-medium text-white shadow-sm hover:bg-teal-700 mt-10'
                >
                  Login
                </NavLink>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
