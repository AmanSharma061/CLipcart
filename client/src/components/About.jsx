import React from 'react'
import { useCart } from '../contexts/Cart/cartContextProvider'
import { NavLink } from 'react-router-dom'
function About() {
  const links = [
    { name: 'Products', to: '/products' },
    { name: 'Contact', to: '/contact' },
    { name: 'Our values', to: '/about' },
    { name: 'Meet our leadership', to: '/about' },
  ]
  const stats = [
    { name: 'Product Categories', value: '12' },
    { name: 'Products of Each Category', value: '300+' },
    { name: 'Satisfied Customers', value: '10,000' },
    { name: 'Customer Support', value: '24 x 7' },
  ]
  
  

  const { cartProducts } = useCart()
    


  return (
    <div>
   <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
  

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Welcome to CLipKart</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
          At CLipKart, we believe in the seamless fusion of convenience and quality. Our journey began with a simple idea – to redefine the online shopping experience and bring joy to our customers' lives.
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <NavLink key={link.name} to={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </NavLink>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
    

    </div>
  )
}

export default About

