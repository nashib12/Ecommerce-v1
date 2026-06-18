import React from 'react'
import ErrorImage from '../../public/Images/error-page.svg'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-white z-999'>
        <Link to={'/'}>
            <img src={ErrorImage} className='h-full w-full object-contain' />
        </Link>
    </div>
  )
}

export default ErrorPage