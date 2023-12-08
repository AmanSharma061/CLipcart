import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

function Signup () {
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
    cpassword: ''
  })

  const valueHandler = event => {
    setUser({ ...user, [event.target.name]: event.target.value })
  }

  const signupHandler = async e => {
    e.preventDefault()
    if (!user.email || !user.password || !user.cpassword) {
      toast.warn('Please fill all the fields !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })

      return
    }
    if (user.password !== user.cpassword) {
      toast.warn('Password and Confirm Password should be same !', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return
    }

    try {
      const data = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          cpassword: user.cpassword
        })
      })
      const response = await data.json()

      if (response.message) {
        toast.success('User Registered Successfully !', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        setTimeout(() => {
          toast.info('Redirecting to Login Page !', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
        }, 2000)
        setUser({ email: '', password: '', cpassword: '' })
        setTimeout(() => {
          navigate('/login')
        }, 4000)
      } else if (response.error === 'Email already exists') {
        toast.error('Email already exists !', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img
              className='mx-auto h-10 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt='Your Company'
            />
            <h2 className='mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign Up
            </h2>
          </div>

          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' action='#' method='POST'>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    autoComplete='off'
                    id='email'
                    name='email'
                    onChange={valueHandler}
                    value={user.email}
                    type='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  <ToastContainer />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    autoComplete='off'
                    value={user.password}
                    onChange={valueHandler}
                    id='password'
                    name='password'
                    type='password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  <ToastContainer />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Confirm Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    autoComplete='off'
                    value={user.cpassword}
                    onChange={valueHandler}
                    id='cpassword'
                    name='cpassword'
                    type='password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                  <ToastContainer />
                </div>
              </div>

              <div>
                <button
                  type='submit'
                  onClick={signupHandler}
                  className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Sign up
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-500'>
              Already Registered ?{' '}
              <Link
                to='/login'
                className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500 underline'
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
