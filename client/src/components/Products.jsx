import { Fragment, useEffect, useState, useContext } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { products, filters, sortOptions } from '../files/arrays'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink } from 'react-router-dom'
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon
} from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import SingleContext from '../contexts/singleProduct/singleContext'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}
const gridView =
  'grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8'

export default function Products () {
  const navigate = useNavigate()
  const sin = useContext(SingleContext)
  const navigator = id => {
    sin.getSingle(id)
    navigate('/product')
  }
  const productsLister = (e, section, option) => {
    if (section.name === 'Brand') {
      let bb = products.filter(product => product.brand === option.value)
      if (bb.length === 0) {
        bb = products
      }
      setNewProduct(bb)
    } else if (section.name === 'category' && option.value === 'All') {
      setNewProduct([...Products])
    } else {
      let ss = products.filter(product => product.category === option.value)

      if (ss.length === 0) {
        ss = products
      }

      setNewProduct(ss)
    }
  }
  const sorter = (e, option) => {
    let ss = [...newProducts]
    if (option === 'Price: Low to High') {
      ss.sort((a, b) => a.price - b.price)
    } else if (option === 'Price: High to Low') {
      ss.sort((a, b) => b.price - a.price)
    } else if (option === 'Best Rating') {
      ss.sort((a, b) => b.rating - a.rating)
    }
    setNewProduct(ss)
  }
  const [newProducts, setNewProduct] = useState([...products])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [productsPerPage, setProductsPerPage] = useState(15)
  //For Current Page of Products
  const [currentPage, setCurrentPage] = useState(1)
  //State For Rendering the products 
  const [currentProducts, setCurrentProducts] = useState(newProducts)
  //Getting the Last index of the products or we can say that we can check from the last index that in which page we are currently at 
  const lastIndex = currentPage * productsPerPage
  //Getting the first index of the products or we can say that we can check from the first index that in which page we are currently at

  const firstIndex = lastIndex - productsPerPage
  ///Calculating how much pages will be there on the basis of the length of the products Array
  const pages = Math.ceil(products.length / productsPerPage)

  const pageHandler = (e, i) => {
    e.preventDefault()

    if (i < 0) {
      i = 0
      setCurrentPage(i + 1)
    }
    else if (i > pages - 1) {
      i = pages - 1
      setCurrentPage(i + 1)
    }
    else
    {

      setCurrentPage(i + 1)
    }
  }


  useEffect(() => {
    setCurrentProducts(newProducts.slice(firstIndex, lastIndex))
  }, [currentPage, newProducts])

  // console.log('newProducts', newProducts.slice(firstIndex, lastIndex))

  function ProductsNav () {
    return (
      <>
        <div className='flex items-baseline justify-between border-b border-gray-200 pb-4 md:pt-16 pt-5     sticky  md:top-4 top-16  z-10 bg-white'>
          <h1 className='md:text-4xl font-bold tracking-tight text-gray-900 md:left-0 md:top-0 relative left-12  '>
            New Arrivals
          </h1>

          <div className='flex items-center bg-white'>
            <Menu as='div' className='relative inline-block text-left bg-white'>
              <div>
                <Menu.Button className='group inline-flex justify-center text-sm font-medium text-gray-700 bg-white hover:text-gray-900'>
                  Sort
                  <ChevronDownIcon
                    className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='bg-white absolute  right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1  '>
                    {sortOptions.map(option => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <button
                            onClick={e => {
                              sorter(e, option.name)
                            }}
                            className={classNames(
                              option.current
                                ? 'font-medium text-gray-900'
                                : 'text-gray-500',
                              active ? 'bg-gray-100' : '',
                              'block px-4 py-2 text-sm'
                            )}
                          >
                            {option.name}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type='button'
              className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className='sr-only'>Filters</span>
              <FunnelIcon className='h-5 w-5' aria-hidden='true' />
            </button>
          </div>
        </div>
      </>
    )
  }

  const PaginationNav = () => {
    return (
      <>
        {/* Showing the pages list */}
        <nav
          className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px  '
          aria-label='Pagination'
        >
          <NavLink
            to={`/products?page=${currentPage }`}
            onClick={e => {
              pageHandler(e, currentPage - 2)
            }}
            className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 hover:bg-teal-600 hover:text-white text-sm font-medium text-gray-500 '
          >
            <span className='sr-only'>Previous</span>
            <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
          </NavLink>
          {Array.from({ length: pages }, (_, i) => (

            <NavLink
              key={i}
              
              aria-current='page'
            
              onClick={() => {
                pageHandler(event, i)
                
              }}
              
              className={`z-10 relative inline-flex ${currentPage===i+1?"bg-teal-600 text-white":""} items-center px-4 py-2 border text-sm font-medium`}
            >
              {i + 1}
            </NavLink>
          ))}
          <NavLink
            onClick={e => {
              pageHandler(e, currentPage)
            }}
            to={`/products?page=${currentPage }`}
            className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 hover:bg-teal-600 hover:text-white text-sm font-medium text-gray-500'
          >
            <span className='sr-only'>Next</span>
            <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
          </NavLink>
        </nav>
      </>
    )
  }

  function Pagination () {
    return (
      <>
        <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
          <div className=' sm:flex sm:flex-1 sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                Showing <span className='font-medium'>{currentPage}</span> to{' '}
                <span className='font-medium'>{productsPerPage*currentPage}</span> of{' '}
                <span className='font-medium '>{products.length}</span> results
              </p>
            </div>
            <div>{<PaginationNav />}</div>
          </div>
        </div>
      </>
    )
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='bg-white'>
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as='div'
              className='relative z-40 lg:hidden'
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='fixed inset-0 bg-black bg-opacity-25' />
              </Transition.Child>

              <div className='fixed inset-0 z-40 flex'>
                <Transition.Child
                  as={Fragment}
                  enter='transition ease-in-out duration-300 transform'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transition ease-in-out duration-300 transform'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <Dialog.Panel className='relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl'>
                    <div className='flex items-center justify-between px-4'>
                      <h2 className='text-lg font-medium text-gray-900'>
                        Filters
                      </h2>
                      <button
                        type='button'
                        className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className='sr-only'>Close menu</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>

                    {/* Filters */}
                    <form className='mt-4 border-t border-gray-200'>
                      <h3 className='sr-only'>Categories</h3>

                      {filters.map(section => (
                        <Disclosure
                          as='div'
                          key={section.id}
                          className='border-t border-gray-200 px-4 py-6'
                        >
                          {({ open }) => (
                            <>
                              <h3 className='-mx-2 -my-3 flow-root'>
                                <Disclosure.Button className='flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                                  <span className='font-medium text-gray-900 '>
                                    {section.name}
                                  </span>
                                  <span className='ml-6 flex items-center'>
                                    {open ? (
                                      <MinusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <PlusIcon
                                        className='h-5 w-5'
                                        aria-hidden='true'
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className='pt-6 '>
                                <div className='space-y-6'>
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className='flex items-center'
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        value={option.value}
                                        type='button'
                                        autoCapitalize='sentences'
                                        onClick={e => {
                                          productsLister(
                                            e.target.value,
                                            section,
                                            option
                                          )
                                        }}
                                        className='w-[75vw] text-left  rounded border-gray-300   cursor-pointer text-sm text-black focus:text-teal-600 hover:text-teal-600 md:hover:text-teal-600 capitalize '
                                      />
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <ProductsNav />
            <section aria-labelledby='products-heading' className='pb-24 pt-6 '>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4  '>
                {/* Filters */}

                <form className='hidden lg:block '>
                  <h3 className='sr-only'>Categories</h3>

                  {filters.map(section => (
                    <Disclosure
                      as='div'
                      key={section.id}
                      className='border-b border-gray-200 py-6 '
                    >
                      {({ open }) => (
                        <>
                          <h3 className='-my-3 flow-root  '>
                            <Disclosure.Button className='flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500  '>
                              <span className='font-medium text-gray-900'>
                                {section.name}
                              </span>
                              <span className='ml-6 flex items-center'>
                                {open ? (
                                  <MinusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                ) : (
                                  <PlusIcon
                                    className='h-5 w-5'
                                    aria-hidden='true'
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-2'>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className='flex items-center  '
                                >
                                  <NavLink>
                                    <input
                                      id={`filter-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      Value={option.value}
                                      type='button'
                                      onClick={e => {
                                        productsLister(
                                          e.target.value,
                                          section,
                                          option
                                        )
                                      }}
                                      className=' w-[20vw] text-left  rounded border-gray-300   cursor-pointer text-sm text-black  focus:text-teal-600 focus:text-base md:hover:text-teal-600'
                                    />
                                  </NavLink>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                <div className='lg:col-span-3 '>
                  {' '}
                  <div className='bg-white  py-2 '>
                    <div className='mx-auto max-w-2xl px-4  md:-mt-16  sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 '>
                      <h2 className='sr-only'>Products</h2>

                      <div className={`${gridView}  `}>
                        {currentProducts.map(product => (
                          <a
                            key={product.id}
                            className='group border rounded-md border-opacity-60 shadow-sm  px-2  pb-2 pt-1  box-border  hover:shadow-lg'
                            onClick={() => {
                              navigator(product.id)
                            }}
                          >
                            <div className='aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 '>
                              <img
                                src={product.images[0]}
                                alt={product.title}
                                className='h-full w-full object-cover object-center group-hover:opacity-75'
                              />
                            </div>
                            <h3 className='mt-4 text-sm text-gray-700'>
                              {product.title}
                            </h3>
                            <p className='mt-1 text-md font-medium text-gray-900 '>
                              {product.price}
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Pagination />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}
