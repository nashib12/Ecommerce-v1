import React, { useContext } from 'react'
import ArrowRight from '../../../public/Icons/arrow-right.png'
import DataContext from '../../Context/DataContext';
import useEmblaCarousel from 'embla-carousel-react';
import ArrowLeftIcon from '../../../public/Icons/right-arrow.png'
import ArrowRightIcon from '../../../public/Icons/arrow.png'
import { Link } from 'react-router-dom';

function PopularCategories() {
    const { category } = useContext(DataContext);
    const [ emblaRef, emblaApi ] = useEmblaCarousel({
        loop: true,
        align: 'center',
    });

    const goPrev = () => emblaApi?.scrollPrev();
    const goNext = () => emblaApi.scrollNext(); 

  return (
    <section id="popular-categories" className='max-w-7xl mx-auto px-6 md:px-12'>
        <div className='bg-gray-100 border-2 border-gray-200'>
            <div className='py-6 md:py-12 px-6 flex flex-col gap-3 md:flex-row items-center md:justify-between'>
                <h2 className='text-2xl font-semibold'>Popular Categories</h2>
                <button className='flex cursor-pointer items-center md:justify-center gap-1 md:gap-2 transition-color duration-300 ease-in-out hover:text-gray-400 md:text-lg group'>View All Categories <img src={ArrowRight} alt="right arrow icon" className='h-3 w-3 md:h-4 md:w-4 object-contain transition-all duration-300 ease-in-out group-hover:invert-75' /> </button>
            </div>
            <div className='relative px-16'>
                <button className='absolute top-1/2 -translate-y-1/2 left-3 cursor-pointer h-fit w-fit rounded-full p-3 border z-99' onClick={() => goPrev()}> <img src={ArrowRightIcon} alt='arrow right icon' className='h-5 w-5 object-contain' /></button>
                <button className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer h-fit w-fit rounded-full p-3 border z-99' onClick={() => goNext()}><img src={ArrowLeftIcon} alt='arrow left icon' className='h-5 w-5 object-contain' /></button>
                <div className='overflow-hidden' ref={emblaRef}>
                    <div className='flex'>
                        {category.map(item => (
                            <div key={item.id} className='flex flex-[0_0_100%] md:flex-[0_0_33.333%] px-6 py-4'>
                                <div className='h-100 w-full relative group cursor-pointer'>
                                    <img src={item.image_url} alt={item.title} className='h-full w-full object-cover rounded-md' />
                                    <div className='bg-black/40 absolute inset-0 rounded-md transition-colors duration-200 ease-in-out group-hover:bg-black/20' />
                                    <div className='absolute inset-0 flex flex-col justify-end gap-3 items-center py-6'>
                                        <h2 className='text-3xl font-semibold tracking-wider text-white'>{ item.title}</h2>
                                        <Link to={`/all_products/${item.id}`}>
                                            <button className='h-12 w-fit px-4 border border-black cursor-pointer bg-black text-white rounded'>Shop now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7'>
                {popularCategory.map(item => (
                    <div key={item.catgeory} className='border-2 border-gray-200 w-full h-40 flex flex-col items-center justify-center cursor-pointer group'>
                        <img src={item.images} alt={item.catgeory} className='h-23 w-23 object-cover duration-300 ease-in-out transition-transform group-hover:scale-110' />
                        <p className='text-lg font-semibold tracking-wider'>{item.catgeory}</p>
                    </div>
                ))}
            </div> */}
        </div>
    </section>
  )
}

export default PopularCategories