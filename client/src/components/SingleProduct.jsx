import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import SingleContext from '../contexts/singleProduct/singleContext'
import { FaHouse } from 'react-icons/fa6'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { ThreeDots } from 'react-loader-spinner'
import { AiOutlineStar } from 'react-icons/ai'
import { useCart } from '../contexts/Cart/cartContextProvider'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuth } from '../contexts/AuthContext/authContextProvider'

function SingleProduct () {
  const {
    ID,
    setID,
    setCount,
    count,
    cartProducts,
    setCartProducts,
    cartLength,
    setCartLength
  } = useCart()
  const { isAuthenticated } = useAuth()
  const s = useContext(SingleContext)
  const navigate = useNavigate()
  const { single } = s
  const product = single[0]
  const stars = product.rating
  let myImg = []
  for (let key in product.images) {
    myImg = product.images[key]
    break
  }
  const filler = () => {
    const newArray = Array.from(
      {
        length: 5
      },
      (_, index) => {
        let nm = index + 0.5

        return (
          <span key={index} className='text-teal-600'>
            {stars > index + 1 ? (
              <FaStar />
            ) : stars > nm ? (
              <FaStarHalfAlt className='text-teal-600' />
            ) : (
              <AiOutlineStar className='text-teal-600' />
            )}{' '}
          </span>
        )
      }
    )
    return newArray.map(item => {
      return item
    })
  }
  const adder = () => {
    // setCount(count + 1)
    if (isAuthenticated) {
    } else {
      navigate('/login')
    }
    if (localStorage.getItem('storageToken')==="undefined") {
      if (cartProducts.includes(product)) {
        skip()
      } else {
        setCartLength(cartLength + 1)
        cartProducts.push(product)
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
      }

      // toast.success('Added to Cart', {
      //   position: 'top-left',
      //   autoClose: 1000,
      //   hideProgressBar: false,
      //   closeOnClick: true
      // })
    } else {
      navigate('/login')
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='flex mx-auto box-border   bg-white  justify-center '>
        <section className='text-gray-700 body-font  w-[100vw]  md:h-[60vh] h-[75vh] items-center flex  md:my-20 my-5 box-border  '>
          <div className='container px-5  mx-auto '>
            <p className='bottom-10 md:left-4 md:bottom-0 relative w-fit md:-mt-20 md:mb-8  mt-4  '>
              <span className='text-gray-600 text-sm   w-fit items-center  mx-1 md:mx-24  inline-flex '>
                <NavLink
                  to='/'
                  className='mr-2 mb-[2px] text-teal-600  '
                  id='product'
                >
                  <FaHouse />{' '}
                </NavLink>
                <p className='mb-[2px]'>/</p>
                <NavLink
                  className=' mb-[2px] text-teal-600 mx-1 '
                  to='/products'
                >
                  Products
                </NavLink>
                {' /'}
                <span className='text-xs mx-1 capitalize text-center flex items-center '>
                  {' '}
                  {product.title}{' '}
                </span>
              </span>
            </p>
            {/* 
            vjhvjfv */}
            {s.loading === true ? (
              <div className='flex justify-center items-center h-[60vh]'>
                <ThreeDots
                  color='#0d9488'
                  height='60'
                  width='60'
                  timeout={3000}
                  //3 secs
                />
              </div>
            ) : (
              <>
                <div className='lg:w-4/5 mx-auto md:flex items-center flex-wrap mdi:items-center md:justify-center flex md:py-12 '>
                  <img
                    alt='ecommerce'
                    src={myImg}
                    className='md:w-[30%]  md:h-[35vh] h-[24vh] w-auto     rounded items-center flex mx-auto md:my-0  '
                  />
                  <div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
                    <h1 className='text-gray-600 text-xl title-font font-medium  capitalize'>
                      {product.title}{' '}
                    </h1>
                    <h2 className='text-xs title-font text-gray-500 tracking-widest capitalize mb-2 my-2'>
                      {product.brand}{' '}
                    </h2>

                    <div className='flex mb-2 items-center'>
                      <span className='flex items-center '>
                        {filler()}

                        <span className='text-gray-600 ml-2 text-xs text-center flex items-center'>
                          ({product.reviews}
                          Reviews)
                        </span>
                      </span>
                    </div>
                    <p className='leading-relaxed text-xs'>
                      {product.description}{' '}
                    </p>
                    <div className='flex mt-6 items-center pb-5 border-b-2 text-xs  border-gray-200 mb-5'>
                      <div className='flex items-center'>
                        <span className='mr-3'>Color</span>
                        {/* {color.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={`border-2 

                       
                               
                      rounded-full w-4 h-4 focus:outline outline-gray-300 hover:outline ml-1`}
                              style={{ backgroundColor: item }}
                            ></button>
                          )
                        })}{' '} */}{' '}
                      </div>
                      <div className='flex ml-6 items-center '>
                        <span className='mr-3 '>Size</span>
                        <div className='relative '>
                          <select className='rounded border appearance-none border-gray-400 py-2 text-xs focus:outline-none focus:border-red-500  pl- pr-10'>
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                          <span className='absolute  top-0  right-[-2px] h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
                            <svg
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              className='w-4 h-4'
                              viewBox='0 0 24 24'
                            >
                              <path d='M6 9l6 6 6-6'></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='flex'>
                      <span className='title-font font-medium text-2xl text-gray-900'>
                        ${product.price}{' '}
                      </span>

                      <button
                        className=' flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded'
                        onClick={() => {
                          adder()
                        }}
                      >
                        <ToastContainer />
                        Add to Cart
                      </button>

                      <button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                        <svg
                          fill='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          className='w-5 h-5'
                          viewBox='0 0 24 24'
                        >
                          <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}{' '}
          </div>
        </section>
      </div>
    </>
  )
}

export default SingleProduct
