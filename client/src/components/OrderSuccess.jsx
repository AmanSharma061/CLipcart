import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

function OrderSuccess() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }
  , [])

  return (
    <div>
      {/* Creating Stylish  Order Placed Page  in the center of page*/}
        <div className="container flex justify-center h-screen items-center">
            <div className="row">
            <div className="col-md-12">
                <div className="error-template">
                <h1 className='text-4xl text-teal-600 font-bold'>Success!</h1>
                <h2 className='text-gray-500'>Order Placed Successfully</h2>
                <div className="error-details">
                    Your order has been placed successfully. We will send you a confirmation email.
                </div>
                <div className="error-actions  flex gap-2 mt-4" >
                    <NavLink to="/" className="btn btn-primary btn-lg">
                    <span className="glyphicon glyphicon-home"></span>
                    Take Me Home
                    </NavLink>
                    <NavLink to="/contact" className="btn btn-default btn-lg">
                    <span className="glyphicon glyphicon-envelope"></span>
                    Contact Support
                    </NavLink>
                </div>
                </div>
            </div>
            </div>  
     </div>
    </div>

  )
}

export default OrderSuccess
