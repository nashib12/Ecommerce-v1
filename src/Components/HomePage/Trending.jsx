import React, { useContext } from 'react'
import RightArrowImg from '../../../public/Icons/right-arrow.png'
import LeftArrowImg from '../../../public/Icons/arrow.png'
import useEmblaCarousel from 'embla-carousel-react'
import NextImg from '../../../public/Icons/next.png'
import BannerImg from '../../../public/Images/Banner/banner4.webp'
import ProductCard from '../ProductCard'
import DataContext from '../../Context/DataContext'

function Trending() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: "center"
    });

    const scrollPrev = () => emblaApi?.scrollPrev();
    const scrollNext = () => emblaApi?.scrollNext();

    const { trendingWeek, weeklyData } = useContext(DataContext);

  return (
    <section id="trending" className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='bg-gray-100 border-2 border-gray-200 md:px-6 py-6 mb-6 md:mb-12'>
            <div className='px-6 md:px-0 pb-6 md:py-6 flex flex-col md:flex-row gap-3 items-center md:justify-between '>
                <h2 className='text-2xl font-semibold'>Trending Collection</h2>
                <div className='flex items-center md:justify-center gap-4'>
                    <button onClick={scrollPrev} className='rounded-full h-10 w-10 md:h-12 md:w-12 bg-white shadow-md flex items-center justify-center cursor-pointer transition-colors duration-150 ease-in-out hover:bg-black group'><img src={LeftArrowImg} alt="left arrow icon" className='h-4 w-4 md:h-5 md:w-5 object-contain transition-all duration-150 ease-in-out group-hover:invert' /></button>
                    <button onClick={scrollNext} className='rounded-full h-10 w-10 md:h-12 md:w-12 bg-white shadow-md flex items-center justify-center cursor-pointer transition-colors duration-150 ease-in-out hover:bg-black group'><img src={RightArrowImg} alt="right arrow icon" className='h-4 w-4 md:h-5 md:w-5 object-contain transition-all duration-150 ease-in-out group-hover:invert' /></button>
                </div>
            </div>
            <div className='overflow-hidden' ref={emblaRef}>
                <div className='flex'>
                    {trendingWeek.map(item => (
                        <div key={item.title} className='flex flex-[0_0_100%] md:flex-[0_0_31%] min-w-0 md:mx-4 h-60 md:h-80 bg-white'>
                            <div className='flex flex-col items-center gap-2 h-full w-full pb-4'>
                                <img src={item.images} alt="trending image of product" className='h-36 md:h-60 w-full object-cover' />
                                <h3 className='font-semibold text-lg md:text-xl tracking-wide'>{item.title}</h3>
                                <button className='flex items-center justify-center gap-2 w-fit h-fit px-4 py-2 cursor-pointer border text-sm md:text-md'>Shop now <img src={NextImg} alt="next icon" className='h-4 w-4 object-conatin' /> </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className='flex flex-col md:flex-row gap-6'>
            <div className='relative w-full md:w-100 overflow-hidden'>
                <img src={BannerImg} alt="Banner Image" className='h-80 md:h-106 w-full object-cover transition-transform duration-500 ease-in-out hover:scale-110' />
                <div className='absolute left-0 bottom-6 px-6 py-6 w-60'>
                    <h2 className='text-2xl font-semibold tracking-wide mb-3'>What is Trending This Week</h2>
                    <p className='text-lg mb-6'>100% Leather Handmade</p>
                    <button className='cursor-pointer bg-white flex items-center justify-center h-12 w-36 font-semibold tracking-wider uppercase'>Shop Now</button>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 md:gap-6'>
                {weeklyData.map(item => (
                    <div key={item.title}>
                        <ProductCard id={item.id} title={item.title} image={item.productImage} coverImage={item.productCover} price={item.price} tag={item.tag} slug={item.slug} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default Trending