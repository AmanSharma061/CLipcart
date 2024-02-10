import React, { useEffect } from 'react'
import Address from '../components/Address'
import { useNavigate } from 'react-router-dom'
import { Fragment, useState } from 'react'

import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../contexts/Cart/cartContextProvider'
import { FaRupeeSign } from 'react-icons/fa'

import { useAuth } from '../contexts/AuthContext/authContextProvider'
import { ToastContainer, toast } from 'react-toastify'

function CheckoutPage () {
  const {
    ckeckoutCartProducts,
    setCheckoutCartProducts,
    total,
    cartProducts,
    setCartProducts,
    setCartLength
  } = useCart()

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    let cc = localStorage.getItem('cartProducts')
    cc = JSON.parse(cc)
    setCheckoutCartProducts(cc)
  }, [])

  const navigate = useNavigate()

  const { isAuthenticated } = useAuth()
  const PAYMENTMETHODS = () => {
    return (
      <>
        <p class='mt-8 text-lg font-medium'>Payment Methods</p>
        <form class='mt-1 grid gap-6 mb-4'>
          <div class='relative'>
            <input
              class='peer hidden'
              id='radio_1'
              type='radio'
              name='radio'
              checked
            />
            <span class='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
            <label
              class='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 px-4'
              for='radio_1'
            >
              <img class='w-14 object-contain' src='./phonePay.svg' alt='ph' />
              <div class='ml-5  py-5'>
                <span class='mt-1 font-semibold'>Phone Pay </span>
              </div>
            </label>
          </div>
          <div class='relative'>
            <input
              class='peer hidden'
              id='radio_2'
              type='radio'
              name='radio'
              checked
            />
            <span class='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
            <label
              class='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 px-4'
              for='radio_2'
            >
              <img class='w-14 object-contain' src='/googlePay.svg' alt='' />
              <div class='ml-5 py-5'>
                <span class='mt-1 font-semibold'>Google Pay</span>
              </div>
            </label>
          </div>
          <div class='relative'>
            <input
              class='peer hidden'
              id='radio_3'
              type='radio'
              name='radio'
              checked
            />
            <span class='peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white'></span>
            <label
              class='peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 px-4'
              for='radio_3'
            >
              <img class='w-14 object-contain' src='/creditCard.svg' alt='' />
              <div class='ml-5 py-5'>
                <span class='mt-2 font-semibold '>Debit Card</span>
              </div>
            </label>
          </div>
        </form>
      </>
    )
  }

  const PAYMENTDETAILS = () => {
    return (
      <>
        <div class='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
          <p class='text-xl font-medium'>Payment Details</p>
          <p class='text-gray-400'>
            Complete your order by providing your payment details.
          </p>
          <div class=''>
            <label for='email' class='mt-4 mb-2 block text-sm font-medium'>
              Email
            </label>
            <div class='relative'>
              <input
                type='text'
                id='email'
                name='email'
                class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='your.email@gmail.com'
              />
              <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                  />
                </svg>
              </div>
            </div>
            <label
              for='card-holder'
              class='mt-4 mb-2 block text-sm font-medium'
            >
              Card Holder
            </label>
            <div class='relative'>
              <input
                type='text'
                id='card-holder'
                name='card-holder'
                class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='Your full name here'
              />
              <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  class='h-4 w-4 text-gray-400'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  stroke-width='2'
                >
                  <path
                    stroke-linecap='round'
                    stroke-linejoin='round'
                    d='M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z'
                  />
                </svg>
              </div>
            </div>
            <label for='card-no' class='mt-4 mb-2 block text-sm font-medium'>
              Card Details
            </label>
            <div class='flex'>
              <div class='relative w-7/12 flex-shrink-0'>
                <input
                  type='text'
                  id='card-no'
                  name='card-no'
                  class='w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='xxxx-xxxx-xxxx-xxxx'
                />
                <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <svg
                    class='h-4 w-4 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z' />
                    <path d='M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z' />
                  </svg>
                </div>
              </div>
              <input
                type='text'
                name='credit-expiry'
                class='w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='MM/YY'
              />
              <input
                type='text'
                name='credit-cvc'
                class='w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='CVC'
              />
            </div>
            <label
              for='billing-address'
              class='mt-4 mb-2 block text-sm font-medium'
            >
              Billing Address
            </label>
            <div class='flex flex-col sm:flex-row'>
              <div class='relative flex-shrink-0 sm:w-7/12'>
                <input
                  type='text'
                  id='billing-address'
                  name='billing-address'
                  class='w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  placeholder='Street Address'
                />
                <div class='pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3'>
                  <img
                    class='h-4 w-4 object-contain'
                    src='https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg'
                    alt=''
                  />
                </div>
              </div>
              <select
                type='text'
                name='billing-state'
                class='w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500'
              >
                <option value='State'>State</option>
              </select>
              <input
                type='text'
                name='billing-zip'
                class='flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                placeholder='ZIP'
              />
            </div>

            {/* <!-- Total --> */}
          </div>
          <button class='mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white'>
            Place Order
          </button>
        </div>
      </>
    )
  }

  const states = [
    {
      key: 'AN',
      name: 'Andaman and Nicobar Islands'
    },
    {
      key: 'AP',
      name: 'Andhra Pradesh'
    },
    {
      key: 'AR',
      name: 'Arunachal Pradesh'
    },
    {
      key: 'AS',
      name: 'Assam'
    },
    {
      key: 'BR',
      name: 'Bihar'
    },
    {
      key: 'CG',
      name: 'Chandigarh'
    },
    {
      key: 'CH',
      name: 'Chhattisgarh'
    },
    {
      key: 'DH',
      name: 'Dadra and Nagar Haveli'
    },
    {
      key: 'DD',
      name: 'Daman and Diu'
    },
    {
      key: 'DL',
      name: 'Delhi'
    },
    {
      key: 'GA',
      name: 'Goa'
    },
    {
      key: 'GJ',
      name: 'Gujarat'
    },
    {
      key: 'HR',
      name: 'Haryana'
    },
    {
      key: 'HP',
      name: 'Himachal Pradesh'
    },
    {
      key: 'JK',
      name: 'Jammu and Kashmir'
    },
    {
      key: 'JH',
      name: 'Jharkhand'
    },
    {
      key: 'KA',
      name: 'Karnataka'
    },
    {
      key: 'KL',
      name: 'Kerala'
    },
    {
      key: 'LD',
      name: 'Lakshadweep'
    },
    {
      key: 'MP',
      name: 'Madhya Pradesh'
    },
    {
      key: 'MH',
      name: 'Maharashtra'
    },
    {
      key: 'MN',
      name: 'Manipur'
    },
    {
      key: 'ML',
      name: 'Meghalaya'
    },
    {
      key: 'MZ',
      name: 'Mizoram'
    },
    {
      key: 'NL',
      name: 'Nagaland'
    },
    {
      key: 'OR',
      name: 'Odisha'
    },
    {
      key: 'PY',
      name: 'Puducherry'
    },
    {
      key: 'PB',
      name: 'Punjab'
    },
    {
      key: 'RJ',
      name: 'Rajasthan'
    },
    {
      key: 'SK',
      name: 'Sikkim'
    },
    {
      key: 'TN',
      name: 'Tamil Nadu'
    },
    {
      key: 'TS',
      name: 'Telangana'
    },
    {
      key: 'TR',
      name: 'Tripura'
    },
    {
      key: 'UK',
      name: 'Uttar Pradesh'
    },
    {
      key: 'UP',
      name: 'Uttarakhand'
    },
    {
      key: 'WB',
      name: 'West Bengal'
    }
  ]

  const [user, setUser] = React.useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetAddress: '',
    country: 'India',
    city: '',
    postalCode: '',
    state: ''
  })
  const {
    firstname,
    lastname,
    email,
    phone,
    streetAddress,
    city,
    postalCode,
    country,
    state
  } = user

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }
  const addressHandler = async e => {
    e.preventDefault()

    try {
      const response = await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          streetAddress,
          city,
          postalCode,
          country,
          state,
          cartProducts: JSON.parse(localStorage.getItem('cartProducts'))
        })
      })
      const data = await response.json()


      if (data.message === 'User registered successfully') {
        setSaved(true)
        let xx = localStorage.getItem('cartProducts')
        xx = JSON.parse(xx)
        xx = []
        setCartProducts(xx)
        setCartLength(0)
        localStorage.setItem('cartProducts', JSON.stringify(xx))

        toast.success('Address Saved Successfully', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
        
      }
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)

    cartProducts.map(item => {
      if (item.quantity === null) {
        item.quantity = 1
      }
    })
  }, [])
  return (
    <>
      <ToastContainer />
      <div class='grid sm:px-10 lg:grid-cols-2 grid-cols-1 lg:px-20 xl:px-24  '>
        <div class='px-4 pt-8 '>
          <p class='text-xl font-medium '>Order Summary</p>
          <p class='text-gray-400'>
            Check your items. And select a suitable shipping method.
          </p>
          <div class='mt-8 gap-y-4  rounded-lg   bg-white  py-4 sm:px-6 md:grid  gap-x-4 border-gray-500 md:mb-4  shadow-md border-opacity-10 border  md:w-[45vw]'>
            {ckeckoutCartProducts.map(item => {
              return (
                <div
                  class='flex flex- rounded-lg bg-white sm:flex-row  align-start h-fit  shadow-md  '
                  key={item.id}
                >
                  <img
                    class='m-2 h-24 w-28 rounded-md border object-cover object-center'
                    src={item.images[0]}
                    alt='shoe'
                  />
                  <div class='flex w-full flex-col px-4 py-4 gap-y-1 '>
                    <span class='font-semibold text-gray-500 text-sm '>
                      {item.title}
                    </span>

                    <p class='text-xs font-semibold text-gray-500 flex text-center items-center text-[10px] ml-1 capitalize'>
                      {item.brand}
                    </p>
                    <p class='text-xs font-semibold text-gray-500 flex text-center items-center text-[10px] ml-1 capitalize'>
                      Price- &#8377;
                      {Math.round(
                        item.price -
                          (item.price * item.discountPercentage) / 100
                      )}
                    </p>
                    <span class='float-right text-gray-500   ml-[2px] text-xs font-semibold'>
                      <span className='text-xs '>
                        {' '}
                        Qty- {item.quantity || 1}
                      </span>
                    </span>
                  </div>
                  <div>
                    <div className='flex  items-center  h-fit my-4  mr-5 text-gray-700 font-semibold align-baseline'>
                      <FaRupeeSign />{' '}
                      {Math.round(
                        item.price -
                          (item.price * item.discountPercentage) / 100
                      ) * item.quantity || 1}
                    </div>
                    <div className='relative bottom-4  flex  items-center  h-fit my-4  text-gray-400 line-through font-semibold align-baseline'>
                      {' '}
                      <FaRupeeSign /> {item.price}
                    </div>
                  </div>
                </div>
              )
            })}
            <div class='mt-6 border-t border-b py-2 px-4'>
              <div class='flex items-center justify-between'>
                <p class='text-sm font-medium text-gray-900'>Subtotal</p>
                <p class='font-semibold text-gray-900'>${total}.00</p>
              </div>
              <div class='flex items-center justify-between'>
                <p class='text-sm font-medium text-gray-900'>Shipping</p>
                <p class='font-semibold text-gray-900'>$0.00</p>
              </div>
            </div>
            <div class='mt-6 flex items-center justify-between px-4'>
              <p class='text-sm font-medium text-gray-900'>Total</p>
              <p class='text-2xl font-semibold text-gray-900'>${total}.00</p>
            </div>
          </div>
        </div>

        <div className='border-b border-gray-900/10 pb-10  shadow-md 1 md:w-[40vw]  md:ml-16 md:mt-28 mt-4  mx-4 px-2 pt-5 rounded'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Shipping Address
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Enter your current address where you can receive product.
          </p>
          <div className='grid    md:grid-cols-4 lg:grid-cols-1    grid-cols-1    bg-white md:px-2 md:my-0  md:box-border sm:my-10 '>
            <div className='mt-2 gap-y-4 grid grid-cols-2  md:gap-x-6 gap-2      sm:grid-cols-6  '>
              <form className='col-span-full sm:col-span-6  '>
                <div className='grid grid-flow-col gap-x-2 my-2 '>
                  <div className='sm:col-span-1  '>
                    <label
                      htmlFor='firstname'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      First name
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        value={firstname}
                        name='firstname'
                        id='firstname'
                        onChange={handleChange}
                        autoComplete='given-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3 '>
                    <label
                      htmlFor='lastname'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Last name
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='lastname'
                        onChange={handleChange}
                        value={lastname}
                        id='lastname'
                        autoComplete='family-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>

                <div className='grid gap-x-2  grid-flow-col '>
                  <div className='sm:col-span-4 my-2 '>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='email'
                        value={email}
                        name='email'
                        type='email'
                        onChange={handleChange}
                        autoComplete='email'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                  <div className='sm:col-span-4 my-2 '>
                    <label
                      htmlFor='phone'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Mobile Number
                    </label>
                    <div className='mt-2'>
                      <input
                        id='phone'
                        name='phone'
                        onChange={handleChange}
                        value={phone}
                        type='Number'
                        autoComplete='off'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>

                <div className='my-2  '>
                  <label
                    htmlFor='streetAddress'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Street address
                  </label>
                  <div className='mt-2'>
                    <input
                      type='text'
                      name='streetAddress'
                      value={streetAddress}
                      onChange={handleChange}
                      id='streetAddress'
                      autoComplete='street-address'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='grid grid-flow-col gap-x-1 my-2'>
                  <div className='sm:col-span-6   '>
                    <label
                      htmlFor='country'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Country
                    </label>
                    <div className='mt-2'>
                      <select
                        id='country'
                        value={country}
                        onChange={handleChange}
                        name='country'
                        autoComplete='country-name'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      >
                        <option>India</option>
                      </select>
                    </div>
                  </div>
                  <div className='sm:col-span-2 sm:col-start-1'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      City
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='city'
                        value={city}
                        onChange={handleChange}
                        id='city'
                        autoComplete='address-level2'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>
                <div className='md:grid-cols-2 lg:grid-cols-2 grid grid-cols-2 gap-x-1 md:flex w-full'>
                  <div className='sm:col-span-8 col-span-1 md:col-span-3 md:w-[60%]   my-2 '>
                    <label
                      htmlFor='state'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      State
                    </label>
                    <div className='mt-2'>
                      <select
                        type='text'
                        name='state'
                        value={state}
                        onChange={handleChange}
                        id='state'
                        autoComplete='address-level1'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      >
                        {states.map(state => {
                          return <option key={state.key}>{state.name}</option>
                        })}
                      </select>
                    </div>
                  </div>

                  <div className='sm:col-span-4  my-2'>
                    <label
                      htmlFor='postalCode'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      ZIP / Postal code
                    </label>
                    <div className='mt-2'>
                      <input
                        type='text'
                        name='postalCode'
                        value={postalCode}
                        onChange={handleChange}
                        id='postalCode'
                        autoComplete='postal-code'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>

                <div className='sm:col-span-2 my-2 flex gap-x-2 '>
                  {!saved ? (
                    <>
                      <button
                        className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 md:px-6 px-4 py-2 mt-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 '
                        onClick={addressHandler}
                      >
                        Save Address
                      </button>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to='/success'
                        className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 md:px-6 px-4  py-2 mt-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                      >
                        Place Order
                      </NavLink>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        {/* <PAYMENTDETAILS/> */}
      </div>
    </>
  )
}

export default CheckoutPage
