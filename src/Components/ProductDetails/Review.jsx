import React from 'react'
import StarRating from '../StarRating'

function Review() {
  return (
    <div className='flex flex-col gap-6 justify-center max-w-3xl mx-auto'>
        <h2 className='font-semibold text-2xl md:text-3xl leading-10 tracking-wide'>Rating & Review</h2>
        <div className='flex justify-between mb-3 md:mb-6'>
            <div className='flex items-start gap-3'>
                <StarRating /> 
                <span>Based on 0 Reviews</span>
            </div>
            <button className='text-lg h-12 w-fit px-6 tracking-wide border cursor-pointer text-black bg-white transition-colors duration-300 ease-in-out hover:bg-black hover:text-white'>
                Write a Review
            </button>
        </div>
        <p>There is no reviews yet.</p>
    </div>
  )
}

export default Review