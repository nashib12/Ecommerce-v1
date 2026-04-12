import React from 'react'

function Questions() {
  return (
        <div className='flex flex-col gap-6 justify-center max-w-3xl mx-auto'>
        <h2 className='font-semibold text-2xl md:text-3xl leading-10 tracking-wide'>Question & Answer</h2>
        <div className='flex justify-between mb-3 md:mb-6'>
            <div className='flex items-start gap-3'>
                <span>0 Questions</span>
            </div>
            <button className='text-lg h-12 w-fit px-6 tracking-wide border cursor-pointer text-black bg-white transition-colors duration-300 ease-in-out hover:bg-black hover:text-white'>
                Ask a Question
            </button>
        </div>
        <p>There is no questions yet.</p>
    </div>
  )
}

export default Questions