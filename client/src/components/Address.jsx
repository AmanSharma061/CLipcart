import React from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
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
function Address () {
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
      console.log(data)

      if (data.message) {
        alert('Address Saved Successfully')
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='grid    md:grid-cols-2 lg:grid-cols-1  mx-auto  grid-cols-1 md:mx-[30vw] lg:mx-[30vw] sm:mx-[30vw] bg-white md:px-5 md:my-8  md:box-border sm:my-10'>
      <div className='border-b border-gray-900/10 pb-10 mx-5 shadow-lg bg-gray-50   px-6 pt-5 rounded'>
        <h2 className='text-base font-semibold leading-7 text-gray-900'>
          Shipping Address
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          Enter your current address where you can receive product.
        </p>

        <div className='mt-2 gap-y-4 grid grid-cols-2  md:gap-x-6 gap-2    sm:grid-cols-6'>
          <form className='col-span-full sm:col-span-6  '>
            <div className='grid grid-flow-col gap-x-1 my-2'>
              <div className='sm:col-span-3 '>
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

            <div className='my-2'>
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
              <div className='sm:col-span-3   '>
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

            <div className='sm:col-span-full col-span-full my-2 '>
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

            <div className='sm:col-span-2 my-2'>
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

            <div className='sm:col-span-2 my-2 flex gap-x-2 '>
              <button
                className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 md:px-6 px-4 py-2 mt-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 '
                onClick={addressHandler}
              >
                Save Address
              </button>
              <NavLink
                to='/checkout'
                className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 md:px-6 px-4  py-2 mt-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                Checkout
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Address
