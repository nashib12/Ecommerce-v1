import React, { useContext } from 'react'
import ArrowRight from '../../../public/Icons/arrow-right.png'
import DataContext from '../../Context/DataContext';

function PopularCategories() {
    const { popularCategory } = useContext(DataContext);

  return (
    <section id="popular-categories" className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='bg-gray-100 border-2 border-gray-200'>
            <div className='py-6 md:py-12 px-6 flex flex-col gap-3 md:flex-row items-center md:justify-between'>
                <h2 className='text-2xl font-semibold'>Popular Categories</h2>
                <button className='flex cursor-pointer items-center md:justify-center gap-1 md:gap-2 transition-color duration-300 ease-in-out hover:text-gray-400 md:text-lg group'>View All Categories <img src={ArrowRight} alt="right arrow icon" className='h-3 w-3 md:h-4 md:w-4 object-contain transition-all duration-300 ease-in-out group-hover:invert-75' /> </button>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7'>
                {popularCategory.map(item => (
                    <div key={item.catgeory} className='border-2 border-gray-200 w-full h-40 flex flex-col items-center justify-center cursor-pointer group'>
                        <img src={item.images} alt={item.catgeory} className='h-23 w-23 object-cover duration-300 ease-in-out transition-transform group-hover:scale-110' />
                        <p className='text-lg font-semibold tracking-wider'>{item.catgeory}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default PopularCategories