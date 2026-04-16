import React from 'react'
import { Outlet } from 'react-router-dom'

function FeaturedProduct() {
  return (
    <div className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <Outlet />
    </div>
  )
}

export default FeaturedProduct