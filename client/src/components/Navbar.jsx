import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'
import { FaCartShopping } from 'react-icons/fa6'
import { Link, NavLink } from 'react-router-dom'

import { useCart } from '../contexts/Cart/cartContextProvider'
import { useAuth } from '../contexts/AuthContext/authContextProvider'
import { ToastContainer, toast } from 'react-toastify'
function Navbar ({ count }) {
  const Navigate = useNavigate()
  const hhhhh = () => {
    if (document.getElementById('navbar-search').style.display === 'inline') {
      document.getElementById('navbar-search').style.display = 'none'
    } else {
      document.getElementById('navbar-search').style.display = 'inline'

      document.getElementById('navbar-search').style.width = '100%'

      document.getElementById('lii').style.width = '100%'
      // document.getElementById('navbar-search').style.height = 'vh'
      // document.getElementById('navbar-search').style.height = '100vh'

      document.getElementById('navbar-search').style.transition = 'all 1s'
      document.getElementById('navbar-search').style.transitionDelay = '0.5s'
      document.getElementById('navbar-search').style.overflow = 'hidden'
      document.getElementById('navbar-search').style.opacity = '1'
    }
  }
  const kkkk = () => {}
  // const { loginWithRedirect } = useAuth0()

  // const { count, setCount } = useCart()
  const { isAuthenticated, setIsAuthenticated } = useAuth()
  const { cartLength, setCartLength } = useCart()

  const Active = 'text-teal-600'
  const AUTH = () => {
    if (localStorage.getItem("storageToken")==="undefined"|| isAuthenticated) {
      return (
        <>
          <NavLink
            // onClick={() => loginWithRedirect()}
            to='/logout'
            className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
          >
            logout
          </NavLink>
        </>
      )
    } else {
      return (
        <>
          <NavLink
            // onClick={() => loginWithRedirect()}
            to={`/login`}
            style={({ isActive }) => ({
              color: isActive ? 'teal' : 'black'
            })}
            className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
          >
            Login
          </NavLink>
          {/* {Navigate('/login')} */}
        </>
      )
    }
  }
  useEffect(() => {
  }, [cartLength])
  useEffect(() => {
    AUTH()
  }, [isAuthenticated])

  useEffect(() => {
    const xxx = localStorage.getItem('cartProducts')
    const yyy = JSON.parse(xxx)
    if (localStorage.getItem('cartProducts') === undefined) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <>
      <nav className='bg-white border-gray-200  sticky shadow-sm top-0   z-20 '>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4  '>
          <span className='self-center text-2xl font-semibold  font-mono whitespace-nowrap dark:text-teal-600 '>
            <Link to='/'>CLipKart</Link>
          </span>

          <div className='flex md:order-2 '>
            <button
              type='button'
              data-collapse-toggle='navbar-search'
              aria-controls='navbar-search'
              aria-expanded='false'
              // onClick={hhhhh}
            ></button>

            <div className='relative right-12 md:block items-center flex justify-center bg-red-600'>
              <Link
                to={`/cart`}
                className='absolute inset-y-0 left-0 flex items-center pl-3 '
              >
                <FaCartShopping className='relative  text-xl  text-teal-600 z-10  ' />

                <span className='inline-flex items-center rounded-md bg-gray-50 text-teal-600 px-[5px] py-[0.5px] -top-3 -left-2 relative text-xs font-medium  ring-1 ring-inset ring-gray-500/10'>
                  {cartLength}
                </span>
              </Link>
              {/* <div></div> */}

              {/* <FaCartShopping /> */}
            </div>
            {/* button menu close  */}
            <button
              data-collapse-toggle='navbar-search'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-teal-600 dark:hover:bg-gray-200 dark:focus:ring-teal-600'
              aria-controls='navbar-search'
              id='hamburger-button'
              aria-expanded='false'
              onClick={hhhhh}
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  stroke-line='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1 '
            id='navbar-search'
          >
            <div className='relative mt-3 md:hidden' id='srch'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-4 h-4 text-white dark:text-gray-200'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 20'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                  />
                </svg>
              </div>
              <input
                type='text'
                id='search-navbar'
                className='block w-full p-2 pl-10 text-sm  border  rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Search......'
              />
            </div>
            {/*/////////////////////////////////////////////////////////// Nav Links here ///////////////////////////////////// */}
            <ul
              id='lii'
              className='flex flex-col z-20 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-white md:bg-white dark:border-gray-700 bg-white'
            >
              <li>
                <NavLink
                  to='/'
                  style={({ isActive }) => ({
                    color: isActive ? 'teal' : 'black'
                  })}
                  onClick={kkkk}
                  className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                 onClick={kkkk}
                  style={({ isActive }) => ({
                    color: isActive ? 'teal' : 'black'
                  })}
                  to='/about'
                  className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                onClick={kkkk}
                  style={({ isActive }) => ({
                    color: isActive ? 'teal' : 'black'
                  })}
                  to='/products'
                  className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
                >
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink
                 onClick={kkkk}
                  style={({ isActive }) => ({
                    color: isActive ? 'teal' : 'black'
                  })}
                  to='/contact'
                  className={`block py-2 pl-3 pr-4 text-white rounded  md:bg-white lg:bg-white md:p-0  dark:text-red-700 md:text-black  `}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <AUTH />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
