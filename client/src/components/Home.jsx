import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../App.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import SingleContext from '../contexts/singleProduct/singleContext'
import { ThreeDots } from 'react-loader-spinner'

import { products } from '../files/arrays'
export function Home (props) {
  const navigate = useNavigate()

  // const [loading, setLoading] = useState(true)

  const settings = {
    dots: true,

    dotsColor: 'white',
    arrows: false,
    speed: 900,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  const sin = useContext(SingleContext)

  const navigator = id => {
    console.log(id)
    sin.getSingle(id)
    navigate('/product')
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Slider
        {...settings}
        className='  mx-auto     bg-white max-w-2xl px-4   sm:px-8 sm:py-4 w-screen lg:max-w-[85vw] lg:px-8'
      >
        <img
          src='https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=2020&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className=' object-fit   mx-auto md:h-[85vh] h-[70vw] object-fit bg-white'
        />

        <img
          src='https://images.unsplash.com/photo-1607082350899-7e105aa886ae?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className=' object-fit   mx-auto md:h-[85vh] h-[70vw] object-fit bg-white'
        />

        <img
          src='https://images.unsplash.com/photo-1603792907191-89e55f70099a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className=' object-fit   mx-auto md:h-[85vh] h-[70vw] object-fit bg-white'
        />

        <img
          src='https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&q=80&w=1781&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt=''
          className=' object-fit   mx-auto md:h-[85vh] h-[70vw] object-fit bg-white'
        />
      </Slider>

      <div className='bg-white '>
        <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
            Best Sellers
          </h2>
          {/* {loading ? (
            <div className='flex justify-center items-center h-[80vh]'>
              {' '}
              <ThreeDots
                height='60'
                width='60'
                radius='9'
                color='#0d9488'
                ariaLabel='three-dots-loading'
                wrapperStyle={{}}
                wrapperClassName=''
                visible={true}
              />{' '}
            </div>
          ) : null} */}
          <div className='mt-6  grid  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 md:w-[100%] grid-cols-2 '>
            {products.map(product => (
              <div
                key={product.id}
                className='group relative shadow-md rounded py-1 px-2 '
                onClick={() => {
                  navigator(product.id)
                }}
              >
                <div
                  className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60 '
                  key={product.id}
                >
                  <img
                    src={product.images[0]}
                    alt={product.imageAlt}
                    className='h-full w-full  object-contain bg-white  lg:h-full lg:w-full '
                  />
                </div>
                <div className='mt-4 flex justify-between '>
                  <div>
                    <h3 className='text-sm text-gray-700'>
                      <a href={product.href}>
                        <span aria-hidden='true' className='absolute inset-0' />
                        {product.name}
                      </a>
                    </h3>
                    <p className='mt-1 text-sm text-gray-500'>
                      {product.title}
                    </p>
                  </div>
                  <div>
                    <p className='text-black inline items-end'>
                      {' '}
                      $
                      {Math.round(
                        product.price -
                          (product.price * product.discountPercentage) / 100
                      )}
                    </p>
                    <p className='text-sm font-thin text-gray-400 text-end line-through '>
                      {' '}
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
