import React from 'react'
import ProductImg from '../../public/Images/ProductImg/card1.webp'

function Checkout() {
  return (
    <section id='check-out' className='max-w-7xl mx-auto px-6 py-6 md:px-12 md:py-12'>
        <div className='grid grid-cols-12 grid-rows-2 gap-6'>
            <div className='col-span-8 shadow-sm h-56'>
                <div className='pt-6 pb-3 px-6 bg-gray-100 flex items-center justify-between'>
                    <h2 className='text-2xl font-semibold tracking-wide'>Shipping Address</h2>
                    <button className='text-lg cursor-pointer h-10 w-fit px-6 bg-black text-white transition-colors duration-300 ease-in-out border hover:bg-white hover:text-black'>Edit</button>
                </div>
                <div className='py-3 px-6'>
                    <p className='text-xl font-semibold tracking-wide mb-3'>Full name</p>
                    <p className='text-lg tracking-wide mb-3'>+977 980-0000000</p>
                    <div className='flex gap-4 items-center'>
                        <p>Doodhpokhari, Suidibar Bus Park Area, Sundarbazar, Gandaki Province</p>
                        <button className='bg-[#F85606] text-white uppercase rounded-full h-7 text-sm px-4 w-fit'>Home</button>
                    </div>
                </div>
            </div>
            <div className='col-span-4 row-span-2 px-6 py-6 shadow-sm bg-gray-100 h-fit'>
                <h2 className='text-2xl font-semibold tracking-wide mb-6'>Order Detail</h2>
                <div className='flex justify-between text-gray-500 text-lg mb-3'>
                    <p>Items Total (1 item)</p>
                    <p>$ 180.00</p>
                </div>
                <div className='flex justify-between text-gray-500 text-lg mb-3'>
                    <p>Shipping Fee</p>
                    <p>$ 10.00</p>
                </div>
                <div className='flex justify-between text-gray-500 text-lg mb-1 border-t pt-6'>
                    <p>Total</p>
                    <p className='text-2xl text-[#F85606] tracking-wide'>$ 190.00</p>
                </div>
                    <p className='text-end text-sm mb-6'>All Tax included</p>
                    <button className=' mb-6 h-12 w-full cursor-pointer bg-black text-white border text-lg tracking-wide transition-colors duration-300 ease-in-out hover:text-black hover:bg-white rounded-sm'>Proceed to Pay</button>
                    <div className='flex justify-between items-end'>
                        <p className='text-lg'>Invoice and Contact Info</p>
                        <button className='h-9 w-fit px-4 border bg-black text-white tracking-wide transition-colors duration-300 ease-in-out hover:text-black hover:bg-white cursor-pointer'>Edit</button>
                    </div>
            </div>
            <div className='col-span-8 shadow-sm h-fit'>
                <div className='py-6 bg-gray-100 mb-6 px-6'>
                    <h2 className='text-2xl font-semibold tracking-wide'>Package Summary</h2>
                </div>
                <div className='flex gap-6 justify-between mb-6 px-6'>
                    <img src={ProductImg} alt="product image" className='h-32 w-32 object-contain' />
                    <div className='flex flex-col gap-1'>
                        <p className='tracking-wide text-lg'>The Alpaca Waffle-Stitch Polo - Dark Wheat  x1</p>
                        <p>Size: xs</p>
                        <p>Color: red</p>
                    </div>
                    <p className='text-lg tracking-wide'>$180.00</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Checkout